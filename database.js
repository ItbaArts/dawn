const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3');

const DB_PATH = path.join(__dirname, 'itbaarts_dev.db');

const initDatabase = () => {
    return new Promise((resolve, reject) => {
        try {
            // Hapus database lama jika ada
            if (fs.existsSync(DB_PATH)) {
                console.log('🗑️ Menghapus database lama...');
                fs.unlinkSync(DB_PATH);
                console.log('✅ Database lama berhasil dihapus');
            }

            // Buat koneksi database baru
            db = new sqlite3.Database(DB_PATH, (err) => {
                if (err) {
                    console.error('❌ Error membuat database:', err);
                    reject(err);
                    return;
                }
                console.log('✅ Database baru berhasil dibuat');
            });

            // Set timezone untuk database
            db.run("PRAGMA timezone = '+08:00'");

            // Buat tabel-tabel yang diperlukan
            db.serialize(() => {
                // Tabel accounts
                db.run(`
                    CREATE TABLE IF NOT EXISTS accounts (
                        email TEXT PRIMARY KEY,
                        token TEXT,
                        appId TEXT,
                        initial_balance INTEGER DEFAULT 0,
                        current_balance INTEGER DEFAULT 0,
                        total_earned INTEGER DEFAULT 0,
                        last_collect DATETIME,
                        last_update DATETIME DEFAULT CURRENT_TIMESTAMP
                    )
                `);

                // Tabel script_status
                db.run(`
                    CREATE TABLE IF NOT EXISTS script_status (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        is_running BOOLEAN DEFAULT 1,
                        start_time DATETIME DEFAULT CURRENT_TIMESTAMP,
                        last_update DATETIME DEFAULT CURRENT_TIMESTAMP,
                        total_balance INTEGER DEFAULT 0
                    )
                `);

                // Tabel user_language
                db.run(`
                    CREATE TABLE IF NOT EXISTS user_language (
                        chat_id INTEGER PRIMARY KEY,
                        language TEXT DEFAULT 'id'
                    )
                `);

                // Tabel transactions
                db.run(`
                    CREATE TABLE IF NOT EXISTS transactions (
                        id INTEGER PRIMARY KEY AUTOINCREMENT,
                        email TEXT,
                        type TEXT,
                        amount INTEGER,
                        description TEXT,
                        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (email) REFERENCES accounts(email)
                    )
                `);

                db.get('SELECT 1', (err) => {
                    if (err) reject(err);
                    else {
                        console.log('✅ Tabel-tabel berhasil dibuat');
                        resolve();
                    }
                });
            });
        } catch (error) {
            console.error('❌ Error inisialisasi database:', error);
            reject(error);
        }
    });
};

const updatePoints = (email, currentPoints) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT initial_balance FROM accounts WHERE email = ?', [email], (err, row) => {
            if (err) {
                reject(err);
                return;
            }

            const initialBalance = parseFloat(row?.initial_balance) || 0;
            const currentBalance = parseFloat(currentPoints) || 0;
            const totalEarned = Math.max(0, currentBalance - initialBalance);

            db.run(`
                UPDATE accounts 
                SET current_balance = ?,
                    total_earned = ?,
                    last_collect = datetime('now', 'localtime'),
                    last_update = datetime('now', 'localtime')
                WHERE email = ?
            `, [currentBalance, totalEarned, email], (updateErr) => {
                if (updateErr) reject(updateErr);
                else resolve();
            });
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
                is_running,
                total_balance, 
                last_update,
                start_time
            ) VALUES (
                1, 
                1,
                ?,
                datetime('now', 'localtime'),
                COALESCE(
                    (SELECT start_time FROM script_status WHERE id = 1), 
                    datetime('now', 'localtime')
                )
            )
        `, [totalBalance], (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
};

const getScriptStatus = () => {
    return new Promise((resolve, reject) => {
        db.get(`
            SELECT 
                is_running,
                start_time,
                last_update,
                total_balance,
                ROUND(
                    (julianday(datetime('now', 'localtime')) - julianday(start_time)) * 24 * 60
                ) as uptime_minutes
            FROM script_status 
            WHERE id = 1
        `, (err, row) => {
            if (err) reject(err);
            else resolve(row || { 
                is_running: 1, 
                start_time: new Date().toISOString(),
                last_update: new Date().toISOString(),
                total_balance: 0,
                uptime_minutes: 0
            });
        });
    });
};

const addOrUpdateAccount = (email, token, appId, initialPoints) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT OR REPLACE INTO accounts (
                email, 
                token,
                appId,
                initial_balance,
                current_balance,
                total_earned,
                last_collect,
                last_update
            ) VALUES (?, ?, ?, ?, ?, ?, datetime('now', 'localtime'), datetime('now', 'localtime'))
        `;
        
        const points = parseFloat(initialPoints) || 0;
        
        db.run(query, [
            email,
            token,
            appId,
            points,
            points,
            0,
        ], (err) => {
            if (err) {
                console.error('Error adding/updating account:', err);
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

const getAccountByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM accounts WHERE email = ?', [email], (err, row) => {
            if (err) {
                console.error('Error getting account:', err);
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
};

const getAllAccounts = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM accounts';
        db.all(query, [], (err, rows) => {
            if (err) {
                console.error('Error getting accounts:', err);
                reject(err);
            } else {
                resolve(rows || []);
            }
        });
    });
};

module.exports = {
    initDatabase,
    updatePoints,
    getAllAccounts,
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
    addOrUpdateAccount,
    getAccountByEmail,
    getAllAccounts
}; 