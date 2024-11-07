const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingFollow: async (followData, res, findFirst, create) => {
    const { userId222294, artistId222294 } = followData;
    const existingFollow = await findFirst({
      where: { userId222294: userId222294, artistId222294: artistId222294 },
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
    const { userId222294, artistId222294 } = followData;

    if (!userId222294 || !artistId222294) {
      return res.status(400).send({ message: "All fields are required" });
    }

    const newFollow = await create({
      data: {
        user222294: {
          connect: { id222294: userId222294 },
        },
        artist222294: {
          connect: { id222294: artistId222294 },
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

const searching = {
  searchFollowById: async (req, res, followId222294, findFollowMethod, key) => {
    let follow222294 = await findFollowMethod({ where: { id222294: followId222294 } });

    if (key === "delete") {
      follow222294 = await findFollowMethod({ where: { id222294: followId222294 } });
    }

    if (!follow222294) {
      return res.status(404).send({ message: "follow not found" });
    }

    if (key === "delete") {
      res.status(200).send({ message: "Delete successfully" });
    } else {
      res.status(200).send({ data: follow222294 });
    }
  },
};

const searchFollowById = searching.searchFollowById;

module.exports = {
  errorMassage,
  alreadyFollow,
  addingFollow,
  searchFollowById,
};
