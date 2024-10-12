const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");

const app = express();
const userRoutes = require("./user/user.routes");

app.use(express.json());
app.use(cors());

dotenv.config();
const PORT = process.env.PORT;

app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log("Running on " + PORT);
});
