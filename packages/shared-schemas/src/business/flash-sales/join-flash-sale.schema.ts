/**
 * Join Flash Sale Request Schema
 * @module shared-schemas/business/flash-sales/requests
 */

import { z } from 'zod';
import { UuidSchema } from '../../common/primitives/uuid.schema';
import { ParticipantTypeSchema } from './flash-sale-participant.schema';

export const JoinFlashSaleRequestSchema = z
  .object({
    flashSaleId: UuidSchema,
    type: ParticipantTypeSchema,
    productIds: z.array(UuidSchema).max(500).optional(),
    notes: z.string().max(1000).optional(),
  })
  .strict();

export type JoinFlashSaleRequestSchemaType = z.infer<typeof JoinFlashSaleRequestSchema>;
