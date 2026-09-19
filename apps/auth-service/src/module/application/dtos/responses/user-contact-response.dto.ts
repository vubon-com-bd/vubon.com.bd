import { z } from 'zod';
import { UserContactPublicSchema } from '@vubon/shared-schemas/user';

export type UserContactResponseDTO = z.infer<typeof UserContactPublicSchema>;
