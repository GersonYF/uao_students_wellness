FROM node:18-alpine
ENV NODE_ENV=production
WORKDIR ./
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
COPY . .
COPY .env.sample .env
