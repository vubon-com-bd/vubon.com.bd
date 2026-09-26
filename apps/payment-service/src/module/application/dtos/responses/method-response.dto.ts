import { z } from 'zod';

export const MethodPublicResponseSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  provider: z.string().nullable().optional(),
  cardLast4: z.string().length(4).nullable().optional(),
  cardBrand: z.string().nullable().optional(),
  isDefault: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
});

export type MethodResponseDTO = z.infer<typeof MethodPublicResponseSchema>;
