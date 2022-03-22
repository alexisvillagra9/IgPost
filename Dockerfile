# pull official base image
FROM node:14-alpine
# set working directory
WORKDIR /app
# install app dependencies
COPY package.json ./
RUN npm install
COPY . ./
RUN npm install typescript nodemon -g
RUN npm run build

# start app
EXPOSE 3008

CMD ["npm", "run", "dev"]