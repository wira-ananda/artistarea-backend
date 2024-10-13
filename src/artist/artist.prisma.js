const prisma = require("../_db/index");

const findUnique = prisma.artist.findUnique;
const create = prisma.artist.create;
const deleting = prisma.artist.delete;
const update = prisma.artist.update;

module.exports = { findUnique, create, deleting, update };
