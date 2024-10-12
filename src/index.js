const express = require("express"); // Mengimpor framework Express
const { PrismaClient } = require("@prisma/client"); // Mengimpor Prisma Client untuk berinteraksi dengan database
const bodyParser = require("body-parser"); // Middleware untuk parsing body JSON
const router = require("./user/user.controller");

const app = express(); // Membuat instance Express

// Menjalankan server
const PORT = process.env.PORT || 2000; // Mendapatkan PORT dari environment variable atau default ke 2000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Mencetak pesan bahwa server sedang berjalan
});

// Middleware untuk parse JSON
app.use(bodyParser.json()); // Menggunakan body-parser untuk menangani permintaan JSON

app.use("/user", router);
