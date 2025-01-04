import { z } from 'zod';
import { nameSchema, emailSchema, passwordSchema } from '@/schemas/base-schemas';

export const signUpSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});

export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
