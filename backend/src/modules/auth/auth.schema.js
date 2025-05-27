const { z } = require('zod');

const registerSchema = z.object({
  firstname: z.string().min(2),
  lastname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  phone: z.string().min(8),
  role: z.enum(['CLIENT', 'PROVIDER']).optional()
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

module.exports = { registerSchema, loginSchema };

