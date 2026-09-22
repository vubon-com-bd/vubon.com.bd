import { z } from 'zod';
import { ReviewPublicSchema } from '@vubon/shared-schemas/business/product';

export type ReviewResponseDTO = z.infer<typeof ReviewPublicSchema>;
