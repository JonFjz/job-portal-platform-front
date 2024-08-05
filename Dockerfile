FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run proxy-server &

RUN npm install -g http-server

EXPOSE 3000

EXPOSE 8080

CMD ["http-server", "dist"]

