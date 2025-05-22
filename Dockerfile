FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache python3 py3-setuptools make g++ sqlite

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

RUN npm run db:generate
RUN npm run db:migrate

RUN npm run build

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]