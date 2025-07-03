FROM node:18-alpine

WORKDIR /app

COPY package*.json tsconfig.json jest.config.js ./

RUN npm install 

COPY . .

CMD ["npm", "start"]