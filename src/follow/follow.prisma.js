const prisma = require("../_db/index");

const findUnique = prisma.follow222294.findUnique;
const findFirst = prisma.follow222294.findFirst;
const create = prisma.follow222294.create;
const deleting = prisma.follow222294.delete;
const update = prisma.follow222294.update;

module.exports = { findUnique, findFirst, create, deleting, update };
