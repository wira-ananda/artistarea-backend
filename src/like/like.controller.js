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
const errorMiddleware = require("../errorMiddleware")

const like = express.Router();

like.post("/adding", async (req, res) => {
  try {
    await alreadyLike(req.body, res, findFirst, create);
  } catch (error) {
    const errorMessage = "Failed to adding like";
    errorMiddleware(error, errorMessage, res);
  }
});

like.delete("/:id", async (req, res) => {
  const likeId = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchLikeById(req, res, likeId, deleting, response);
  } catch (error) {
    const errorMessage = "Failed";
    errorMiddleware(error, errorMessage, res);
  }
});


like.get("/:id", async (req, res) => {
  const likeId = parseInt(req.params.id);

  try {
    await searchLikeById(req, res, likeId, findUnique);
  } catch (error) {
    const errorMessage = "Failed";
    errorMiddleware(error, errorMessage, res);
  }
});



module.exports = like;