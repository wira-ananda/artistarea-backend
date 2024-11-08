const express = require("express");
const {
  findUnique,
  findMany,
  create,
  deleting,
  update,
  count,
} = require("./artwork.prisma");
const {
  createArtwork,
  searchArtworkById,
} = require("./artwork.service");
const errorMiddleware = require("../errorMiddleware");

const artwork = express.Router();

// Endpoint untuk membuat artwork
artwork.post("/post", async (req, res) => {
  try {
    await createArtwork(req.body, res, create);
  } catch (error) {
    const errorMessage = "Gagal membuat artwork";
    errorMiddleware(error, errorMessage, res);
  }
});

// Endpoint untuk mendapatkan semua artwork
artwork.get("/", async (req, res) => {
  try {
    const allArtworks = await findMany({
      include: {
        artist: true, 
        likes: true,
        _count: {
          select: { likes: true }, 
        },
      },
    });

    res.status(200).send({ data: allArtworks });
  } catch (error) {
    const errorMessage = "Gagal mengambil daftar artwork";
    errorMiddleware(error, errorMessage, res);
  }
});

// Endpoint untuk mendapatkan artwork berdasarkan ID
artwork.get("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);

  // Validasi ID artwork
  if (isNaN(artworkId)) {
    return res.status(400).send({ message: "ID artwork tidak valid" });
  }

  try {
    await searchArtworkById(req, res, artworkId, findUnique, count);
  } catch (error) {
    const errorMessage = "Gagal mengambil artwork berdasarkan ID";
    errorMiddleware(error, errorMessage, res);
  }
});

// Endpoint untuk menghapus artwork berdasarkan ID
artwork.delete("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);
  const key = "delete";

  // Validasi ID artwork
  if (isNaN(artworkId)) {
    return res.status(400).send({ message: "ID artwork tidak valid" });
  }

  try {
    await searchArtworkById(req, res, artworkId, deleting, key);
    res.status(200).send({ message: "Artwork berhasil dihapus" });
  } catch (error) {
    const errorMessage = "Gagal menghapus artwork";
    errorMiddleware(error, errorMessage, res);
  }
});

// Endpoint untuk memperbarui artwork berdasarkan ID
artwork.patch("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);
  const key = "patch";

  // Validasi ID artwork
  if (isNaN(artworkId)) {
    return res.status(400).send({ message: "ID artwork tidak valid" });
  }

  try {
    await searchArtworkById(req, res, artworkId, update, key);
    res.status(200).send({ message: "Artwork berhasil diperbarui" });
  } catch (error) {
    const errorMessage = "Gagal memperbarui artwork";
    errorMiddleware(error, errorMessage, res);
  }
});

// Endpoint untuk mengganti artwork berdasarkan ID
artwork.put("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);
  const key = "put";

  // Validasi ID artwork
  if (isNaN(artworkId)) {
    return res.status(400).send({ message: "ID artwork tidak valid" });
  }

  try {
    await searchArtworkById(req, res, artworkId, update, key);
    res.status(200).send({ message: "Artwork berhasil diganti" });
  } catch (error) {
    const errorMessage = "Gagal mengganti artwork";
    errorMiddleware(error, errorMessage, res);
  }
});

module.exports = artwork;
