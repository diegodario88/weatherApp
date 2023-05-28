FROM node:16.3.0-alpine

RUN mkdir -p /app

WORKDIR /app

ENV PATH ./node_modules/.bin:$PATH

COPY package.json .

RUN npm install react-scripts -g

RUN npm install --legacy-peer-deps
