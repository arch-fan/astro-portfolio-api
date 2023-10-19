FROM oven/bun:latest

WORKDIR /app

COPY package.json ./

RUN bun install

COPY src ./
COPY .env ./

RUN bun run build

EXPOSE 3000

CMD ["bun", "run", "start"]