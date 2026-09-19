/**
 * Driver Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/driver.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';
import { EmailSchema } from '../common/primitives/email.schema';
import { DRIVER_STATUS, DRIVER_TYPE, DRIVER_LICENSE_TYPE } from '@vubon/shared-constants/logistics';

export const DriverStatusSchema = z.enum(Object.values(DRIVER_STATUS) as [string, ...string[]]);

export const DriverTypeSchema = z.enum(Object.values(DRIVER_TYPE) as [string, ...string[]]);

export const DriverLicenseTypeSchema = z.enum(
  Object.values(DRIVER_LICENSE_TYPE) as [string, ...string[]]
);

export const DriverSchema = BaseEntitySchema.extend({
  userId: UuidSchema.optional(),
  name: z.string().min(1).max(150),
  phone: PhoneSchema,
  email: EmailSchema.optional(),
  status: DriverStatusSchema,
  type: DriverTypeSchema,
  licenseNumber: z.string().min(1).max(50),
  licenseType: DriverLicenseTypeSchema,
  licenseExpiresAt: z.string().datetime(),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  address: z.string().max(500).optional(),
  vehicleId: UuidSchema.optional(),
  warehouseId: UuidSchema.optional(),
  rating: z.number().min(0).max(5).optional(),
  totalDeliveries: z.number().int().nonnegative(),
  totalDistanceKm: z.number().nonnegative().optional(),
  cashLimit: z.number().nonnegative().optional(),
  cashInHand: z.number().nonnegative().optional(),
  isAvailable: z.boolean(),
  lastActiveAt: z.string().datetime().optional(),
});

export const DriverPublicSchema = DriverSchema.pick({
  id: true,
  name: true,
  status: true,
  type: true,
  rating: true,
  totalDeliveries: true,
  isAvailable: true,
});

export type DriverStatusSchemaType = z.infer<typeof DriverStatusSchema>;
export type DriverTypeSchemaType = z.infer<typeof DriverTypeSchema>;
export type DriverSchemaType = z.infer<typeof DriverSchema>;
export type DriverPublicSchemaType = z.infer<typeof DriverPublicSchema>;
