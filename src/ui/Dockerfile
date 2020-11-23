FROM node:alpine

RUN mkdir -p /app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app

RUN npm install react-scripts -g
RUN npm install --legacy-peer-deps

CMD ["npm", "start" ]