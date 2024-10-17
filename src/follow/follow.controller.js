const express = require("express");
const {
  findUnique,
  findFirst,
  create,
  deleting,
  update,
} = require("./follow.prisma");
const { addingFollow, errorMassage, alreadyFollow } = require("./follow.model");

const follow = express.Router();

follow.post("/adding", async (req, res) => {
  try {
    await alreadyFollow(req.body, res, findFirst, create);
  } catch (error) {
    const isi = "Failed to following";
    errorMassage(error, isi, res);
  }
});

module.exports = follow;
