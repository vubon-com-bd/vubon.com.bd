import { z } from 'zod';
import { UserContactPublicSchema } from '@vubon/shared-schemas/user';

export type ContactResponseDTO = z.infer<typeof UserContactPublicSchema>;
