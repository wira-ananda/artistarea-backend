const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).send({ error: isi });
};

const existingCheck = {
  existingUser: async (email, res) => {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }
  },
};

const userExist = existingCheck.existingUser;

const createNew = {
  newUser: async (userData, res) => {
    const { name, email, password } = userData;
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
