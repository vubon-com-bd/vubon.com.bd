import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { AddressSchema } from '../common/address.schema';
import { VendorSchema } from '../business/vendor/vendor.schema';
import { WAREHOUSE } from '@vubon/shared-constants/src/logistics/warehouse.constants';
import { InventoryLocationSchema } from './inventory-location.schema';

const warehouseStatusKeys = Object.keys(WAREHOUSE.STATUS) as [string, ...string[]];
const warehouseTypeKeys = Object.keys(WAREHOUSE.TYPES) as [string, ...string[]];

export const WarehouseSchema = BaseSchema.extend({
  warehouseId: z.string().uuid(),
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(50),
  status: z.enum(warehouseStatusKeys),
  type: z.enum(warehouseTypeKeys),
  address: AddressSchema,
  vendorId: z.string().uuid().optional(),
  vendor: VendorSchema.optional(),
  capacity: z.number().min(0),
  usedCapacity: z.number().min(0).default(0),
  availableCapacity: z.number().min(0).default(0),
  locations: z.array(InventoryLocationSchema),
  locationCount: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  managerName: z.string(),
  managerPhone: z.string(),
  managerEmail: z.string().email(),
  operatingHours: z.object({
    monday: z.string(),
    tuesday: z.string(),
    wednesday: z.string(),
    thursday: z.string(),
    friday: z.string(),
    saturday: z.string(),
    sunday: z.string(),
  }),
  metadata: z.object({
    capacityUnit: z.string(),
    temperatureControlled: z.boolean().default(false),
    minTemperature: z.number().optional(),
    maxTemperature: z.number().optional(),
    hasLoadingDock: z.boolean().default(false),
    hasForklift: z.boolean().default(false),
    hasPalletRacks: z.boolean().default(false),
    securityLevel: z.string(),
  }),
});
