FROM node:20-slim

WORKDIR /chatroom-app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

CMD ["npm", "start"]
