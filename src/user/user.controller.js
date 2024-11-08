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
  searchUserById
} = require('./user.service.js');

const user = express.Router();

user.post("/register", async (req, res) => {
  try {
    await userExist(req.body, res, findUnique, create);
  } catch (error) {
    error.message = "Gagal membuat akun";
    next(error);
  }
});

user.get("/", async (req, res) => {
  try {
    const allUser = await findMany()
    res.status(200).send({data: allUser})
  } catch (error) {
   error.message = "Gagal mendapatkan akun"
    next(error);
  }
})

user.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    await searchUserById(req, res, userId, findUnique);
  } catch (error) {
   error.message = "Failed";
    next(error);
  }
});

user.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchUserById(req, res, userId, deleting, response);
  } catch (error) {
   error.message = "Failed";
    next(error);
  }
});

user.patch("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const key = "patch";

  try {
    await searchUserById(req, res, userId, update, key);
  } catch (error) {
   error.message = "Failed";
    next(error);
  }
});

user.put("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const key = "put";

  try {
    await searchUserById(req, res, userId, update, key);
  } catch (error) {
   error.message = "Failed";
    next(error);
  }
});

module.exports = user;