FROM node:14

RUN npm -g install sails

RUN mkdir /app

COPY . /app

