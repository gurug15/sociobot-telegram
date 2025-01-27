FROM node:20.10.0-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN  npm run build
RUN  npm install -g http-server

EXPOSE 3000
EXPOSE 5173

CMD ["http-server", "dist", "-p", "3000", "--proxy", "http://localhost:3000?"]
