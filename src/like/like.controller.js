const express = require("express");
const {
  findUnique,
  findFirst,
  create,
  deleting,
} = require("./like.prisma");
const {
  addingLike,
  errorMassage,
  alreadyLike,
  searchLikeById,
} = require("./like.model");

const like222294 = express.Router();

like222294.post("/adding", async (req, res) => {
  try {
    await alreadyLike(req.body, res, findFirst, create);
  } catch (error) {
    const isi = "Failed to add like";
    errorMassage(error, isi, res);
  }
});

like222294.delete("/:id", async (req, res) => {
  const likeId222294 = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchLikeById(req, res, likeId222294, deleting, response);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

like222294.get("/:id", async (req, res) => {
  const likeId222294 = parseInt(req.params.id);

  try {
    await searchLikeById(req, res, likeId222294, findUnique);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

module.exports = like222294;
