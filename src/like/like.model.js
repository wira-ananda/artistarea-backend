const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingLike: async (likeData, res, findFirst, create) => {
    const { likeId222294, artworkId222294 } = likeData;
    const existingLike222294 = await findFirst({
      where: { likeId222294: likeId222294, artworkId222294: artworkId222294 },
    });

    if (existingLike222294) {
      return res.status(400).send({ message: "U already like this one" });
    } else {
      await addingLike(likeData, res, create);
    }
  },
};

const alreadyLike = existingCheck.existingLike;

const createNew = {
  newLike: async (likeData, res, create) => {
    const { likeId222294, artworkId222294 } = likeData;

    if (!likeId222294 || !artworkId222294) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newLike222294 = await create({
      data: {
        like222294: {
          connect: { id222294: likeId222294 },
        },
        artwork222294: {
          connect: { id222294: artworkId222294 },
        },
      },
    });

    res.status(201).send({
      data: newLike222294,
      message: "Like added successfully!",
    });
  },
};

const addingLike = createNew.newLike;

const searching = {
  searchLikeById: async (req, res, likeId222294, findLikeMethod, key) => {
    let like222294 = await findLikeMethod({ where: { id222294: likeId222294 } });
    
    if (!like222294) {
      return res.status(404).send({ message: "like not found" });
    }

    if (key === "delete") {
      res.status(200).send({ message: "Delete successfully" });
    } else {
      res.status(200).send({ data: like222294 });
    }
  },
};

const searchLikeById = searching.searchLikeById;

module.exports = { errorMassage, alreadyLike, addingLike, searchLikeById };
