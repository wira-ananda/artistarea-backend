const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingLike: async (likeData, res, findFirst, create) => {
    const { userId, artworkId } = likeData;
    const existingLike = await findFirst({
      where: { userId: userId, artworkId: artworkId },
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
    const { userId, artworkId } = likeData;

    if (!userId || !artworkId) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newLike = await create({
      data: {
        user: {
          connect: { id: userId },
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

module.exports = { errorMassage, alreadyLike, addingLike };
