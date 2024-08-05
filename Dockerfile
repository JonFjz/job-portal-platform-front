FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

run npm run proxy-server

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "dist"]

