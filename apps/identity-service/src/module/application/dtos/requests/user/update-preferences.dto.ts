/**
 * Update Preferences Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import type { z } from 'zod';
import type { UpdatePreferencesRequestSchema } from '@vubon/shared-schemas/user';

export type UpdatePreferencesRequestDTO = z.infer<typeof UpdatePreferencesRequestSchema>;
