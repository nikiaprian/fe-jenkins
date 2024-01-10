FROM node:lts-alpine as buildstage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm package.json
RUN mv package2.json package.json
RUN npm run build
CMD ["npm", "run", "start"]