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
  searchArtworkById: async (req, res, artworkId, findArtworkMethod, countArtworkLikes, key) => {
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
        include: {
          artist: true,
          likes: true,
        }
      });
    }

    const likeCount = await countArtworkLikes({
      where: {artworkId: artworkId}
    })
    
    if (!artwork) {
      return res.status(404).send({ message: "artwork not found" });
    }

    if (key === "delete") {
      res.status(200).send({ message: "Delete successfully" });
    } else {
      res.status(200).send({ data: artwork, likeCount });
    }
  },
};

const searchArtworkById = searching.searchArtworkById;

module.exports = { createArtwork, searchArtworkById };