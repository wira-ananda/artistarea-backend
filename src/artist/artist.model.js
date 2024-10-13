const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingArtist: async (artistData, res, findUnique) => {
    const { name, bio, website } = artistData;
    const existingArtistName = await findUnique({
      where: { name },
    });

    if (existingArtistName) {
      return res.status(400).send({ message: "Artistname already exists" });
    }
  },
};

const artistExist = existingCheck.existingArtist;

const createNew = {
  newartist: async (artistData, res, createartist) => {
    const { name, bio, website } = artistData;
    if (!name) {
      return res.status(400).send({ message: "Artistname is required" });
    }
    const newArtist = await createartist({
      data: {
        name,
        bio,
        website,
      },
    });

    res
      .status(201)
      .send({ data: newArtist, message: "Artist created successfully!" });
  },
};

const createArtist = createNew.newartist;

const searching = {
  searchartistById: async (req, res, artistId, findArtistMethod, key) => {
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
      });
    }

    if (!artist) {
      return res.status(404).send({ message: "artist not found" });
    }

    let resback = key == "delete" ? "Delete successfully" : { data: artist };

    res.status(200).send({ resback });
  },
};

const searchArtistById = searching.searchartistById;

module.exports = { errorMassage, artistExist, createArtist, searchArtistById };
