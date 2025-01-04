import { z } from 'zod';

export const nameSchema = z
  .string()
  .min(3, { message: 'Name must be at least 3 characters long.' })
  .max(50, { message: 'Name cannot exceed 50 characters.' });

export const emailSchema = z.string().email({ message: 'Please provide a valid email address.' });

export const passwordSchema = z
  .string()
  .min(8, { message: 'Password must be at least 8 characters long.' })
  .max(100, { message: 'Password cannot exceed 100 characters.' })
  .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter.' })
  .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter.' })
  .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
  .regex(/[@$!%*?&#]/, { message: 'Password must contain at least one special character.' });

export const idSchema = z.string();

export const dateSchema = z.date();
