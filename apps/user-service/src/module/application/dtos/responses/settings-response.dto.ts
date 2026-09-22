import { z } from 'zod';
import { SettingsResponseSchema } from '@vubon/shared-schemas/user';

export type SettingsResponseDTO = z.infer<typeof SettingsResponseSchema>;
