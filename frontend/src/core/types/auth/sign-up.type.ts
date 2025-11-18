import { z } from 'zod';

export const signUpSchema = z
  .object({
    username: z.string().min(1, { message: 'Username is required' }),
    email: z
      .string()
      .min(1, { message: 'Email is required' })
      .email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords must match',
  });

export type SignUpTypes = z.infer<typeof signUpSchema>;
