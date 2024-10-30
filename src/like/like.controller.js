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

const like = express.Router();

like.post("/adding", async (req, res) => {
  try {
    await alreadyLike(req.body, res, findFirst, create);
  } catch (error) {
    const isi = "Failed to adding like";
    errorMassage(error, isi, res);
  }
});

like.delete("/:id", async (req, res) => {
  const likeId = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchLikeById(req, res, likeId, deleting, response);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});


like.get("/:id", async (req, res) => {
  const likeId = parseInt(req.params.id);

  try {
    await searchLikeById(req, res, likeId, findUnique);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});



module.exports = like;
