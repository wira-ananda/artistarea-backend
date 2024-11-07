const prisma = require("../_db/index");

const findUnique = prisma.like.findUnique;
const findFirst = prisma.like.findFirst;
const create = prisma.like.create;
const deleting = prisma.like.delete;
const update = prisma.like.update;


module.exports = { findUnique, findFirst, create, deleting, update };
