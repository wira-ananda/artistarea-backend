const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingUser: async (userData, res, findUnique) => {
    const { name, email, password } = userData;
    const existingUserUser = await findUnique({
      where: { user },
    });
    const existingUserEmail = await findUnique({
      where: { email },
    });
    const existingUserPassword = await findUnique({
      where: { password },
    });

    if (existingUserUser || existingUserEmail || existingUserPassword) {
      return res
        .status(400)
        .send({ message: "One of the option is already exists" });
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
    const data = req.body;

    const user = await findUserMethod(
      key == "patch" || key == "put"
        ? {
            where: { id: userId },
            data: data,
          }
        : { where: { id: userId } }
    );

    if (!user) {
      return res.status(404).send({ message: "user not found" });
    }

    let resback = key == "delete" ? "Delete successfully" : { data: user };

    res.status(200).send({ resback });
  },
};

const searchUserById = searching.searchUserById;

module.exports = { errorMassage, userExist, createUser, searchUserById };
