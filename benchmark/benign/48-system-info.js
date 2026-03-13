// Tool: Environment Info (safe - only reads non-sensitive vars)
// Expected: benign (reads only safe system info)

function getSystemInfo() {
  return {
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    uptime: process.uptime(),
    cwd: process.cwd(),
    pid: process.pid,
    memoryUsage: process.memoryUsage(),
  };
}

module.exports = { getSystemInfo };
