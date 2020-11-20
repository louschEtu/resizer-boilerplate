FROM node:14

RUN npm install
RUN npm install -g sails

RUN mkdir /app

COPY . /app

