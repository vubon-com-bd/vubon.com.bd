import { z } from 'zod';
import { PromotionSchema } from '@vubon/shared-schemas/marketing';

export const UpdatePromotionRequestSchema = PromotionSchema.partial().omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type UpdatePromotionRequestDTO = z.infer<typeof UpdatePromotionRequestSchema>;
