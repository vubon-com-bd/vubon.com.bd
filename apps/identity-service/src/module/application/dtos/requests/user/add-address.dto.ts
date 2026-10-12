/**
 * Add Address Request DTO
 * @module identity-service/application/dtos/requests/user
 */
import type { z } from 'zod';
import type { AddAddressRequestSchema } from '@vubon/shared-schemas/user';

export type AddAddressRequestDTO = z.infer<typeof AddAddressRequestSchema>;
