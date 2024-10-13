const prisma = require("../_db/index");

const findUnique = prisma.artist.findUnique;
const create = prisma.artist.create;
const deleting = prisma.artist.delete;
const put = prisma.artist.put;

module.exports = { findUnique, create, deleting, put };
