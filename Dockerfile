FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY tsconfig.json ./
COPY src/ ./src/

RUN npm run build

# --- Production image ---
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --from=builder /app/dist ./dist

# Make CLI available
RUN ln -s /app/dist/cli.js /usr/local/bin/agent-shield && chmod +x /app/dist/cli.js

# Default: scan /workspace (mount your code here)
WORKDIR /workspace

ENTRYPOINT ["node", "/app/dist/cli.js"]
CMD ["scan", "."]
