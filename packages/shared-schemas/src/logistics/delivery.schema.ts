/**
 * Delivery Core Schema
 * @module shared-schemas/logistics
 *
 * Delivery entity + aggregator।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';
import { AddressSchema } from '../common/geo/address.schema';
import { DeliveryStatusSchema, DeliveryAttemptStatusSchema } from './delivery-status.schema';
import { DeliveryTypeSchema } from './delivery-type.schema';

export const DeliveryAttemptSchema = z.object({
  id: z.string().min(1),
  attemptNumber: z.number().int().positive(),
  status: DeliveryAttemptStatusSchema,
  reason: z.string().max(500).optional(),
  driverId: UuidSchema.optional(),
  attemptedAt: z.string().datetime(),
  location: z.string().max(255).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
  images: z.array(z.string().url()).max(5).optional(),
  notes: z.string().max(500).optional(),
});

export const ProofOfDeliverySchema = z.object({
  type: z.enum(['signature', 'otp', 'photo', 'id_verification', 'contactless']),
  signatureUrl: z.string().url().optional(),
  photoUrl: z.string().url().optional(),
  otp: z
    .string()
    .regex(/^\d{4,8}$/)
    .optional(),
  idNumber: z.string().max(100).optional(),
  recipientName: z.string().max(150).optional(),
  capturedAt: z.string().datetime(),
});

export const DeliverySchema = BaseEntitySchema.extend({
  shipmentId: UuidSchema,
  orderId: UuidSchema,
  userId: UuidSchema.optional(),
  status: DeliveryStatusSchema,
  type: DeliveryTypeSchema,
  driverId: UuidSchema.optional(),
  vehicleId: UuidSchema.optional(),
  routeId: UuidSchema.optional(),
  recipientName: z.string().max(150).optional(),
  recipientPhone: PhoneSchema.optional(),
  deliveryAddress: AddressSchema,
  scheduledAt: z.string().datetime().optional(),
  pickedUpAt: z.string().datetime().optional(),
  arrivedAt: z.string().datetime().optional(),
  deliveredAt: z.string().datetime().optional(),
  failedAt: z.string().datetime().optional(),
  cancelledAt: z.string().datetime().optional(),
  attempts: z.array(DeliveryAttemptSchema).max(10),
  proofOfDelivery: ProofOfDeliverySchema.optional(),
  notes: z.string().max(1000).optional(),
});

export const DeliveryPublicSchema = DeliverySchema.pick({
  id: true,
  shipmentId: true,
  status: true,
  type: true,
  deliveredAt: true,
}).extend({
  attempts: z.number().int().nonnegative(),
});

export const DeliveryScheduleInputSchema = z
  .object({
    shipmentId: UuidSchema,
    driverId: UuidSchema,
    vehicleId: UuidSchema.optional(),
    scheduledAt: z.string().datetime(),
    routeId: UuidSchema.optional(),
  })
  .strict();

export type DeliverySchemaType = z.infer<typeof DeliverySchema>;
export type DeliveryPublicSchemaType = z.infer<typeof DeliveryPublicSchema>;
export type DeliveryScheduleInputSchemaType = z.infer<typeof DeliveryScheduleInputSchema>;
