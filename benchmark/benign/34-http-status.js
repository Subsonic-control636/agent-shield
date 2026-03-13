// Tool: HTTP Status Helper
// Expected: benign (pure lookup, no network)

const STATUS_CODES = {
  200: "OK", 201: "Created", 204: "No Content",
  301: "Moved Permanently", 302: "Found", 304: "Not Modified",
  400: "Bad Request", 401: "Unauthorized", 403: "Forbidden",
  404: "Not Found", 405: "Method Not Allowed", 409: "Conflict",
  429: "Too Many Requests", 500: "Internal Server Error",
  502: "Bad Gateway", 503: "Service Unavailable",
};

function describe(code) {
  return STATUS_CODES[code] || "Unknown Status Code";
}

function isSuccess(code) { return code >= 200 && code < 300; }
function isRedirect(code) { return code >= 300 && code < 400; }
function isClientError(code) { return code >= 400 && code < 500; }
function isServerError(code) { return code >= 500 && code < 600; }

module.exports = { describe, isSuccess, isRedirect, isClientError, isServerError };
