import { z } from 'zod';

export const UpdateAttributeRequestSchema = z.object({
  attributeId: z.string().min(1),
  name: z.string().min(1).max(100).optional(),
  value: z.string().min(1).max(255).optional(),
});

export type UpdateAttributeRequestDTO = z.infer<typeof UpdateAttributeRequestSchema>;
