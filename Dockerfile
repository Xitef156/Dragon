FROM node:latest
RUN npm install nodemon -g
EXPOSE 8080
CMD [ "npm", "start" ]
