const errorMassage = (error, isi, res) => {
  console.error(error);
  res.status(500).json({ error: isi });
};

const userExist = async (userData, res, findUnique, create) => {
  const { name, email } = userData;
  const existingUserName = await findUnique({ where: { name } });
  const existingUserEmail = await findUnique({ where: { email } });

  if (existingUserName || existingUserEmail) {
    return res
      .status(400)
      .json({ message: "Username or Email already exists" });
  } else {
    await createUser(userData, res, create);
  }
};

const createUser = async (userData, res, create) => {
  const { name, email, password } = userData;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ message: "Name, Email, and Password are required" });
  }

  const newUser = await create({
    data: {
      name,
      email,
      password,
    },
  });

  res.status(201).json({ data: newUser, message: "User created successfully!" });
};

const searchUserById = async (req, res, userId, findUserMethod, key) => {
  let user;
  const data = req.body;

  if (key === "patch" || key === "put") {
    user = await findUserMethod({
      where: { id: userId },
      data: key === "patch" ? data : { name: data.name, email: data.email, password: data.password },
    });
  } else {
    user = await findUserMethod({ where: { id: userId } });
  }

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resMessage = key === "delete" ? "Delete successful" : { data: user };
  res.status(200).json(resMessage);
};

module.exports = { errorMassage, userExist, createUser, searchUserById };
