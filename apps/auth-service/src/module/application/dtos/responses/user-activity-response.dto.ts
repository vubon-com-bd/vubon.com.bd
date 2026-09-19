import { z } from 'zod';
import { UserActivitySchema } from '@vubon/shared-schemas/user';

export type UserActivityResponseDTO = z.infer<typeof UserActivitySchema>;
