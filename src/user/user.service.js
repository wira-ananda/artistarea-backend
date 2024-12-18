async function validateAndCreate (userData, res, findUnique, create) {
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
  };

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

module.exports = { validateAndCreate, searchUserById };