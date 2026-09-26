import { z } from 'zod';
import { PromotionSchema } from '@vubon/shared-schemas/marketing';

export const CreatePromotionRequestSchema = PromotionSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CreatePromotionRequestDTO = z.infer<typeof CreatePromotionRequestSchema>;
