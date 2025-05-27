const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function createUser({ firstname, lastname, email, password, phone, role }) {
  const hashed = await bcrypt.hash(password, 10);
  return prisma.user.create({
    data: {
      firstname,
      lastname,
      email,
      password: hashed,
      phone,
      role: role || 'CLIENT',
    }
  });
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

module.exports = { createUser, findUserByEmail };