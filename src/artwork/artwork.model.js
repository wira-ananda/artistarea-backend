const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const createNew = {
  newArtwork: async (artworkData, res, create) => {
    const { title222294, description222294, imageUrl222294, price222294, artistId222294 } = artworkData;

    if (!title222294 || !imageUrl222294 || !price222294 || !artistId222294) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newArtwork = await create({
      data: {
        title222294,
        description222294,
        imageUrl222294,
        price222294,
        artist222294: {
          connect: { id222294: artistId222294 },
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
  searchArtworkById: async (req, res, artworkId222294, findArtworkMethod, countArtworkLikes, key) => {
    let artwork222294;

    if (key === "patch") {
      const data222294 = req.body;
      artwork222294 = await findArtworkMethod({
        where: { id222294: artworkId222294 },
        data: data222294,
      });
    } else if (key === "put") {
      const { name222294, bio222294, website222294 } = req.body;
      artwork222294 = await findArtworkMethod({
        where: { id222294: artworkId222294 },
        data: { name222294, bio222294, website222294 },
      });
    } else {
      artwork222294 = await findArtworkMethod({
        where: { id222294: artworkId222294 },
        include: {
          artist222294: true,
          likes222294: true,
        },
      });
    }

    const likeCount222294 = await countArtworkLikes({
      where: { artworkId222294: artworkId222294 },
    });
    
    if (!artwork222294) {
      return res.status(404).send({ message: "artwork not found" });
    }

    if (key === "delete") {
      res.status(200).send({ message: "Delete successfully" });
    } else {
      res.status(200).send({ data: artwork222294, likeCount222294 });
    }
  },
};

const searchArtworkById = searching.searchArtworkById;

module.exports = { createArtwork, errorMassage, searchArtworkById };
