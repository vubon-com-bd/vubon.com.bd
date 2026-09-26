import { z } from 'zod';
import { UserContactInputSchema } from '@vubon/shared-schemas/user';

export type UpdateContactRequestDTO = z.infer<typeof UserContactInputSchema>;
