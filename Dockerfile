FROM node:10.13.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
COPY webpack.config.js ./

RUN npm install
RUN npm run build

COPY ./dist/* .

EXPOSE 3000

CMD npm start