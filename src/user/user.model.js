const prisma = require("../db/index");

const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingUser: async (userData, res) => {
    const { name, email, password } = userData;
    const existingUserEmail = await prisma.user.findUnique({
      where: { email },
    });
    const existingUserPassword = await prisma.user.findUnique({
      where: { password },
    });

    if (existingUserEmail || existingUserPassword) {
      return res.status(400).send({ message: "That already exists" });
    }
  },
};

const userExist = existingCheck.existingUser;

const createNew = {
  newUser: async (userData, res) => {
    try {
      const { name, email, password } = userData;
      if (!name || !email || !password) {
        return res
          .status(400)
          .send({ message: "Username, Email, or Password is required" });
      }

      userExist(userData, res);

      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });

      res
        .status(201)
        .send({ data: newUser, message: "User created successfully!" });
    } catch (e) {
      errorMassage(e, "error", res);
    }
  },
};

const createUser = createNew.newUser;

const searching = {
  searchUserById: async (userId, res) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ data: user });
  },
};

const searchUserById = searching.searchUserById;

module.exports = { errorMassage, userExist, createUser, searchUserById };
