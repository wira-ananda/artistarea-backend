const express = require("express");
const { findUnique, create, deleting } = require("./artist.prisma");
const {
  artistExist,
  createArtist,
  searchArtistById,
  errorMassage,
} = require("./artist.model");

const artist = express.Router();

artist.post("/register", async (req, res) => {
  try {
    await artistExist(req.body, res, findUnique);

    await createArtist(req.body, res, create);
  } catch (error) {
    const isi = "Gagal membuat akun artist";
    errorMassage(error, isi, res);
  }
});

artist.get("/:id", async (req, res) => {
  const artistId = parseInt(req.params.id);

  try {
    await searchArtistById(artistId, res, findUnique);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

artist.delete("/:id", async (req, res) => {
  const artistId = parseInt(req.params.id);
  const response = "delete";

  try {
    await searchArtistById(artistId, res, deleting, response);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

module.exports = artist;
