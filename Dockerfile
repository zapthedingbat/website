FROM node:10-alpine

LABEL maintainer="Sam Greenhalgh <sam@zapthedingbat.com>"

WORKDIR /usr/src/app

ARG NPM_TOKEN
ENV NODE_ENV 'production'

COPY package*.json ./

RUN npm install --only=production

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
