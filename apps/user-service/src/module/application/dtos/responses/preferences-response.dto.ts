import { z } from 'zod';
import { PreferencesResponseSchema } from '@vubon/shared-schemas/user';

export type PreferencesResponseDTO = z.infer<typeof PreferencesResponseSchema>;
