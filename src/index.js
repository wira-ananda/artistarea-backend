const express = require("express");
const bodyParser = require("body-parser");
const user = require("./user/user.controller");
const artist = require("./artist/artist.controller");
const artwork = require("./artwork/artwork.controller");

const app = express();

const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(bodyParser.json());

app.use("/user", user);
app.use("/artist", artist);
app.use("/artwork", artwork);
