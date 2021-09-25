FROM node:latest
WORKDIR ./app
COPY ./ ./app
RUN npm install nodemon -g
EXPOSE 8080
CMD [ "npm", "start" ]
