import { z } from 'zod';
import { UpdatePreferencesRequestSchema } from '@vubon/shared-schemas/user';

export type UpdatePreferencesRequestDTO = z.infer<typeof UpdatePreferencesRequestSchema>;
