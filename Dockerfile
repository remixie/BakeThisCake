FROM node:16

WORKDIR /usr/src 

COPY . ./

COPY package.json ./

RUN npm install

RUN npm install @vue/cli@3.7.0  -g
