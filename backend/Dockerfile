FROM node:22-alpine
WORKDIR /backend
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .
EXPOSE 3001
CMD ["npm", "run", "dev"]