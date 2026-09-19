import { z } from 'zod';
import { EnableMfaRequestSchema } from '@vubon/shared-schemas/auth';

export type EnableMfaRequestDTO = z.infer<typeof EnableMfaRequestSchema>;
