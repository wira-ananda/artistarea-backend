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
    const isi = "Failed to fetch artworks";
    errorMassage(error, isi, res);
  }
});

artwork.get("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);

  if (isNaN(artworkId)) {
    return res.status(400).send({ message: "Invalid artwork ID" });
  }

  try {
    await searchArtworkById(req, res, artworkId, findUnique, count);
  } catch (error) {
    const isi = "Failed to fetch artwork";
    errorMassage(error, isi, res);
  }
});

artwork.delete("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);
  const key = "delete";

  if (isNaN(artworkId)) {
    return res.status(400).send({ message: "Invalid artwork ID" });
  }

  try {
    await searchArtworkById(req, res, artworkId, deleting, key);
    res.status(200).send({ message: "Artwork deleted successfully" });
  } catch (error) {
    const isi = "Failed to delete artwork";
    errorMassage(error, isi, res);
  }
});

artwork.patch("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);
  const key = "patch";

  if (isNaN(artworkId)) {
    return res.status(400).send({ message: "Invalid artwork ID" });
  }

  try {
    await searchArtworkById(req, res, artworkId, update, key);
    res.status(200).send({ message: "Artwork updated successfully" });
  } catch (error) {
    const isi = "Failed to update artwork";
    errorMassage(error, isi, res);
  }
});

artwork.put("/:id", async (req, res) => {
  const artworkId = parseInt(req.params.id);
  const key = "put";

  // Validasi ID artwork
  if (isNaN(artworkId)) {
    return res.status(400).send({ message: "Invalid artwork ID" });
  }

  try {
    await searchArtworkById(req, res, artworkId, update, key);
    res.status(200).send({ message: "Artwork replaced successfully" });
  } catch (error) {
    const isi = "Failed to replace artwork";
    errorMassage(error, isi, res);
  }
});

module.exports = artwork;
