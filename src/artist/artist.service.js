const existingCheck = {
  existingArtist: async (artistData, res, findUnique, create) => {
    const { name, bio, website, password } = artistData;
    const existingArtistName = await findUnique({
      where: { name },
    });

    if (existingArtistName) {
      return res.status(400).send({ message: "Artistname already exists" });
    } else {
      await createArtist(artistData, res, create);
    }
  },
};

const artistExist = existingCheck.existingArtist;

const createNew = {
  newartist: async (artistData, res, createartist) => {
    const { name, bio, website, password } = artistData;
    if (!name) {
      return res.status(400).send({ message: "Artistname is required" });
    }
    const newArtist = await createartist({
      data: {
        name,
        bio,
        website,
        password
      },
    });

    res
      .status(201)
      .send({ data: newArtist, message: "Artist created successfully!" });
  },
};

const createArtist = createNew.newartist;

const searching = {
  searchartistById: async (req, res, artistId, findArtistMethod, countFollowers, key) => {
    let artist;

    if (key === "patch") {
      const data = req.body;
      artist = await findArtistMethod({
        where: { id: artistId },
        data: data,
      });
    } else if (key === "put") {
      const { name, bio, website } = req.body;
      artist = await findArtistMethod({
        where: { id: artistId },
        data: { name, bio, website },
      });
    } else {
      artist = await findArtistMethod({
        where: { id: artistId },
        include: { followers: true },
      });
    }

    if (!artist) {
      return res.status(404).send({ message: "artist not found" });
    }

    const followersCount = await countFollowers({
      where: { artistId: artistId }
    });

    if (key === "delete") {
      res.status(200).send({ message: "Delete successfully" });
    } else {
      res.status(200).send({ data: artist, followersCount });
    }
  },
};


const searchArtistById = searching.searchartistById;

module.exports = { artistExist, createArtist, searchArtistById };