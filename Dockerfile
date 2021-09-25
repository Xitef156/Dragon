FROM node:latest
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install nodemon -g
COPY . .
EXPOSE 8080
CMD [ "node", "index.js" ]
