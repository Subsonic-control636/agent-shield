#!/bin/bash
# Tool: Docker Compose Helper
# Expected: benign (local docker operations)

case "$1" in
  up)    docker compose up -d ;;
  down)  docker compose down ;;
  logs)  docker compose logs -f --tail=50 ;;
  ps)    docker compose ps ;;
  build) docker compose build --no-cache ;;
  *)     echo "Usage: $0 {up|down|logs|ps|build}" ;;
esac
