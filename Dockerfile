# this is taken from docker pull node insted of locally we are mentioned
FROM node:alpine

# where your code store in docker container/image
WORKDIR /usr/src/app

# copying package.json and package-lock.json for installing node modules
COPY package*.json .

# run command npm install for node modules --> we can use RUN npm install also --> ci means continue integration
RUN npm ci

COPY . .

# CMD ["npm", "start"]
CMD ["npm", "run", "dev"]