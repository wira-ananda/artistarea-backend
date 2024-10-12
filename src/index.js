const express = require("express");
const bodyParser = require("body-parser");
const router = require("./user/user.controller");

const app = express();

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(bodyParser.json());

app.use("/user", router);
