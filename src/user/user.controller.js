const express = require("express");
const { findUnique, create, deleting } = require("./user.prisma");
const {
  userExist,
  createUser,
  searchUserById,
  errorMassage,
} = require("./user.model");

const user = express.Router();

user.post("/register", async (req, res) => {
  try {
    await userExist(req.body, res, findUnique);

    await createUser(req.body, res, create);
  } catch (error) {
    const isi = "Gagal membuat akun";
    errorMassage(error, isi, res);
  }
});

user.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    await searchUserById(userId, res, findUnique);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

user.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchUserById(userId, res, deleting, response);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

module.exports = user;
