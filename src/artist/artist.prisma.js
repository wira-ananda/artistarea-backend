const prisma = require("../_db/index");

const findUnique = prisma.artist.findUnique;
const findMany = prisma.artist.findMany;
const create = prisma.artist.create;
const deleting = prisma.artist.delete;
const update = prisma.artist.update;
const count = prisma.follow.count;

module.exports = { findUnique, findMany, create, deleting, update, count };
