const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingFollow: async (followData, res, findFirst, create) => {
    const { userId, artistId } = followData;
    const existingFollow = await findFirst({
      where: { userId: userId, artistId: artistId },
    });

    if (existingFollow) {
      return res.status(400).send({ message: "U already follow the artist" });
    } else {
      await addingFollow(followData, res, create);
    }
  },
};

const alreadyFollow = existingCheck.existingFollow;

const createNew = {
  newFollow: async (followData, res, create) => {
    const { userId, artistId } = followData;

    if (!userId || !artistId) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newFollow = await create({
      data: {
        user: {
          connect: { id: userId },
        },
        artist: {
          connect: { id: artistId },
        },
      },
    });

    res.status(201).send({
      data: newFollow,
      message: "Like added successfully!",
    });
  },
};

const addingFollow = createNew.newFollow;

module.exports = { errorMassage, alreadyFollow, addingFollow };
