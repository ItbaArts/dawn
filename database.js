const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db = null;

const initDatabase = () => {
    return new Promise((resolve, reject) => {
        try {
            if (!db) {
                db = new sqlite3.Database(path.join(__dirname, 'itbaarts_dev.db'), (err) => {
                    if (err) {
                        console.error('❌ Error connecting to database:', err);
                        reject(err);
                        return;
                    }
                    console.log('✅ Connected to database successfully');
                });
            }

            db.serialize(() => {
                db.run(`CREATE TABLE IF NOT EXISTS points_backup AS SELECT * FROM points`);
                
                db.run(`DROP TABLE IF EXISTS points`);
                
                db.run(`
                    CREATE TABLE IF NOT EXISTS points (
                        email TEXT PRIMARY KEY,
                        token TEXT,
                        initial_balance INTEGER DEFAULT 0,
                        current_balance INTEGER DEFAULT 0,
                        total_earned INTEGER DEFAULT 0,
                        last_collect DATETIME,
                        last_update DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                `);

                db.run(`
                    INSERT INTO points (email, token, initial_balance, current_balance, last_update)
                    SELECT email, token, initial_balance, current_balance, last_update 
                    FROM points_backup
                `);

                db.run(`DROP TABLE IF EXISTS points_backup`);

                db.run(`
                    CREATE TABLE IF NOT EXISTS script_status (
                        id INTEGER PRIMARY KEY,
                        start_time DATETIME,
                        is_running BOOLEAN,
                        total_balance INTEGER,
                        last_update DATETIME
                    )
                `);

                db.run(`
                    CREATE TABLE IF NOT EXISTS transactions (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        email TEXT,
                        type TEXT,
                        amount INTEGER,
                        description TEXT,
                        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (email) REFERENCES points(email)
                    )
                `);

                db.run(`
                    CREATE TABLE IF NOT EXISTS notification_settings (
                        email TEXT PRIMARY KEY,
                        balance_updates BOOLEAN DEFAULT 1,
                        script_status BOOLEAN DEFAULT 1,
                        FOREIGN KEY (email) REFERENCES points(email)
                    )
                `);

                db.run(`
                    CREATE TABLE IF NOT EXISTS user_language (
                        chat_id TEXT PRIMARY KEY,
                        language TEXT DEFAULT 'en'
                    )
                `, (err) => {
                    if (err) reject(err);
                    else resolve();
                });
            });
        } catch (error) {
            console.error('❌ Error initializing database:', error);
            reject(error);
        }
    });
};

const updatePoints = (email, token, initialBalance, currentBalance, totalEarned) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT OR REPLACE INTO points 
            (email, token, initial_balance, current_balance, total_earned, last_collect, last_update) 
            VALUES (?, ?, ?, ?, ?, datetime('now', 'localtime'), datetime('now', 'localtime'))
        `;
        
        db.run(query, [email, token, initialBalance, currentBalance, totalEarned], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const getPoints = (email) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM points WHERE email = ?', [email], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const getAllPoints = async () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM points', (err, rows) => {
            if (err) reject(err);
            else resolve(rows || []);
        });
    });
};

const getTransactionHistory = (limit = 10) => {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT * FROM transactions 
            ORDER BY timestamp DESC 
            LIMIT ?
        `, [limit], (err, rows) => {
            if (err) reject(err);
            else resolve(rows || []);
        });
    });
};

const getTransactionHistoryByEmail = (email, limit = 10) => {
    return new Promise((resolve, reject) => {
        db.all(`
            SELECT * FROM transactions 
            WHERE email = ?
            ORDER BY timestamp DESC 
            LIMIT ?
        `, [email, limit], (err, rows) => {
            if (err) reject(err);
            else resolve(rows || []);
        });
    });
};

const getNotificationSettings = (email) => {
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT * FROM notification_settings 
            WHERE email = ?
        `, [email], (err, row) => {
            if (err) reject(err);
            else resolve(row || { balance_updates: true, script_status: true });
        });
    });
};

const updateNotificationSettings = (email, settings) => {
    return new Promise((resolve, reject) => {
        db.run(`
            INSERT OR REPLACE INTO notification_settings 
            (email, balance_updates, script_status) 
            VALUES (?, ?, ?)
        `, [email, settings.balance_updates, settings.script_status], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const getUserLanguage = (chatId) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT language FROM user_language WHERE chat_id = ?', [chatId], (err, row) => {
            if (err) reject(err);
            else resolve((row && row.language) || 'en');
        });
    });
};

const setUserLanguage = (chatId, language) => {
    return new Promise((resolve, reject) => {
        db.run(`
            INSERT OR REPLACE INTO user_language (chat_id, language) 
            VALUES (?, ?)
        `, [chatId, language], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const getStats = () => {
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT 
                COUNT(DISTINCT email) as total_accounts,
                COUNT(*) as total_transactions,
                AVG(amount) as average_earnings,
                MAX(amount) as highest_earning
            FROM transactions
        `, (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const getRegisteredChatIds = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT DISTINCT chat_id FROM user_language', (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(row => row.chat_id));
        });
    });
};

const getAllChatIds = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT chat_id FROM user_language', (err, rows) => {
            if (err) reject(err);
            else resolve(rows.map(row => row.chat_id));
        });
    });
};

const updateScriptStatus = (totalBalance) => {
    return new Promise((resolve, reject) => {
        db.run(`
            INSERT OR REPLACE INTO script_status (
                id, 
                start_time, 
                is_running, 
                total_balance, 
                last_update
            ) VALUES (
                1, 
                COALESCE((SELECT start_time FROM script_status WHERE id = 1), datetime('now')),
                1,
                ?,
                datetime('now')
            )
        `, [totalBalance], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const getScriptStatus = () => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM script_status WHERE id = 1', (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
};

const addOrUpdateAccount = (email, token, appId) => {
    return new Promise((resolve, reject) => {
        db.run(`
            INSERT OR REPLACE INTO points (
                email, 
                token,
                initial_balance,
                current_balance,
                last_update
            ) VALUES (?, ?, 0, 0, datetime('now', 'localtime'))
        `, [email, token], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

module.exports = {
    initDatabase,
    updatePoints,
    getPoints,
    getAllPoints,
    getTransactionHistory,
    getTransactionHistoryByEmail,
    getNotificationSettings,
    updateNotificationSettings,
    getUserLanguage,
    setUserLanguage,
    getStats,
    getRegisteredChatIds,
    getAllChatIds,
    updateScriptStatus,
    getScriptStatus,
    addOrUpdateAccount
}; 