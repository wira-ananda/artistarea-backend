const express = require("express");
const prisma = require("../db");
const router = express.Router();
const { getUser, registerUser } = require("./user.controller");

router.get("/:id", getUser);
router.post("/", registerUser);

module.exports = router;
