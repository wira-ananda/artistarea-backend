const { prisma } = require("../db");

const UserModel = {
  findUserById: async (id) => {
    return await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  },

  //   findUserByName: async () => {
  //     return await prisma.user.findMany({
  //       where: {
  //         name,
  //       },
  //     });
  //   },

  findUserByEmail: async (email) => {
    return await prisma.user.findUnique({
      where: { email: email },
    });
  },
};

module.exports = UserModel;
