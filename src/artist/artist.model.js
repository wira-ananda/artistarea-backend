const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingArtist: async (artistData, res, findUnique, create) => {
    const { name222294, bio222294, website222294, password222294 } = artistData;
    const existingArtistName222294 = await findUnique({
      where: { name222294 },
    });

    if (existingArtistName222294) {
      return res.status(400).send({ message: "Artistname already exists" });
    } else {
      await createArtist(artistData, res, create);
    }
  },
};

const artistExist = existingCheck.existingArtist;

const createNew = {
  newartist: async (artistData, res, createartist) => {
    const { name222294, bio222294, website222294, password222294 } = artistData;
    if (!name222294) {
      return res.status(400).send({ message: "Artistname is required" });
    }
    const newArtist222294 = await createartist({
      data: {
        name222294,
        bio222294,
        website222294,
        password222294,
      },
    });

    res
      .status(201)
      .send({ data: newArtist222294, message: "Artist created successfully!" });
  },
};

const createArtist = createNew.newartist;

const searching = {
  searchartistById: async (req, res, artistId222294, findArtistMethod, countFollowers, key) => {
    let artist222294;

    if (key === "patch") {
      const data222294 = req.body;
      artist222294 = await findArtistMethod({
        where: { id222294: artistId222294 },
        data: data222294,
      });
    } else if (key === "put") {
      const { name222294, bio222294, website222294 } = req.body;
      artist222294 = await findArtistMethod({
        where: { id222294: artistId222294 },
        data: { name222294, bio222294, website222294 },
      });
    } else {
      artist222294 = await findArtistMethod({
        where: { id222294: artistId222294 },
        include: { followers222294: true },
      });
    }

    if (!artist222294) {
      return res.status(404).send({ message: "artist not found" });
    }

    const followersCount222294 = await countFollowers({
      where: { artistId222294: artistId222294 },
    });

    if (key === "delete") {
      res.status(200).send({ message: "Delete successfully" });
    } else {
      res.status(200).send({ data: artist222294, followersCount222294 });
    }
  },
};

const searchArtistById = searching.searchartistById;

module.exports = { errorMassage, artistExist, createArtist, searchArtistById };
