FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm run fetch-courses

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "dist"]

