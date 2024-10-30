const express = require("express");
const {
  findUnique,
  findFirst,
  create,
  deleting,
  update,
  count,
} = require("./artist.prisma");
const {
  artistExist,
  createArtist,
  searchArtistById,
  errorMassage,
} = require("./artist.model");

const artist = express.Router(); 
artist.post("/register", async (req, res) => {
  try {
    await artistExist(req.body, res, findUnique, create);
  } catch (error) {
    const isi = "Gagal membuat akun artist";
    errorMassage(error, isi, res);
  }
});

artist.get("/:id", async (req, res) => {
  const artistId = parseInt(req.params.id);

  try {
    await searchArtistById(req, res, artistId, findUnique, count);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

artist.delete("/:id", async (req, res) => {
  const artistId = parseInt(req.params.id);
  const key = "delete";

  try {
    await searchArtistById(req, res, artistId, deleting, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

artist.patch("/:id", async (req, res) => {
  const artistId = parseInt(req.params.id);
  const key = "patch";

  try {
    await searchArtistById(req, res, artistId, update, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

artist.put("/:id", async (req, res) => {
  const artistId = parseInt(req.params.id);
  const key = "put";

  try {
    await searchArtistById(req, res, artistId, update, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

module.exports = artist;
