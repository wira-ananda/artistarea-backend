# Gunakan image Node.js resmi sebagai base image
FROM node:latest

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json
COPY package*.json ./

# Instal dependencies
RUN npm install

# Salin seluruh kode ke dalam container
COPY . .

# Expose port yang digunakan aplikasi
EXPOSE 2000

# Jalankan aplikasi
CMD ["npm", "start"]
