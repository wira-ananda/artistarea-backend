const { findUserById, findExistingEmailUser } = require("./user.repository");
const prisma = require("../db"); // Pastikan prisma di-import jika belum ada

const getUser = async (req, res) => {
  const userId = req.params.id;

  //controller
  try {
    const user = await findUserById(userId);
    user
      ? res.send({
          data: user,
          message: "Here's what u looking for pal!",
        })
      : res.status(404).send({ message: "User not found" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error retrieving user" });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Memanggil findExistingEmailUser dengan email sebagai parameter
    const existingUser = await findExistingEmailUser(email);
    if (existingUser) {
      return res.status(400).send({ message: "Email already exists" });
    }

    // Jika tidak ada pengguna dengan email yang sama, buat pengguna baru
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
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error creating user" });
  }
};

module.exports = { getUser, registerUser };
