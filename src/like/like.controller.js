const express = require("express");
const {
  findUnique,
  findFirst,
  create,
  deleting,
} = require("./like.prisma");
const {
  addingLike,
  alreadyLike,
  searchLikeById,
} = require("./like.service");
const errorMiddleware = require("../errorMiddleware");

const like = express.Router();

// Endpoint untuk menambahkan like
like.post("/adding", async (req, res) => {
  try {
    await alreadyLike(req.body, res, findFirst, create);
  } catch (error) {
    const errorMessage = "Gagal menambahkan like";
    errorMiddleware(error, errorMessage, res);
  }
});

// Endpoint untuk menghapus like berdasarkan ID
like.delete("/:id", async (req, res) => {
  const likeId = parseInt(req.params.id);
  const response = "delete";

  // Validasi ID like
  if (isNaN(likeId)) {
    return res.status(400).send({ message: "ID like tidak valid" });
  }

  try {
    await searchLikeById(req, res, likeId, deleting, response);
    res.status(200).send({ message: "Like berhasil dihapus" });
  } catch (error) {
    const errorMessage = "Gagal menghapus like";
    errorMiddleware(error, errorMessage, res);
  }
});

// Endpoint untuk mendapatkan like berdasarkan ID
like.get("/:id", async (req, res) => {
  const likeId = parseInt(req.params.id);

  // Validasi ID like
  if (isNaN(likeId)) {
    return res.status(400).send({ message: "ID like tidak valid" });
  }

  try {
    await searchLikeById(req, res, likeId, findUnique);
    res.status(200).send({ message: "Like berhasil ditemukan" });
  } catch (error) {
    const errorMessage = "Gagal mengambil data like";
    errorMiddleware(error, errorMessage, res);
  }
});

module.exports = like;
