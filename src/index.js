const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Running on " + PORT);
});
