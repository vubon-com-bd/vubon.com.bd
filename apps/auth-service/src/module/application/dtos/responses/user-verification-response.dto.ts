import { z } from 'zod';
import { UserVerificationSummarySchema } from '@vubon/shared-schemas/user';

export type UserVerificationResponseDTO = z.infer<typeof UserVerificationSummarySchema>;
