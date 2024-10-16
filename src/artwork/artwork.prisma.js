const prisma = require("../_db/index");

const findUnique = prisma.artwork.findUnique;
const create = prisma.artwork.create;
const deleting = prisma.artwork.delete;
const update = prisma.artwork.update;

module.exports = { findUnique, create, deleting, update };
