/**
 * Shipment Core Schema
 * @module shared-schemas/logistics
 *
 * Shipment entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { AddressSchema } from '../common/geo/address.schema';
import { ShipmentStatusSchema, ShipmentPrioritySchema } from './shipment-status.schema';
import { ShipmentTypeSchema } from './shipment-type.schema';

export const ShipmentSchema = BaseEntitySchema.extend({
  trackingNumber: z.string().min(1).max(100),
  orderId: UuidSchema,
  userId: UuidSchema.optional(),
  vendorId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  status: ShipmentStatusSchema,
  type: ShipmentTypeSchema,
  priority: ShipmentPrioritySchema,
  courierId: UuidSchema.optional(),
  courierTrackingNumber: z.string().max(100).optional(),
  shippingAddress: AddressSchema,
  pickupAddress: AddressSchema.optional(),
  itemCount: z.number().int().positive(),
  totalWeightKg: z.number().positive().optional(),
  totalVolumeM3: z.number().positive().optional(),
  declaredValue: z.number().nonnegative().optional(),
  currency: z.string().length(3).optional(),
  shippingCost: z.number().nonnegative().optional(),
  codAmount: z.number().nonnegative().optional(),
  isCOD: z.boolean(),
  isInsured: z.boolean(),
  labelUrl: z.string().url().optional(),
  estimatedDeliveryAt: z.string().datetime().optional(),
  pickedUpAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  returnedAt: z.string().datetime().optional(),
  cancelledAt: z.string().datetime().optional(),
  notes: z.string().max(1000).optional(),
});

export const ShipmentPublicSchema = ShipmentSchema.pick({
  id: true,
  trackingNumber: true,
  status: true,
  type: true,
  priority: true,
  estimatedDeliveryAt: true,
  deliveredAt: true,
});

export const ShipmentSummarySchema = ShipmentSchema.pick({
  id: true,
  trackingNumber: true,
  status: true,
  itemCount: true,
  createdAt: true,
});

export const ShipmentCreateInputSchema = z
  .object({
    orderId: UuidSchema,
    type: ShipmentTypeSchema,
    priority: ShipmentPrioritySchema.optional(),
    shippingAddress: AddressSchema,
    pickupAddress: AddressSchema.optional(),
    courierId: UuidSchema.optional(),
    warehouseId: UuidSchema.optional(),
    itemIds: z.array(UuidSchema).min(1).max(100),
    isCOD: z.boolean().optional(),
    isInsured: z.boolean().optional(),
    notes: z.string().max(1000).optional(),
  })
  .strict();

export const ShipmentListFilterSchema = z.object({
  status: ShipmentStatusSchema.optional(),
  type: ShipmentTypeSchema.optional(),
  priority: ShipmentPrioritySchema.optional(),
  orderId: UuidSchema.optional(),
  userId: UuidSchema.optional(),
  vendorId: UuidSchema.optional(),
  courierId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  isCOD: z.boolean().optional(),
  fromDate: z.string().datetime().optional(),
  toDate: z.string().datetime().optional(),
  search: z.string().max(200).optional(),
});

export type ShipmentSchemaType = z.infer<typeof ShipmentSchema>;
export type ShipmentPublicSchemaType = z.infer<typeof ShipmentPublicSchema>;
export type ShipmentSummarySchemaType = z.infer<typeof ShipmentSummarySchema>;
export type ShipmentCreateInputSchemaType = z.infer<typeof ShipmentCreateInputSchema>;
export type ShipmentListFilterSchemaType = z.infer<typeof ShipmentListFilterSchema>;
