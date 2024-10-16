const prisma = require("../_db/index");

const findUnique = prisma.artwork.findUnique;
const findFirst = prisma.artwork.findFirst;
const create = prisma.artwork.create;
const deleting = prisma.artwork.delete;
const update = prisma.artwork.update;

module.exports = { findUnique, findFirst, create, deleting, update };
