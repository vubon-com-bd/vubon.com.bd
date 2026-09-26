/**
 * Return Shipment Schema
 * @module shared-schemas/logistics
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { AddressSchema } from '../common/geo/address.schema';
import {
  ReturnShipmentStatusSchema,
  ReturnShipmentTypeSchema,
  ReturnReasonSchema,
} from './return-reason.schema';

export const ReturnShipmentSchema = BaseEntitySchema.extend({
  rmaNumber: z.string().min(1).max(50),
  orderId: UuidSchema,
  originalShipmentId: UuidSchema.optional(),
  userId: UuidSchema,
  status: ReturnShipmentStatusSchema,
  type: ReturnShipmentTypeSchema,
  reason: ReturnReasonSchema,
  description: z.string().max(5000).optional(),
  images: z.array(z.string().url()).max(10).optional(),
  itemIds: z.array(UuidSchema).min(1).max(100),
  pickupAddress: AddressSchema,
  pickupScheduledAt: z.string().datetime().optional(),
  pickedUpAt: z.string().datetime().optional(),
  receivedAt: z.string().datetime().optional(),
  inspectedAt: z.string().datetime().optional(),
  inspectedBy: UuidSchema.optional(),
  restockable: z.boolean(),
  refundAmount: z.number().nonnegative().optional(),
  refundCurrency: z.string().length(3).optional(),
  restockFeeAmount: z.number().nonnegative().optional(),
  trackingNumber: z.string().max(100).optional(),
  notes: z.string().max(1000).optional(),
});

export const ReturnShipmentPublicSchema = ReturnShipmentSchema.pick({
  id: true,
  rmaNumber: true,
  status: true,
  type: true,
  reason: true,
  createdAt: true,
});

export const ReturnShipmentCreateInputSchema = z
  .object({
    orderId: UuidSchema,
    type: ReturnShipmentTypeSchema,
    reason: ReturnReasonSchema,
    itemIds: z.array(UuidSchema).min(1).max(100),
    description: z.string().max(5000).optional(),
    images: z.array(z.string().url()).max(10).optional(),
  })
  .strict();

export type ReturnShipmentSchemaType = z.infer<typeof ReturnShipmentSchema>;
export type ReturnShipmentPublicSchemaType = z.infer<typeof ReturnShipmentPublicSchema>;
export type ReturnShipmentCreateInputSchemaType = z.infer<typeof ReturnShipmentCreateInputSchema>;
