FROM node:alpine

# sets the working directory for any RUN, CMD, COPY command
# all files we put in the Docker container running the server will be in /usr/src/app (e.g. /usr/src/app/package.json)
WORKDIR /usr/src/app


# copies everything in the project to /usr/src/app
COPY . .

# Installs all packages
RUN npm install

# Runs the dev npm script to build & start the server
CMD npm run dev