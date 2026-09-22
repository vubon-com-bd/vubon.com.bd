import { z } from 'zod';
import { UpdateSettingsRequestSchema } from '@vubon/shared-schemas/user';

export type UpdateSettingsRequestDTO = z.infer<typeof UpdateSettingsRequestSchema>;
