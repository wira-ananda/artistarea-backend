const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingUser: async (userData, res, findUnique, create) => {
    const { name222294, email222294, password222294 } = userData;
    const existingUserName222294 = await findUnique({
      where: { name222294 },
    });
    const existingUserEmail222294 = await findUnique({
      where: { email222294 },
    });
    const existingUserPassword222294 = await findUnique({
      where: { password222294 },
    });

    if (existingUserName222294 || existingUserEmail222294 || existingUserPassword222294) {
      return res
        .status(400)
        .send({ message: "One of the option is already exists" });
    } else {
      await createUser(userData, res, create);
    }
  },
};

const userExist = existingCheck.existingUser;

const createNew = {
  newUser: async (userData, res, createUser) => {
    const { name222294, email222294, password222294 } = userData;
    if (!name222294 || !email222294 || !password222294) {
      return res
        .status(400)
        .send({ message: "Username, Email, or Password is required" });
    }
    const newUser222294 = await createUser({
      data: {
        name222294,
        email222294,
        password222294,
      },
    });

    res
      .status(201)
      .send({ data: newUser222294, message: "User created successfully!" });
  },
};

const createUser = createNew.newUser;

const searching = {
  searchUserById: async (req, res, userId222294, findUserMethod, key) => {
    let user222294;

    if (key === "patch") {
      const data = req.body;
      user222294 = await findUserMethod({
        where: { id222294: userId222294 },
        data: data,
      });
    } else if (key === "put") {
      const { name222294, email222294, password222294 } = req.body;
      user222294 = await findUserMethod({
        where: { id222294: userId222294 },
        data: { name222294, email222294, password222294 },
      });
    } else {
      user222294 = await findUserMethod({ where: { id222294: userId222294 } });
    }

    if (!user222294) {
      return res.status(404).send({ message: "user not found" });
    }

    if (key === "delete") {
      res.status(200).send({ message: "Delete successfully" });
    } else {
      res.status(200).send({ data: user222294 });
    }
  },
};

const searchUserById = searching.searchUserById;

module.exports = { errorMassage, userExist, createUser, searchUserById };
