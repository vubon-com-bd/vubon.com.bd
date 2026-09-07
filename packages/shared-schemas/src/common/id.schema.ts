import { z } from 'zod';

export const IDSchema = z.object({
  id: z.string().uuid().or(z.number().int().positive()),
});

export const IDParamSchema = z.object({
  id: z.string().uuid(),
});

export const IDsSchema = z.object({
  ids: z.array(z.string().uuid()).min(1).max(100),
});
