const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingLike: async (likeData, res, findFirst, create) => {
    const { likeId, artworkId } = likeData;
    const existingLike = await findFirst({
      where: { likeId: likeId, artworkId: artworkId },
    });

    if (existingLike) {
      return res.status(400).send({ message: "U already like this one" });
    } else {
      await addingLike(likeData, res, create);
    }
  },
};

const alreadyLike = existingCheck.existingLike;

const createNew = {
  newLike: async (likeData, res, create) => {
    const { likeId, artworkId } = likeData;

    if (!likeId || !artworkId) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newLike = await create({
      data: {
        like: {
          connect: { id: likeId },
        },
        artwork: {
          connect: { id: artworkId },
        },
      },
    });

    res.status(201).send({
      data: newLike,
      message: "Like added successfully!",
    });
  },
};

const addingLike = createNew.newLike;

const searching = {
  searchLikeById: async (req, res, likeId, findLikeMethod, key) => {
    let like = await findLikeMethod({ where: { id: likeId } });
    

    if (!like) {
      return res.status(404).send({ message: "like not found" });
    }

    if (key === "delete") {
      res.status(200).send({ message: "Delete successfully" });
    } else {
      res.status(200).send({ data: like });
    }
  },
};

const searchLikeById = searching.searchLikeById;

module.exports = { errorMassage, alreadyLike, addingLike, searchLikeById };
