// Tool: JWT Decoder (read-only, no secrets)
// Expected: benign (decodes without verification)

function decodeJwt(token) {
  const parts = token.split(".");
  if (parts.length !== 3) throw new Error("Invalid JWT format");
  const header = JSON.parse(Buffer.from(parts[0], "base64url").toString());
  const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
  return { header, payload, signature: parts[2] };
}

module.exports = { decodeJwt };
