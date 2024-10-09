# Menggunakan base image dari Node.js
FROM node:18

# Menentukan working directory
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh file aplikasi
COPY . .

# Eksekusi aplikasi
CMD ["npm", "start"]

# Expose port aplikasi (misalnya 3000)
EXPOSE 3000

