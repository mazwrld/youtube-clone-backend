import { object, string, TypeOf } from 'zod';

export const registerUserSchema = {
  body: object({
    username: string({ required_error: 'Username is required.' }),
    email: string({ required_error: 'Email is required.' }).email(
      'Invalid email.'
    ),
    password: string({ required_error: 'Password is required.' })
      .min(6, 'Password must be at least 6 characters long.')
      .max(64, 'Password must be at most 64 characters long.'),
    confirmPassword: string({
      required_error: 'Confirm Password is required.',
    }),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  }),
};

export type RegisterUserBody = TypeOf<typeof registerUserSchema.body>;
