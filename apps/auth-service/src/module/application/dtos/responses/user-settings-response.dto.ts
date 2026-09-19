import { z } from 'zod';
import { SettingsResponseSchema } from '@vubon/shared-schemas/user';

export type UserSettingsResponseDTO = z.infer<typeof SettingsResponseSchema>;
