const express = require("express");
const bodyParser = require("body-parser");

const user = require("./user/user.controller");
const artist = require("./artist/artist.controller");
const artwork = require("./artwork/artwork.controller");
const like = require("./like/like.controller");
const follow = require("./follow/follow.controller");

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware untuk Content Security Policy (CSP)
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' https://vercel.live; connect-src 'self' https://vercel.live"
  );
  next();
});

// Middleware lainnya
app.use(bodyParser.json());

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to the API");
});

app.use("/user", user);
app.use("/artist", artist);
app.use("/artwork", artwork);
app.use("/like", like);
app.use("/follow", follow);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
