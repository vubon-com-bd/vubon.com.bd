import { z } from 'zod';
import { ProfileResponseSchema } from '@vubon/shared-schemas/user';

export type ProfileResponseDTO = z.infer<typeof ProfileResponseSchema>;
