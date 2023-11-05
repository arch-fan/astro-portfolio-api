FROM node:latest

WORKDIR /app

RUN apk add --no-cache chromium

COPY package.json ./

RUN npm install -g pnpm
RUN pnpm install

RUN mkdir src
COPY src /app/src
COPY .env ./
COPY tsconfig.json ./

RUN pnpm run build

EXPOSE 3000

ENV ADDRESS=0.0.0.0 PORT=3000

CMD ["pnpm", "run", "start"]