# FROM node:lts-alpine as buildstage
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN rm package.json
# RUN mv package2.json package.json
# RUN npm run build
# CMD ["npm", "run", "start"]

# Tahap 1: Menggunakan Node.js Alpine untuk build aplikasi React.js
FROM node:lts-alpine AS buildstage

# Set jalur kerja ke direktori aplikasi
WORKDIR /app

# Menyalin package.json dan package-lock.json untuk menginstal dependensi
COPY package*.json ./

# Install dependensi
RUN npm ci --only=production

# Menyalin kode aplikasi ke dalam kontainer
COPY . .

RUN rm package.json
RUN mv package2.json package.json

# Build aplikasi React.js
RUN npm run build

# Tahap 2: Menggunakan Nginx Alpine untuk menjalankan aplikasi React.js yang telah dibuild
FROM nginx:alpine

# Menghapus default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/*

# Menyalin konfigurasi Nginx yang disesuaikan
COPY nginx/nginx.conf /etc/nginx/nginx.conf

# Menyalin hasil build dari tahap sebelumnya ke direktori Nginx
COPY --from=buildstage /app/build /usr/share/nginx/html

# Expose port 80 untuk trafik HTTP
EXPOSE 80

# Command untuk menjalankan Nginx dalam mode daemon
CMD ["nginx", "-g", "daemon off;"]

