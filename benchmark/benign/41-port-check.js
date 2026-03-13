// Tool: Port Scanner (localhost only)
// Expected: benign (local diagnostics)

const net = require("net");

function checkPort(port) {
  return new Promise((resolve) => {
    const sock = new net.Socket();
    sock.setTimeout(1000);
    sock.on("connect", () => { sock.destroy(); resolve({ port, open: true }); });
    sock.on("timeout", () => { sock.destroy(); resolve({ port, open: false }); });
    sock.on("error", () => resolve({ port, open: false }));
    sock.connect(port, "127.0.0.1");
  });
}

async function scanCommon() {
  const ports = [80, 443, 3000, 5432, 6379, 8080, 27017];
  return Promise.all(ports.map(checkPort));
}

module.exports = { checkPort, scanCommon };
