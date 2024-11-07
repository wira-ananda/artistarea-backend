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

const artwork222294 = express.Router();

artwork222294.post("/post", async (req, res) => {
  try {
    await createArtwork(req.body, res, create);
  } catch (error) {
    const isi = "Failed to create artwork";
    errorMassage(error, isi, res);
  }
});

artwork222294.get("/", async (req, res) => {
  try {
    const allArtworks222294 = await findMany({
      include: {
        artist: true,
        likes: true,
        _count: {
          select: { likes: true },
        },
      },
    });

    res.status(200).send({ data: allArtworks222294 });
  } catch (error) {
    const isi = "Failed to fetch artworks";
    errorMassage(error, isi, res);
  }
});

artwork222294.get("/:id", async (req, res) => {
  const artworkId222294 = parseInt(req.params.id);

  if (isNaN(artworkId222294)) {
    return res.status(400).send({ message: "Invalid artwork ID" });
  }

  try {
    await searchArtworkById(req, res, artworkId222294, findUnique, count);
  } catch (error) {
    const isi = "Failed to fetch artwork";
    errorMassage(error, isi, res);
  }
});

artwork222294.delete("/:id", async (req, res) => {
  const artworkId222294 = parseInt(req.params.id);
  const key = "delete";

  if (isNaN(artworkId222294)) {
    return res.status(400).send({ message: "Invalid artwork ID" });
  }

  try {
    await searchArtworkById(req, res, artworkId222294, deleting, key);
    res.status(200).send({ message: "Artwork deleted successfully" });
  } catch (error) {
    const isi = "Failed to delete artwork";
    errorMassage(error, isi, res);
  }
});

artwork222294.patch("/:id", async (req, res) => {
  const artworkId222294 = parseInt(req.params.id);
  const key = "patch";

  if (isNaN(artworkId222294)) {
    return res.status(400).send({ message: "Invalid artwork ID" });
  }

  try {
    await searchArtworkById(req, res, artworkId222294, update, key);
    res.status(200).send({ message: "Artwork updated successfully" });
  } catch (error) {
    const isi = "Failed to update artwork";
    errorMassage(error, isi, res);
  }
});

artwork222294.put("/:id", async (req, res) => {
  const artworkId222294 = parseInt(req.params.id);
  const key = "put";

  if (isNaN(artworkId222294)) {
    return res.status(400).send({ message: "Invalid artwork ID" });
  }

  try {
    await searchArtworkById(req, res, artworkId222294, update, key);
    res.status(200).send({ message: "Artwork replaced successfully" });
  } catch (error) {
    const isi = "Failed to replace artwork";
    errorMassage(error, isi, res);
  }
});

module.exports = artwork222294;
