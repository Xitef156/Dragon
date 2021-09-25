FROM node:latest
WORKDIR ./app
# please note, you already declared a WORKDIR, 
# therefore your files will be automaticaly pushed to ./app
COPY ./package.json ./app
RUN npm install -g
COPY ./ ./ 
EXPOSE 3000
CMD ["npm", "start"]
