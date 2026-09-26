import { z } from 'zod';
import { AddContactRequestSchema } from '@vubon/shared-schemas/user';

export type AddContactRequestDTO = z.infer<typeof AddContactRequestSchema>;
