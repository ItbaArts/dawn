const randomDelay = async (min, max) => {
    const delay = Math.floor(Math.random() * (max - min + 1) + min) * 1000;
    await new Promise(resolve => setTimeout(resolve, delay));
};

const countdown = async (seconds) => {
    for (let i = seconds; i > 0; i--) {
        process.stdout.write(`\r⏳ Menunggu ${i} detik sebelum memulai ulang...`);
        await new Promise(resolve => setTimeout(resolve, 1000));
    }
    console.log('\n🔄 Memulai ulang...\n');
};

const formatDateTime = (date) => {
    if (!date) return '-';
    try {
        return new Date(date).toLocaleString('id-ID', {
            timeZone: 'Asia/Makassar',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return '-';
    }
};

const formatNumber = (number) => {
    if (!number || isNaN(number)) return '0';
    return number.toLocaleString('id-ID', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    });
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    randomDelay,
    countdown,
    formatDateTime,
    formatNumber,
    sleep
}; 