const prisma = require("../_db/index");

const findUnique = prisma.artist222294.findUnique;
const findMany = prisma.artist222294.findMany;
const create = prisma.artist222294.create;
const deleting = prisma.artist222294.delete;
const update = prisma.artist222294.update;
const count = prisma.follow222294.count;

module.exports = { findUnique, findMany, create, deleting, update, count };
