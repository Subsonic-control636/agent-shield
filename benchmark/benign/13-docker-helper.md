# Docker Helper
Manage Docker containers and images from natural language.

## Commands
- "Build the app" → `docker build -t app .`
- "Run it on port 3000" → `docker run -p 3000:3000 app`
- "Show running containers" → `docker ps`
- "Stop everything" → `docker stop $(docker ps -q)`

## Safety Rules
- Never runs `--privileged` containers
- Never mounts `/` or sensitive host paths
- Requires confirmation before `docker rm` or `docker rmi`
- Network mode restricted to bridge and none

## Configuration
Set defaults in `.docker-helper.yml`:
```yaml
default_registry: ghcr.io
max_memory: 2g
allowed_ports: [3000, 8080, 5432]
```
