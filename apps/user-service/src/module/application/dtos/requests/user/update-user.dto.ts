import { z } from 'zod';
import { UpdateUserRequestSchema } from '@vubon/shared-schemas/user';

export type UpdateUserRequestDTO = z.infer<typeof UpdateUserRequestSchema>;
