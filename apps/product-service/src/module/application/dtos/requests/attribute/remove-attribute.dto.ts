import { z } from 'zod';

export const RemoveAttributeRequestSchema = z.object({
  attributeId: z.string().min(1),
});

export type RemoveAttributeRequestDTO = z.infer<typeof RemoveAttributeRequestSchema>;
