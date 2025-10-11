FROM node:20-alpine

# Upgrade Alpine packages to fix vulnerabilities
RUN apk update && apk upgrade

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD ["node", "server.js"]