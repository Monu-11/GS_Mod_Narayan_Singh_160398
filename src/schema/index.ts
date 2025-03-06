import { z } from 'zod';

const userSchema = z.object({
  email: z.string().email('Invalid Email'),
  password: z.string().min(6, 'Password must be minium 6 characters'),
});

export { userSchema };
