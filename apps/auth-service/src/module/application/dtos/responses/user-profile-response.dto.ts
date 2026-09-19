import { z } from 'zod';
import { ProfileResponseSchema } from '@vubon/shared-schemas/user';

export type UserProfileResponseDTO = z.infer<typeof ProfileResponseSchema>;
