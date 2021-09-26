FROM node:16
WORKDIR usr/srv/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8080
CMD [ "npm", "start" ]
CMD [ "qovery", "run" ]
