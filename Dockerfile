FROM node:lts-alpine

WORKDIR /usr/app

RUN npm install -g pnpm

COPY ./package.json ./pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile --prod

COPY . .

EXPOSE 5000

CMD ["pnpm", "start"]
