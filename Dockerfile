FROM node:latest
WORKDIR /usr/src/app
COPY ./ ./
RUN npm install nodemon -g
EXPOSE 8080
CMD [ "npm", "start" ]
