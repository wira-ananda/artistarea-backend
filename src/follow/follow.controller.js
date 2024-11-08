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

follow.post("/adding", async (req, res) => {
  try {
    await alreadyFollow(req.body, res, findFirst, create);
  } catch (error) {
    const errorMessage = "Failed to following";
    errorMiddleware(error, errorMessage, res);
  }
});

follow.delete("/:id", async (req, res) => {
  const followId = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchFollowById(req, res, followId, deleting, response);
  } catch (error) {
    const errorMessage = "Failed";
    errorMiddleware(error, errorMessage, res);
  }
});

module.exports = follow;