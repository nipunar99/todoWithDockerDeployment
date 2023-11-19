#From 
FROM node:20.9.0-alpine

RUN npm install -g nodemon

#Working directory
WORKDIR /api

#copying package.json and package-lock.json
COPY package.json .
COPY package-lock.json .

#installing dependencies
RUN npm install

#copying source files
COPY . .

#exposing port
EXPOSE 5000

#running the app
ENTRYPOINT [ "npm", "run", "dev" ]



