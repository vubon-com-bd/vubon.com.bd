import { z } from 'zod';
import { SubmitKycRequestSchema } from '@vubon/shared-schemas/user';

export type SubmitKycRequestDTO = z.infer<typeof SubmitKycRequestSchema>;
