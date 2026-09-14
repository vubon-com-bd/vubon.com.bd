/**
 * Vehicle Schema
 * @module shared-schemas/logistics
 *
 * Values আসে shared-constants/logistics/vehicle.constants থেকে।
 */

import { z } from 'zod';
import { BaseEntitySchema } from '../common/base/base-entity.schema';
import { UuidSchema } from '../common/primitives/uuid.schema';
import { VEHICLE_STATUS, VEHICLE_TYPE, VEHICLE_FUEL_TYPE } from '@vubon/shared-constants/logistics';

export const VehicleStatusSchema = z.enum(Object.values(VEHICLE_STATUS) as [string, ...string[]]);

export const VehicleTypeSchema = z.enum(Object.values(VEHICLE_TYPE) as [string, ...string[]]);

export const VehicleFuelTypeSchema = z.enum(
  Object.values(VEHICLE_FUEL_TYPE) as [string, ...string[]]
);

export const VehicleSchema = BaseEntitySchema.extend({
  registrationNumber: z.string().min(1).max(30),
  type: VehicleTypeSchema,
  status: VehicleStatusSchema,
  fuelType: VehicleFuelTypeSchema,
  make: z.string().min(1).max(50),
  model: z.string().min(1).max(50),
  year: z.number().int().min(1900).max(2100),
  color: z.string().max(30).optional(),
  maxWeightKg: z.number().positive(),
  maxVolumeM3: z.number().positive().optional(),
  capacity: z.number().int().positive().optional(),
  mileageKm: z.number().nonnegative().optional(),
  lastServiceAt: z.string().datetime().optional(),
  nextServiceAt: z.string().datetime().optional(),
  insuranceExpiresAt: z.string().datetime().optional(),
  registrationExpiresAt: z.string().datetime().optional(),
  assignedDriverId: UuidSchema.optional(),
  isActive: z.boolean(),
});

export const VehiclePublicSchema = VehicleSchema.pick({
  id: true,
  registrationNumber: true,
  type: true,
  status: true,
  make: true,
  model: true,
});

export type VehicleStatusSchemaType = z.infer<typeof VehicleStatusSchema>;
export type VehicleTypeSchemaType = z.infer<typeof VehicleTypeSchema>;
export type VehicleFuelTypeSchemaType = z.infer<typeof VehicleFuelTypeSchema>;
export type VehicleSchemaType = z.infer<typeof VehicleSchema>;
export type VehiclePublicSchemaType = z.infer<typeof VehiclePublicSchema>;
