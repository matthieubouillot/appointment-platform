const { registerSchema } = require('./auth.schema');
const { createUser, findUserByEmail } = require('./auth.service');
const { loginSchema } = require('./auth.schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const JWT_SECRET = process.env.JWT_SECRET || 'secret';

async function register(req, res) {
  try {
    const data = registerSchema.parse(req.body);
    if (await findUserByEmail(data.email)) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const user = await createUser(data);
    res.status(201).json({ id: user.id, email: user.email, firstname: user.firstname,lastname: user.lastname, phone: user.phone, role: user.role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const data = loginSchema.parse(req.body);
    const user = await findUserByEmail(data.email);
    if (!user) return res.status(401).json({ message: "Invalid credentials" });
    const valid = await bcrypt.compare(data.password, user.password);
    if (!valid) return res.status(401).json({ message: "Invalid credentials" });
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

module.exports = { register, login };



