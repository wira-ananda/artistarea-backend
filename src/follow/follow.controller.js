const express = require("express");
const {
  findUnique,
  findFirst,
  create,
  deleting,
  update,
} = require("./follow.prisma");
const {
  addingFollow,
  alreadyFollow,
  searchFollowById,
} = require("./follow.service");
const errorMiddleware = require("../errorMiddleware");

const follow = express.Router();

// Endpoint untuk menambahkan follow
follow.post("/adding", async (req, res) => {
  try {
    await alreadyFollow(req.body, res, findFirst, create);
  } catch (error) {
    const errorMessage = "Gagal menambahkan follow";
    errorMiddleware(error, errorMessage, res);
  }
});

// Endpoint untuk menghapus follow berdasarkan ID
follow.delete("/:id", async (req, res) => {
  const followId = parseInt(req.params.id);
  const response = "delete";

  // Validasi ID follow
  if (isNaN(followId)) {
    return res.status(400).send({ message: "ID follow tidak valid" });
  }

  try {
    await searchFollowById(req, res, followId, deleting, response);
    res.status(200).send({ message: "Follow berhasil dihapus" });
  } catch (error) {
    const errorMessage = "Gagal menghapus follow";
    errorMiddleware(error, errorMessage, res);
  }
});

module.exports = follow;
