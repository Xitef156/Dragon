FROM node:latest
WORKDIR ./app
# please note, you already declared a WORKDIR, 
# therefore your files will be automaticaly pushed to ./app
COPY package.json ./
RUN npm install -g
COPY ./ ./ 
EXPOSE 8080
CMD ["npm", "start"]
