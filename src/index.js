const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const user = require("./user/user.controller");
const artist = require("./artist/artist.controller");
const artwork = require("./artwork/artwork.controller");
const like = require("./like/like.controller");
const follow = require("./follow/follow.controller");
const errorMiddleware = require("./errorMiddleware")

const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors({
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));

app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' https://vercel.live; connect-src 'self' https://vercel.live"
  );
  next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/user", user);
app.use("/artist", artist);
app.use("/artwork", artwork);
app.use("/like", like);
app.use("/follow", follow);

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
