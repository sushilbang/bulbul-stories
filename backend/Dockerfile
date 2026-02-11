FROM oven/bun:latest

WORKDIR /app
COPY backend/package.json backend/bun.lockb ./
RUN bun install 

COPY backend ./backend
COPY nginx /etc/nginx

EXPOSE 3000
CMD ["bun", "run", "backend/src/http/server.ts"]