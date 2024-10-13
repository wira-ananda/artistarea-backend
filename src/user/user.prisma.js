const prisma = require("../_db/index");

const findUnique = prisma.user.findUnique;
const create = prisma.user.create;
const deleting = prisma.user.delete;
const put = prisma.user.put;

module.exports = { findUnique, create, deleting, put };
