import { z } from 'zod';
import { UserResponseSchema } from '@vubon/shared-schemas/user';

export type UserResponseDTO = z.infer<typeof UserResponseSchema>;
