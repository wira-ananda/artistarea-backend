const express = require("express");
const {
  findUnique,
  findFirst,
  create,
  deleting,
  update,
} = require("./like.prisma");
const { addingLike, errorMassage, alreadyLike } = require("./like.model");

const like = express.Router();

like.post("/adding", async (req, res) => {
  try {
    await alreadyLike(req.body, res, findFirst);
    await addingLike(req.body, res, create);
  } catch (error) {
    const isi = "Failed to adding like";
    errorMassage(error, isi, res);
  }
});

// like.get("/:id", async (req, res) => {
//   const artworkId = parseInt(req.params.id);

//   try {
//     await searchArtworkById(req, res, artworkId, findUnique);
//   } catch (error) {
//     const isi = "Failed";
//     errorMassage(error, isi, res);
//   }
// });

// like.delete("/:id", async (req, res) => {
//   const artworkId = parseInt(req.params.id);
//   const key = "delete";

//   try {
//     await searchArtworkById(req, res, artworkId, deleting, key);
//   } catch (error) {
//     const isi = "Failed";
//     errorMassage(error, isi, res);
//   }
// });

// like.patch("/:id", async (req, res) => {
//   const artworkId = parseInt(req.params.id);
//   const key = "patch";

//   try {
//     await searchArtworkById(req, res, artworkId, update, key);
//   } catch (error) {
//     const isi = "Failed";
//     errorMassage(error, isi, res);
//   }
// });

// like.put("/:id", async (req, res) => {
//   const artworkId = parseInt(req.params.id);
//   const key = "put";

//   try {
//     await searchArtworkById(req, res, artworkId, update, key);
//   } catch (error) {
//     const isi = "Failed";
//     errorMassage(error, isi, res);
//   }
// });

module.exports = like;
