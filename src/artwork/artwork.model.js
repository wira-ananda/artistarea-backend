const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const createNew = {
  newArtwork: async (artworkData, res, create) => {
    const { title, description, imageUrl, price, artistId } = artworkData;

    if (!title || !imageUrl || !price || !artistId) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newArtwork = await create({
      data: {
        title,
        description,
        imageUrl,
        price,
        artist: {
          connect: { id: artistId },
        },
      },
    });

    res.status(201).send({
      data: newArtwork,
      message: "Artwork created successfully!",
    });
  },
};

const createArtwork = createNew.newArtwork;

const searching = {
  searchArtworkById: async (req, res, artworkId, findArtworkMethod, key) => {
    let artwork;

    if (key === "patch") {
      const data = req.body;
      artwork = await findArtworkMethod({
        where: { id: artworkId },
        data: data,
      });
    } else if (key === "put") {
      const { name, bio, website } = req.body;
      artwork = await findArtworkMethod({
        where: { id: artworkId },
        data: { name, bio, website },
      });
    } else {
      artwork = await findArtworkMethod({
        where: { id: artworkId },
      });
    }

    if (!artwork) {
      return res.status(404).send({ message: "artwork not found" });
    }

    let resback = key == "delete" ? "Delete successfully" : { data: artwork };

    res.status(200).send({ resback });
  },
};

const searchArtworkById = searching.searchArtworkById;

module.exports = { createArtwork, errorMassage, searchArtworkById };
