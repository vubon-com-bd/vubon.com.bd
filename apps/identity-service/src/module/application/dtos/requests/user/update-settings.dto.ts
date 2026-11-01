/**
 * Update Settings Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import type { z } from 'zod';
import type { UpdateSettingsRequestSchema } from '@vubon/shared-schemas/user';

export type UpdateSettingsRequestDTO = z.infer<typeof UpdateSettingsRequestSchema>;
