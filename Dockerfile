FROM node:latest
RUN npm install nodemon -g
WORKDIR /app
ADD . /app
EXPOSE 3000
CMD ["npm", "start"] 
