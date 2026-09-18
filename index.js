const mineflayer = require('mineflayer');
const fs = require('fs');

const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

function createBot() {
    const bot = mineflayer.createBot({
        host: config.serverHost,
        port: parseInt(config.serverPort),
        username: config.botUsername,
        version: false
    });

    bot.on('spawn', () => {
        console.log(`${bot.username} successfully connected to the server!`);
    });

    bot.on('end', (reason) => {
        console.log(`Disconnected: ${reason}. Reconnecting in 10 seconds...`);
        setTimeout(createBot, 10000);
    });

    bot.on('error', (err) => {
        console.log(`Error encountered: ${err.message}`);
    });
}

createBot();
