import { z } from 'zod';

export const AutocompleteSchema = z.object({
  prefix: z.string().min(1).max(200),
  limit: z.number().int().min(1).max(20).default(10),
});

export type AutocompleteRequestDTO = z.infer<typeof AutocompleteSchema>;
