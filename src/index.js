const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bodyParser = require("body-parser");

const app = express();
const prisma = new PrismaClient();

// Middleware untuk parse JSON
app.use(bodyParser.json());

// Endpoint untuk mendaftar pengguna
app.post("/user/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cek apakah email sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }

    // Membuat pengguna baru
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    res
      .status(201)
      .send({ data: newUser, message: "User created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error creating user" });
  }
});

// Endpoint untuk mendapatkan pengguna berdasarkan ID
app.get("/user/:id", async (req, res) => {
  const userId = parseInt(req.params.id); // Mendapatkan ID dari URL

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ data: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error retrieving user" });
  }
});

// Menjalankan server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
