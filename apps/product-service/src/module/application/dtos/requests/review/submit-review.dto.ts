import { z } from 'zod';
import { SubmitReviewRequestSchema } from '@vubon/shared-schemas/business/product';

export type SubmitReviewRequestDTO = z.infer<typeof SubmitReviewRequestSchema>;
