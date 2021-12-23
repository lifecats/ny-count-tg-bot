const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
dotenv.config();

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true });
let subscribed_users = [];
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  subscribed_users.push(chatId);
  bot.sendMessage(chatId, "Subscribed!");
  bot.sendMessage(
    chatId,
    "This bot will send a message, every morning, 7am UTC."
  );
  bot.sendMessage(
    chatId,
    `${Math.round(
      (new Date("2022") - new Date()) / (1000 * 60 * 60 * 24)
    ) - 1} days until 2022!`
  );
});

setInterval(() => {
  var date = new Date();
  if (date.getHours() === 7 && date.getMinutes() === 0) {
    subscribed_users.forEach((chatId) => {
      bot.sendMessage(
        chatId,
        `${Math.round(
          (new Date("2022") - new Date()) / (1000 * 60 * 60 * 24)
        ) - 1} days until 2022!`
      );
    });
    console.log("sent!");
  }
}, 60000);
