module.exports = {
    useProxy: false,
    extensionId: "fpdkjdnhkakefebpekbdhillbhonfjjp",
    version: "1.0.9",
    requestTimeout: 60000,
    retry: {
        keepAliveRetries: 3,
        maxRetries: 3
    },

    endpoints: {
        keepalive: "https://www.aeropres.in/chromeapi/dawn/v1/userreward/keepalive",
        getPoints: "https://www.aeropres.in/api/atom/v1/userreferral/getpoint",
        socialMedia: "https://www.aeropres.in/chromeapi/dawn/v1/profile/update"
    },

    telegram: {
        botToken: "input your bot token here (your bot token from telegram botfather)",
        chatId: "input your chat id here (your chat id from telegram)",
        apiUrl: "https://api.telegram.org/bot"
    },

    delays: {
        betweenAccounts: 2000,
        betweenRuns: 60000,
        socialMedia: 90000
    }
};
