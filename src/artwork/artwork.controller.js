const express = require("express");
const {
  findUnique,
  findFirst,
  create,
  deleting,
  update,
} = require("./artwork.prisma");
const {
  createArtwork,
  errorMassage,
  searchArtworkById,
} = require("./artwork.model");

const artwork = express.Router();

artwork.post("/post", async (req, res) => {
  try {
    await createArtwork(req.body, res, create);
  } catch (error) {
    const isi = "Failed to create artwork";
    errorMassage(error, isi, res);
  }
});

artwork.get("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);

  try {
    await searchArtworkById(req, res, artworkId, findUnique);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

artwork.delete("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);
  const key = "delete";

  try {
    await searchArtworkById(req, res, artworkId, deleting, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

artwork.patch("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);
  const key = "patch";

  try {
    await searchArtworkById(req, res, artworkId, update, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

artwork.put("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);
  const key = "put";

  try {
    await searchArtworkById(req, res, artworkId, update, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

module.exports = artwork;
