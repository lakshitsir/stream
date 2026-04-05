const axios = require("axios");

// ⚡ Cache (in-memory)
const cache = new Map();

function getCached(fileId) {
  return cache.get(fileId);
}

function setCache(fileId, data) {
  cache.set(fileId, data);
}

// 🔁 Retry logic
async function getFileWithRetry(getFileFn, fileId, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const path = await getFileFn(fileId);
      if (path) return path;
    } catch {}

    await new Promise(r => setTimeout(r, 1000));
  }
  throw new Error("Failed to fetch file_path");
}

// 🔗 Short link
async function shorten(url) {
  try {
    const res = await axios.get(
      `https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`
    );
    return res.data;
  } catch {
    return url;
  }
}

// 🎬 Basic filename cleaner
function cleanName(name = "file") {
  return name
    .replace(/\.[^/.]+$/, "")
    .replace(/[_\.]/g, " ")
    .trim();
}

module.exports = {
  getCached,
  setCache,
  getFileWithRetry,
  shorten,
  cleanName
};
