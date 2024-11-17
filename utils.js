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

const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID').format(number);
};

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

module.exports = {
    randomDelay,
    countdown,
    formatNumber,
    sleep
}; 