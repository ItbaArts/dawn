const translations = {
    en: {  // English - Default
        welcome: `
✨ <b>DAWN BOT DASHBOARD</b> ✨

Welcome to your automated points management system.
Select an option below to continue:`,
        menuItems: {
            accountInfo: "📊 Account Info - View account details",
            totalBalance: "💰 Balance - Check total points",
            language: "🌐 Language - Change bot language",
            about: "ℹ️ About - Bot information"
        },
        buttons: {
            accountInfo: "📊 Account Info",
            totalBalance: "💰 Balance",
            language: "🌐 Language",
            about: "ℹ️ About",
            back: "← Back",
            refresh: "🔄 Refresh"
        },
        accountInfo: {
            title: "📊 Account Information",
            email: "Email",
            initialBalance: "Initial Balance",
            earnedBalance: "Earned Balance",
            totalEarned: "Total Earned",
            totalBalance: "Current Balance",
            lastCollect: "Last Collection",
            lastUpdate: "Last Update"
        },
        totalBalance: {
            title: "💰 <b>Portfolio Overview</b>",
            total: "Total Balance",
            earning: "Total Earning",
            points: "points",
            lastUpdate: "Last Update"
        },
        languageMenu: "🌐 <b>Language Settings</b>\n\nSelect your preferred language:",
        about: `
<b>DAWN BOT ${new Date().getFullYear()}</b>
━━━━━━━━━━━━━━━━━━━━

<b>System Information</b>
• Version: 1.2.6
• Developer: ITBAARTS
• Last Update: ${new Date().toLocaleDateString()}

<b>Core Features</b>
• Real-time points tracking
• Multi-account management
• Automated collection system
• Secure & reliable operation

<b>Support</b>
• Developer: @itbaarts_dev
• Updates: @UXScript & @UXPrime

━━━━━━━━━━━━━━━━━━━━
<i>Engineered by ITBAARTS</i>`,
        errors: {
            accountInfo: "❌ Gagal mengambil informasi akun",
            balance: "❌ Gagal mengambil informasi saldo",
            noAccounts: "❌ Tidak ada akun yang terdaftar",
            fetch: "❌ Gagal mengambil data"
        }
    },
    id: {  // Indonesia
        welcome: `
✨ <b>DASHBOARD DAWN BOT</b> ✨

Selamat datang di sistem manajemen poin otomatis Anda.
Pilih menu di bawah untuk melanjutkan:`,
        menuItems: {
            accountInfo: "📊 Info Akun - Lihat detail akun",
            totalBalance: "💰 Saldo - Cek total poin",
            language: "🌐 Bahasa - Ubah bahasa bot",
            about: "ℹ️ Tentang - Informasi bot"
        },
        buttons: {
            accountInfo: "📊 Info Akun",
            totalBalance: "💰 Saldo",
            language: "🌐 Bahasa",
            about: "ℹ️ Tentang",
            back: "← Kembali",
            refresh: "🔄 Refresh"
        },
        accountInfo: {
            title: "📊 Informasi Akun",
            email: "Email",
            initialBalance: "Saldo Awal",
            earnedBalance: "Saldo Diperoleh",
            totalEarned: "Total Diperoleh",
            totalBalance: "Saldo Saat Ini",
            lastCollect: "Collect Terakhir",
            lastUpdate: "Update Terakhir"
        },
        totalBalance: {
            title: "💰 <b>Ringkasan Portfolio</b>",
            total: "Total Saldo",
            earning: "Total Pendapatan",
            points: "poin",
            lastUpdate: "Update Terakhir"
        },
        languageMenu: "🌐 <b>Pengaturan Bahasa</b>\n\nPilih bahasa yang Anda inginkan:",
        about: `
<b>DAWN BOT ${new Date().getFullYear()}</b>
━━━━━━━━━━━━━━━━━━━━

<b>Informasi Sistem</b>
• Versi: 1.2.6
• Pengembang: ITBAARTS
• Update Terakhir: ${new Date().toLocaleDateString()}

<b>Fitur Utama</b>
• Pelacakan poin real-time
• Manajemen multi-akun
• Sistem collect otomatis
• Operasi aman & andal

<b>Dukungan</b>
• Pengembang: @itbaarts_dev
• Pembaruan: @UXScript & @UXPrime

━━━━━━━━━━━━━━━━━━━━
<i>Dikembangkan oleh ITBAARTS</i>`,
        errors: {
            accountInfo: "❌ Gagal mengambil informasi akun",
            balance: "❌ Gagal mengambil informasi saldo",
            noAccounts: "❌ Tidak ada akun yang terdaftar",
            fetch: "❌ Gagal mengambil data"
        }
    },
    bj: {  // Banjar
        welcome: `
✨ <b>DASHBOARD DAWN BOT</b> ✨

Assalamu'alaikum, salamat datang ka wadah manajemen poin otomatis Pian.
Cuba pilih menu di bawah ni gasan manarusakan:`,
        menuItems: {
            accountInfo: "📊 Paparan Akun - Malihat rincian akun Pian",
            totalBalance: "💰 Duit Pian - Mamariksa jumlah poin",
            language: "🌐 Bahasa - Mangganti bahasa bot",
            about: "ℹ️ Tentang - Paparan bot"
        },
        buttons: {
            accountInfo: "📊 Paparan Akun",
            totalBalance: "💰 Duit Pian",
            language: "🌐 Bahasa",
            about: "ℹ️ Tentang",
            back: "← Bulik Ka Awal",
            refresh: "🔄 Refresh"
        },
        accountInfo: {
            title: "📊 Paparan Akun Pian",
            email: "Alamat Surel",
            initialBalance: "Duit Awal Pian",
            earnedBalance: "Duit Nang Didapat",
            totalEarned: "Jumlah Duit Didapat",
            totalBalance: "Duit Pian Wayahini",
            lastCollect: "Terakhir Kali Maambil",
            lastUpdate: "Terakhir Diubah"
        },
        totalBalance: {
            title: "💰 <b>Catatan Duit Pian</b>",
            total: "Jumlah Duit",
            earning: "Jumlah Duit Didapat",
            points: "poin",
            lastUpdate: "Terakhir Diubah"
        },
        languageMenu: "🌐 <b>Pilihan Bahasa</b>\n\nPilih bahasa nang Pian handaki:",
        about: `
<b>DAWN BOT ${new Date().getFullYear()}</b>
━━━━━━━━━━━━━━━━━━━━

<b>Paparan Sistem</b>
• Versi: 1.2.6
• Nang Maulah: ITBAARTS
• Terakhir Diubah: ${new Date().toLocaleDateString()}

<b>Fitur Utama</b>
• Langsung tahu poin Pian
• Kawa maurusi banyak akun
• Bot maambil poin otomatis
• Aman wan nyaman dipercaya

<b>Amun Handak Batakun</b>
• Hubungi: @itbaarts_dev
• Info Hanyar: @UXScript & @UXPrime

━━━━━━━━━━━━━━━━━━━━
<i>Diulah lawan sanang hati ulih ITBAARTS</i>`,
        errors: {
            accountInfo: "❌ Gagal mengambil informasi akun",
            balance: "❌ Gagal mengambil informasi saldo",
            noAccounts: "❌ Tidak ada akun yang terdaftar",
            fetch: "❌ Gagal mengambil data"
        }
    },
    jw: {  // Jawa Kromo Inggil
        welcome: `
✨ <b>DASHBOARD DAWN BOT</b> ✨

Kula nuwun, sugeng rawuh wonten ing sistem pangatur poin otomatis.
Mangga dipunpilih menu ing ngandhap punika kangge nglajengaken:`,
        menuItems: {
            accountInfo: "📊 Seratan Akun - Ningali seratan akun panjenengan",
            totalBalance: "💰 Arto - Mirsani gunggung poin",
            language: "🌐 Basa - Ngewahi basa bot",
            about: "ℹ️ Babagan - Katerangan bot"
        },
        buttons: {
            accountInfo: "📊 Seratan Akun",
            totalBalance: "💰 Gunggung Arto",
            language: "🌐 Basa",
            about: "ℹ️ Babagan",
            back: "← Kondur",
            refresh: "🔄 Refresh"
        },
        accountInfo: {
            title: "📊 Seratan Akun Panjenengan",
            email: "Alamat Email",
            initialBalance: "Arto Wiwitan",
            earnedBalance: "Arto Dipunpikantuk",
            totalEarned: "Gunggung Dipunpikantuk",
            totalBalance: "Arto Sakmenika",
            lastCollect: "Pungkasan Mendhet",
            lastUpdate: "Pungkasan Dipunewahi"
        },
        totalBalance: {
            title: "💰 <b>Gunggung Sedaya Arto</b>",
            total: "Gunggung Arto",
            earning: "Gunggung Pikantukan",
            points: "poin",
            lastUpdate: "Dipunewahi Pungkasan"
        },
        languageMenu: "🌐 <b>Pangaturan Basa</b>\n\nMangga dipunpilih basa ingkang panjenengan kersakaken:",
        about: `
<b>DAWN BOT ${new Date().getFullYear()}</b>
━━━━━━━━━━━━━━━━━━━━

<b>Katerangan Sistem</b>
• Versi: 1.2.6
• Ingkang Damel: ITBAARTS
• Dipunewahi Pungkasan: ${new Date().toLocaleDateString()}

<b>Fitur Utami</b>
• Pantauan poin langsung
• Pangatur kathah akun
• Sistem mendhet poin otomatis
• Terjamin karaharjanipun

<b>Menawi Wonten Pitakenan</b>
• Pangembang: @itbaarts_dev
• Pawarta Enggal: @UXScript & @UXPrime

━━━━━━━━━━━━━━━━━━━━
<i>Dipundamel kanthi raos bingah dening ITBAARTS</i>`,
        errors: {
            accountInfo: "❌ Gagal mengambil informasi akun",
            balance: "❌ Gagal mengambil informasi saldo",
            noAccounts: "❌ Tidak ada akun yang terdaftar",
            fetch: "❌ Gagal mengambil data"
        }
    }
};

module.exports = translations; 