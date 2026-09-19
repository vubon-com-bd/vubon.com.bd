import { z } from 'zod';
import { PreferencesResponseSchema } from '@vubon/shared-schemas/user';

export type UserPreferencesResponseDTO = z.infer<typeof PreferencesResponseSchema>;
