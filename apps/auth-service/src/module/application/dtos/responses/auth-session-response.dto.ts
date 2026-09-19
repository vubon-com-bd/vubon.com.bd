import { z } from 'zod';
import { AuthSessionPublicSchema } from '@vubon/shared-schemas/auth';

export type AuthSessionResponseDTO = z.infer<typeof AuthSessionPublicSchema>;
