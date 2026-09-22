import { z } from 'zod';
import { UserActivitySchema } from '@vubon/shared-schemas/user';

export type ActivityResponseDTO = z.infer<typeof UserActivitySchema>;
