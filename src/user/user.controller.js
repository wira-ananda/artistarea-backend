const express = require("express");
const {
  findUnique,
  findMany,
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

const user222294 = express.Router();

user222294.post("/register", async (req, res) => {
  try {
    await userExist(req.body, res, findUnique, create);
  } catch (error) {
    const isi = "Gagal membuat akun";
    errorMassage(error, isi, res);
  }
});

user222294.get("/", async (req, res) => {
  try {
    const allUser = await findMany();
    res.status(200).send({ data: allUser });
  } catch (error) {
    const isi = "Gagal membuat akun";
    errorMassage(error, isi, res);
  }
});

user222294.get("/:id", async (req, res) => {
  const userId222294 = parseInt(req.params.id);

  try {
    await searchUserById(req, res, userId222294, findUnique);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

user222294.delete("/:id", async (req, res) => {
  const userId222294 = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchUserById(req, res, userId222294, deleting, response);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

user222294.patch("/:id", async (req, res) => {
  const userId222294 = parseInt(req.params.id);
  const key = "patch";

  try {
    await searchUserById(req, res, userId222294, update, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

user222294.put("/:id", async (req, res) => {
  const userId222294 = parseInt(req.params.id);
  const key = "put";

  try {
    await searchUserById(req, res, userId222294, update, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

module.exports = user222294;
