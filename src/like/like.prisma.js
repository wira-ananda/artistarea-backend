const prisma = require("../_db/index");

const findUnique = prisma.like222294.findUnique;
const findFirst = prisma.like222294.findFirst;
const create = prisma.like222294.create;
const deleting = prisma.like222294.delete;
const update = prisma.like222294.update;


module.exports = { findUnique, findFirst, create, deleting, update };
