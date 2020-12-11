FROM node:14

RUN npm install
RUN npm install -g sails
RUN npm install -g nodemon

RUN mkdir /app

COPY . /app
