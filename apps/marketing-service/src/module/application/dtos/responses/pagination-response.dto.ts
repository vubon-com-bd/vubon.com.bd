import { z } from 'zod';

export const PaginationMetaSchema = z.object({
  page: z.number().int().positive(),
  limit: z.number().int().positive(),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
});

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(item: T) =>
  z.object({
    items: z.array(item),
    meta: PaginationMetaSchema,
  });

export type PaginationMetaDTO = z.infer<typeof PaginationMetaSchema>;
