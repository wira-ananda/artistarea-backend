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

const follow222294 = express.Router();

follow222294.post("/adding", async (req, res) => {
  try {
    await alreadyFollow(req.body, res, findFirst, create);
  } catch (error) {
    const isi = "Failed to follow";
    errorMassage(error, isi, res);
  }
});

follow222294.delete("/:id", async (req, res) => {
  const followId222294 = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchFollowById(req, res, followId222294, deleting, response);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

module.exports = follow222294;
