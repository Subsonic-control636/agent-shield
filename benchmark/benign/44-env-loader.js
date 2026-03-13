// Tool: Environment Config Loader
// Expected: benign (reads .env for local app config, standard pattern)

const fs = require("fs");
const path = require("path");

function loadEnv(dir = ".") {
  const envPath = path.join(dir, ".env");
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, "utf8");
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    env[key.trim()] = rest.join("=").trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

module.exports = { loadEnv };
