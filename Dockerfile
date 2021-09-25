FROM node:latest
WORKDIR ./app
RUN npm install nodemon -g
COPY ./ ./app
EXPOSE 8080
CMD [ "npm", "start" ]
