const express = require("express");
const {
  findUnique,
  findFirst,
  create,
  deleting,
  update,
} = require("./user.prisma");
const {
  userExist,
  createUser,
  searchUserById,
  errorMassage,
} = require("./user.model");

const user = express.Router();

user.post("/register", async (req, res) => {
  try {
    await userExist(req.body, res, findUnique, create);
  } catch (error) {
    const isi = "Gagal membuat akun";
    errorMassage(error, isi, res);
  }
});

user.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    await searchUserById(req, res, userId, findUnique);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

user.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchUserById(req, res, userId, deleting, response);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

user.patch("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const key = "patch";

  try {
    await searchUserById(req, res, userId, update, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

user.put("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const key = "put";

  try {
    await searchUserById(req, res, userId, update, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

module.exports = user;
