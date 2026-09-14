/**
 * Flash Sale Participant Schema
 * @module shared-schemas/business/flash-sales
 *
 * Values আসে shared-constants/business/flash-sale-participant.constants থেকে।
 */

import { z } from 'zod';
import {
  FLASH_SALE_PARTICIPANT_TYPE,
  FLASH_SALE_PARTICIPANT_STATUS,
} from '@vubon/shared-constants/business';
import { UuidSchema } from '../../common/primitives/uuid.schema';

export const ParticipantTypeSchema = z.enum(
  Object.values(FLASH_SALE_PARTICIPANT_TYPE) as [string, ...string[]]
);

export const ParticipantStatusSchema = z.enum(
  Object.values(FLASH_SALE_PARTICIPANT_STATUS) as [string, ...string[]]
);

export const FlashSaleParticipantSchema = z.object({
  id: UuidSchema,
  flashSaleId: UuidSchema,
  type: ParticipantTypeSchema,
  status: ParticipantStatusSchema,
  vendorId: UuidSchema.optional(),
  productId: UuidSchema.optional(),
  variantId: UuidSchema.optional(),
  categoryId: UuidSchema.optional(),
  brandId: UuidSchema.optional(),
  invitedAt: z.string().datetime(),
  respondedAt: z.string().datetime().optional(),
  approvedBy: UuidSchema.optional(),
  rejectedReason: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
});

export type ParticipantTypeSchemaType = z.infer<typeof ParticipantTypeSchema>;
export type ParticipantStatusSchemaType = z.infer<typeof ParticipantStatusSchema>;
export type FlashSaleParticipantSchemaType = z.infer<typeof FlashSaleParticipantSchema>;
