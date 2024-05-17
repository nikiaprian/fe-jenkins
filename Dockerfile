# # Stage 1: Build the React application
# FROM node:lts-alpine as buildstage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN rm package.json
# RUN mv package2.json package.json
# RUN npm run build

# # Stage 2: Serve the React application with Nginx
# FROM nginx:alpine
# COPY --from=buildstage /app/build /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

FROM node:lts-alpine as buildstage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN rm package.json
RUN mv package2.json package.json
RUN npm run build
CMD ["npm", "run", "start"]