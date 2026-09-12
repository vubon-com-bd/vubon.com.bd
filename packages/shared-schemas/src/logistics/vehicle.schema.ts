import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { VEHICLE } from '@vubon/shared-constants/src/logistics/vehicle.constants';

const vehicleStatusKeys = Object.keys(VEHICLE.STATUS) as [string, ...string[]];
const vehicleTypeKeys = Object.keys(VEHICLE.TYPES) as [string, ...string[]];
const fuelTypeKeys = Object.keys(VEHICLE.FUEL_TYPES) as [string, ...string[]];

export const VehicleSchema = BaseSchema.extend({
  vehicleId: z.string().uuid(),
  registrationNumber: z.string().min(1).max(50),
  status: z.enum(vehicleStatusKeys),
  type: z.enum(vehicleTypeKeys),
  brand: z.string().min(1).max(50),
  model: z.string().min(1).max(50),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  color: z.string(),
  capacity: z.number().positive(),
  weightLimit: z.number().positive(),
  dimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  fuelType: z.enum(fuelTypeKeys),
  fuelEfficiency: z.number().positive(),
  insuranceExpiry: z.date(),
  registrationExpiry: z.date(),
  licensePlate: z.string().min(1).max(20),
  isActive: z.boolean().default(true),
  isAvailable: z.boolean().default(true),
  isOnRoute: z.boolean().default(false),
  lastMaintenanceDate: z.date().optional(),
  nextMaintenanceDate: z.date().optional(),
  metadata: z.object({
    gpsTrackerId: z.string().optional(),
    simCardNumber: z.string().optional(),
    colorHex: z.string(),
    photoUrl: z.string().url().optional(),
    documents: z.array(z.string()),
  }),
});
