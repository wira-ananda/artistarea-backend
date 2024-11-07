const prisma = require("../_db/index");

const findUnique = prisma.follow.findUnique;
const findFirst = prisma.follow.findFirst;
const create = prisma.follow.create;
const deleting = prisma.follow.delete;
const update = prisma.follow.update;

module.exports = { findUnique, findFirst, create, deleting, update };
