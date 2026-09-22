import { z } from 'zod';
import { UpdateProfileRequestSchema } from '@vubon/shared-schemas/user';

export type UpdateProfileRequestDTO = z.infer<typeof UpdateProfileRequestSchema>;
