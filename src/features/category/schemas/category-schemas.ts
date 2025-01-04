import { z } from 'zod';
import { Category } from '@prisma/client';
import { idSchema, nameSchema } from '@/schemas/base-schemas';

export const createCategorySchema = z.object({
  name: nameSchema,
  plaidId: idSchema.optional(),
});

export const updateCategorySchema = z.object({
  name: nameSchema,
  plaidId: idSchema.optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;
export type CategoryResponse = Category;
