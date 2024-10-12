const prisma = require("../db");
const UserModel = require("./user.model");

const findUserById = async (id) => {
  return await UserModel.findUserById(id);
};

async function findUserByEmail(email) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

module.exports = { findUserById, findUserByEmail };
