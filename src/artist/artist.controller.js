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
} = require("./artist.service");
const errorMiddleware = require("../errorMiddleware");

const artist = express.Router(); 

artist.post("/register", async (req, res) => {
  try {
    await artistExist(req.body, res, findUnique, create);
  } catch (error) {
    const errorMessage = "Gagal mendaftarkan akun artist";
    errorMiddleware(error, errorMessage, res);
  }
});

artist.get("/", async (req, res) => {
  try {
    const allArtist = await findMany();
    res.status(200).send({data: allArtist});
  } catch (error) {
    const errorMessage = "Gagal mengambil data artist";
    errorMiddleware(error, errorMessage, res);
  }
});

artist.get("/:id", async (req, res) => {
  const artistId = parseInt(req.params.id);

  try {
    await searchArtistById(req, res, artistId, findUnique, count);
  } catch (error) {
    const errorMessage = "Gagal mengambil data artist berdasarkan ID";
    errorMiddleware(error, errorMessage, res);
  }
});

artist.delete("/:id", async (req, res) => {
  const artistId = parseInt(req.params.id);
  const key = "delete";

  try {
    await searchArtistById(req, res, artistId, deleting, key);
  } catch (error) {
    const errorMessage = "Gagal menghapus data artist";
    errorMiddleware(error, errorMessage, res);
  }
});

artist.patch("/:id", async (req, res) => {
  const artistId = parseInt(req.params.id);
  const key = "patch";

  try {
    await searchArtistById(req, res, artistId, update, key);
  } catch (error) {
    const errorMessage = "Gagal memperbarui data artist (patch)";
    errorMiddleware(error, errorMessage, res);
  }
});

artist.put("/:id", async (req, res) => {
  const artistId = parseInt(req.params.id);
  const key = "put";

  try {
    await searchArtistById(req, res, artistId, update, key);
  } catch (error) {
    const errorMessage = "Gagal memperbarui data artist (put)";
    errorMiddleware(error, errorMessage, res);
  }
});

module.exports = artist;
