const prisma = require("../_db/index");

const findUnique = prisma.user222294.findUnique;
const findMany = prisma.user222294.findMany;
const findFirst = prisma.user222294.findFirst;
const create = prisma.user222294.create;
const deleting = prisma.user222294.delete;
const update = prisma.user222294.update;

module.exports = { findUnique, findMany, findFirst, create, deleting, update };
