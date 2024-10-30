const prisma = require("../_db/index");

const findUnique = prisma.artwork.findUnique;
const findMany = prisma.artwork.findMany;
const create = prisma.artwork.create;
const deleting = prisma.artwork.delete;
const update = prisma.artwork.update;
const count = prisma.like.count;

module.exports = { findUnique, findMany, create, deleting, update, count };
