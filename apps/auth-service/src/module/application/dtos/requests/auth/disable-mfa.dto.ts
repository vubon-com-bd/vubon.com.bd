import { z } from 'zod';
import { DisableMfaRequestSchema } from '@vubon/shared-schemas/auth';

export type DisableMfaRequestDTO = z.infer<typeof DisableMfaRequestSchema>;
