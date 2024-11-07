const express = require("express");
const {
  findUnique,
  findMany,
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

artist.get("/", async (req, res) => {
  try {
    const allArtist222294 = await findMany();
    res.status(200).send({ data: allArtist222294 });
  } catch (error) {
    const isi = "Gagal membuat akun";
    errorMassage(error, isi, res);
  }
});

artist.get("/:id", async (req, res) => {
  const artistId222294 = parseInt(req.params.id);

  try {
    await searchArtistById(req, res, artistId222294, findUnique, count);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

artist.delete("/:id", async (req, res) => {
  const artistId222294 = parseInt(req.params.id);
  const key = "delete";

  try {
    await searchArtistById(req, res, artistId222294, deleting, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

artist.patch("/:id", async (req, res) => {
  const artistId222294 = parseInt(req.params.id);
  const key = "patch";

  try {
    await searchArtistById(req, res, artistId222294, update, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

artist.put("/:id", async (req, res) => {
  const artistId222294 = parseInt(req.params.id);
  const key = "put";

  try {
    await searchArtistById(req, res, artistId222294, update, key);
  } catch (error) {
    const isi = "Failed";
    errorMassage(error, isi, res);
  }
});

module.exports = artist;
