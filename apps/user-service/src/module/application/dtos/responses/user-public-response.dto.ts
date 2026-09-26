import { z } from 'zod';
import { UserPublicSchema } from '@vubon/shared-schemas/user';

export type UserPublicResponseDTO = z.infer<typeof UserPublicSchema>;
