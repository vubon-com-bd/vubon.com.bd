/**
 * Warehouse Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/warehouse.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { EmailSchema } from '../common/primitives/email.schema';
import { PhoneSchema } from '../common/primitives/phone.schema';
import { AddressSchema } from '../common/geo/address.schema';
import {
  WAREHOUSE_STATUS,
  WAREHOUSE_TYPE,
  WAREHOUSE_ZONE,
} from '@vubon/shared-constants/logistics';

export const WarehouseStatusSchema = z.enum(
  Object.values(WAREHOUSE_STATUS) as [string, ...string[]]
);

export const WarehouseTypeSchema = z.enum(Object.values(WAREHOUSE_TYPE) as [string, ...string[]]);

export const WarehouseZoneSchema = z.enum(Object.values(WAREHOUSE_ZONE) as [string, ...string[]]);

export const WarehouseSchema = BaseEntitySchema.extend({
  name: z.string().min(1).max(150),
  code: z.string().min(1).max(50),
  type: WarehouseTypeSchema,
  status: WarehouseStatusSchema,
  address: AddressSchema,
  contactName: z.string().max(150).optional(),
  contactPhone: PhoneSchema.optional(),
  contactEmail: EmailSchema.optional(),
  managerId: UuidSchema.optional(),
  capacityM3: z.number().positive().optional(),
  capacityKg: z.number().positive().optional(),
  usedCapacityM3: z.number().nonnegative().optional(),
  usedCapacityKg: z.number().nonnegative().optional(),
  maxSkus: z.number().int().positive().optional(),
  zone: WarehouseZoneSchema,
  operatingHoursStart: z.number().int().min(0).max(23).optional(),
  operatingHoursEnd: z.number().int().min(0).max(23).optional(),
  timezone: z.string().min(1).max(64),
  isDefault: z.boolean(),
});

export const WarehousePublicSchema = WarehouseSchema.pick({
  id: true,
  name: true,
  code: true,
  type: true,
  status: true,
  address: true,
});

export const WarehouseCapacitySchema = z.object({
  warehouseId: UuidSchema,
  capacityM3: z.number().nonnegative(),
  usedCapacityM3: z.number().nonnegative(),
  capacityKg: z.number().nonnegative(),
  usedCapacityKg: z.number().nonnegative(),
  utilizationPercent: z.number().min(0).max(100),
  isFull: z.boolean(),
});

export type WarehouseStatusSchemaType = z.infer<typeof WarehouseStatusSchema>;
export type WarehouseTypeSchemaType = z.infer<typeof WarehouseTypeSchema>;
export type WarehouseSchemaType = z.infer<typeof WarehouseSchema>;
export type WarehousePublicSchemaType = z.infer<typeof WarehousePublicSchema>;
export type WarehouseCapacitySchemaType = z.infer<typeof WarehouseCapacitySchema>;
