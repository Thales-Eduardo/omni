FROM node:24.1.0-slim

WORKDIR /usr/app

COPY package.json ./

RUN apt-get update && apt-get upgrade -y openssl

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

CMD ["npm", "run", "start:prod"]
