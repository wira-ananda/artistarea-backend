const express = require("express");
const {
  findUnique,
  findMany,
  create,
  deleting,
  update,
} = require("./user.prisma");
const {
  validateAndCreate,
  searchUserById,
} = require("./user.service.js");
const errorMiddleware = require("../errorMiddleware.js");

const user = express.Router();

user.post("/register", async (req, res) => {
  try {
    await validateAndCreate(req.body, res, findUnique, create);
  } catch (error) {
    const errorMessage = "Gagal membuat akun";
    errorMiddleware(error, errorMessage, res);
  }
});

user.get("/", async (req, res) => {
  try {
    const allUser = await findMany();
    res.status(200).send({ data: allUser });
  } catch (error) {
    const errorMessage = "Gagal mendapatkan data akun";
    errorMiddleware(error, errorMessage, res);
  }
});

user.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  // Validasi ID user
  if (isNaN(userId)) {
    return res.status(400).send({ message: "ID user tidak valid" });
  }

  try {
    await searchUserById(req, res, userId, findUnique);
    res.status(200).send({ message: "Akun berhasil ditemukan" });
  } catch (error) {
    const errorMessage = "Gagal mendapatkan data akun";
    errorMiddleware(error, errorMessage, res);
  }
});

user.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const response = "delete";

  // Validasi ID user
  if (isNaN(userId)) {
    return res.status(400).send({ message: "ID user tidak valid" });
  }

  try {
    await searchUserById(req, res, userId, deleting, response);
    res.status(200).send({ message: "Akun berhasil dihapus" });
  } catch (error) {
    const errorMessage = "Gagal menghapus akun";
    errorMiddleware(error, errorMessage, res);
  }
});

user.patch("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const key = "patch";

  // Validasi ID user
  if (isNaN(userId)) {
    return res.status(400).send({ message: "ID user tidak valid" });
  }

  try {
    await searchUserById(req, res, userId, update, key);
    res.status(200).send({ message: "Akun berhasil diperbarui" });
  } catch (error) {
    const errorMessage = "Gagal memperbarui akun";
    errorMiddleware(error, errorMessage, res);
  }
});

user.put("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const key = "put";

  // Validasi ID user
  if (isNaN(userId)) {
    return res.status(400).send({ message: "ID user tidak valid" });
  }

  try {
    await searchUserById(req, res, userId, update, key);
    res.status(200).send({ message: "Akun berhasil diganti" });
  } catch (error) {
    const errorMessage = "Gagal mengganti akun";
    errorMiddleware(error, errorMessage, res);
  }
});

module.exports = user;
