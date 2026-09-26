import { z } from 'zod';
import { CreateUserRequestSchema } from '@vubon/shared-schemas/user';

export type CreateUserRequestDTO = z.infer<typeof CreateUserRequestSchema>;
