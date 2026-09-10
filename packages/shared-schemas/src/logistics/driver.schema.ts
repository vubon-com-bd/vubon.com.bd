import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { UserSchema } from '../user/user.schema';
import { VehicleSchema } from './vehicle.schema';
import { DRIVER } from '@vubon/shared-constants/src/logistics/driver.constants';

const driverStatusKeys = Object.keys(DRIVER.STATUS) as [string, ...string[]];
const driverTypeKeys = Object.keys(DRIVER.TYPES) as [string, ...string[]];
const licenseTypeKeys = Object.keys(DRIVER.LICENSE_TYPES) as [string, ...string[]];

export const DriverSchema = BaseSchema.extend({
  driverId: z.string().uuid(),
  userId: z.string().uuid().optional(),
  user: UserSchema.optional(),
  status: z.enum(driverStatusKeys),
  type: z.enum(driverTypeKeys),
  licenseType: z.enum(licenseTypeKeys),
  licenseNumber: z.string().min(1).max(50),
  licenseExpiry: z.date(),
  name: z.string().min(1).max(100),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  vehicle: VehicleSchema,
  rating: z.number().min(0).max(5).default(0),
  totalDeliveries: z.number().int().min(0).default(0),
  successfulDeliveries: z.number().int().min(0).default(0),
  failedDeliveries: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isAvailable: z.boolean().default(true),
  isOnDuty: z.boolean().default(false),
  shiftStart: z.string(),
  shiftEnd: z.string(),
  breakStart: z.string(),
  breakEnd: z.string(),
  maxShiftHours: z.number().int().min(1),
  breakIntervalHours: z.number().int().min(1),
  maxDeliveriesPerShift: z.number().int().min(1),
  metadata: z.object({
    emergencyContactName: z.string(),
    emergencyContactPhone: z.string(),
    bloodGroup: z.string(),
    allergies: z.array(z.string()),
    medicalConditions: z.array(z.string()),
    documents: z.array(z.string()),
  }),
});
