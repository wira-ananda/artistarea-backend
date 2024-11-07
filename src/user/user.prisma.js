const prisma = require("../_db/index");

const findUnique = prisma.user.findUnique;
const findMany = prisma.user.findMany;
const findFirst = prisma.user.findFirst;
const create = prisma.user.create;
const deleting = prisma.user.delete;
const update = prisma.user.update;

module.exports = { findUnique, findMany, findFirst, create, deleting, update };
