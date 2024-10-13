const express = require("express");
const prisma = require("../db/index");
const {
  userExist,
  createUser,
  searchUserById,
  errorMassage,
} = require("./user.model");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    await createUser(req.body, res);
  } catch (error) {
    const isi = "Gagal membuat akun";
    errorMassage(error, isi, res);
  }
});

router.get("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    await searchUserById(userId, res);
  } catch (error) {
    const isi = "Gagal menemukan user";
    errorMassage(error, isi, res);
  }
});

module.exports = router;
