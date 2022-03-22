# pull official base image
FROM node:14-alpine
# set working directory
WORKDIR /app
# install app dependencies
COPY package.json ./
RUN npm install
COPY . ./
RUN npm install typescript pm2 -g
RUN npm run build

# start app
EXPOSE 3008

CMD ["pm2-runtime", "build", "./dist/index.js"]