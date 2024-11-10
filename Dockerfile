FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Create necessary directories
RUN mkdir -p /usr/src/app/logs

# Expose the port Back4Apps expects
EXPOSE 1337

# Start the application
CMD ["npm", "start"]
