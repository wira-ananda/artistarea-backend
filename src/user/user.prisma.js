const prisma = require("../_db/index");

const findUnique = prisma.user.findUnique;
const findFirst = prisma.user.findFirst;
const create = prisma.user.create;
const deleting = prisma.user.delete;
const update = prisma.user.update;

module.exports = { findUnique, findFirst, create, deleting, update };
