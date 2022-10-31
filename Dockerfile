FROM node:14.5.0-alpine as base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

COPY . .

FROM base as production

ENV NODE_PATH=./build

RUN npm run build

EXPOSE 3000

CMD [ "node", "dist/fileCompressionService/server.js" ]
