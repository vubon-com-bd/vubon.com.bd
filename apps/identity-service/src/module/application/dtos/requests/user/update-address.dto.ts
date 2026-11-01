/**
 * Update Address Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import type { z } from 'zod';
import type { UpdateAddressRequestSchema } from '@vubon/shared-schemas/user';

export type UpdateAddressRequestDTO = z.infer<typeof UpdateAddressRequestSchema>;
