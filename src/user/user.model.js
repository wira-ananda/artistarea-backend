const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingUser: async (userData, res, findUnique, create) => {
    const { name, email, password } = userData;
    const existingUserName = await findUnique({
      where: { name },
    });
    const existingUserEmail = await findUnique({
      where: { email },
    });
    const existingUserPassword = await findUnique({
      where: { password },
    });

    if (existingUserName || existingUserEmail || existingUserPassword) {
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
    const { name, email, password } = userData;
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ message: "Username, Email, or Password is required" });
    }
    const newUser = await createUser({
      data: {
        name,
        email,
        password,
      },
    });

    res
      .status(201)
      .send({ data: newUser, message: "User created successfully!" });
  },
};

const createUser = createNew.newUser;

const searching = {
  searchUserById: async (req, res, userId, findUserMethod, key) => {
    let user;

    if (key === "patch") {
      const data = req.body;
      user = await findUserMethod({
        where: { id: userId },
        data: data,
      });
    } else if (key === "put") {
      const { name, email, password } = req.body;
      user = await findUserMethod({
        where: { id: userId },
        data: { name, email, password },
      });
    } else {
      user = await findUserMethod({ where: { id: userId } });
    }

    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    if (key === "delete") {
      res.status(200).send({ message: "Delete successfully" });
    } else {
      res.status(200).send({ data: user });
    }
  },
};

const searchUserById = searching.searchUserById;

module.exports = { errorMassage, userExist, createUser, searchUserById };
