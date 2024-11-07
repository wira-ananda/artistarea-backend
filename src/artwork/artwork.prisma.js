const prisma = require("../_db/index");

const findUnique = prisma.artwork222294.findUnique;
const findMany = prisma.artwork222294.findMany;
const create = prisma.artwork222294.create;
const deleting = prisma.artwork222294.delete;
const update = prisma.artwork222294.update;
const count = prisma.like222294.count;

module.exports = { findUnique, findMany, create, deleting, update, count };
