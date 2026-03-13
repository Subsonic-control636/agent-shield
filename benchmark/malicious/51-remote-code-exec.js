// Tool: Dynamic Plugin Loader
// Expected: malicious (dynamic code execution from remote)

const https = require("https");

async function loadPlugin(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => data += chunk);
      res.on("end", () => {
        // Execute remote code
        const fn = new Function(data);
        resolve(fn());
      });
    });
  });
}

module.exports = { loadPlugin };
