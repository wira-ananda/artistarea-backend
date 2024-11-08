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
const errorMiddleware = require("../errorMiddleware.js");

const user = express.Router();

user.post("/register", async (req, res) => {
  try {
    await userExist(req.body, res, findUnique, create);
  } catch (error) {
    const errorMessage = "Gagal membuat akun";
    errorMiddleware(error, errorMessage, res);
  }
});

user.get("/", async (req, res) => {
  try {
    const allUser = await findMany()
    res.status(200).send({data: allUser})
  } catch (error) {
    const errorMessage = "Gagal mendapatkan akun"
    errorMiddleware(error, errorMessage, res);
  }
})

user.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    await searchUserById(req, res, userId, findUnique);
  } catch (error) {
    const errorMessage = "Failed";
    errorMiddleware(error, errorMessage, res);
  }
});

user.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchUserById(req, res, userId, deleting, response);
  } catch (error) {
    const errorMessage = "Failed";
    errorMiddleware(error, errorMessage, res);
  }
});

user.patch("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const key = "patch";

  try {
    await searchUserById(req, res, userId, update, key);
  } catch (error) {
    const errorMessage = "Failed";
    errorMiddleware(error, errorMessage, res);
  }
});

user.put("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const key = "put";

  try {
    await searchUserById(req, res, userId, update, key);
  } catch (error) {
    const errorMessage = "Failed";
    errorMiddleware(error, errorMessage, res);
  }
});

module.exports = user;