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
  errorMassage,
  alreadyFollow,
  searchFollowById,
} = require("./follow.model");

const follow = express.Router();

follow.post("/adding", async (req, res) => {
  try {
    await alreadyFollow(req.body, res, findFirst, create);
  } catch (error) {
    const isi = "Failed to following";
    errorMassage(error, isi, res);
  }
});

follow.delete("/:id", async (req, res) => {
  const followId = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchFollowById(req, res, followId, deleting, response);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

module.exports = follow;
