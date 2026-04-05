const axios = require("axios");

const BOT_TOKEN = process.env.BOT_TOKEN;
const API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendMessage(chatId, text, markdown = false) {
  try {
    await axios.post(`${API}/sendMessage`, {
      chat_id: chatId,
      text,
      parse_mode: markdown ? "Markdown" : undefined,
      disable_web_page_preview: true
    });
  } catch (e) {
    console.error("Send error:", e.message);
  }
}

async function getFile(fileId) {
  const res = await axios.get(`${API}/getFile?file_id=${fileId}`);
  return res.data.result.file_path;
}

module.exports = { sendMessage, getFile };
