import { z } from 'zod';
import { BaseSchema } from '../common/base.schema';
import { MoneySchema } from '../common/money.schema';
import { COURIER } from '@vubon/shared-constants/src/logistics/courier.constants';

const courierStatusKeys = Object.keys(COURIER.STATUS) as [string, ...string[]];
const courierTypeKeys = Object.keys(COURIER.TYPES) as [string, ...string[]];
const courierServiceTypeKeys = Object.keys(COURIER.SERVICE_TYPES) as [string, ...string[]];

export const CourierSchema = BaseSchema.extend({
  courierId: z.string().uuid(),
  name: z.string().min(1).max(100),
  code: z.string().min(1).max(50),
  status: z.enum(courierStatusKeys),
  type: z.enum(courierTypeKeys),
  serviceType: z.enum(courierServiceTypeKeys),
  phone: z.string(),
  email: z.string().email(),
  address: z.string(),
  website: z.string().url().optional(),
  logo: z.string().url().optional(),
  trackingUrl: z.string().url(),
  apiKey: z.string().optional(),
  apiSecret: z.string().optional(),
  maxWeight: z.number().positive(),
  maxDimensions: z.object({
    length: z.number().positive(),
    width: z.number().positive(),
    height: z.number().positive(),
  }),
  supportedZones: z.array(z.string()),
  rates: z.array(
    z.object({
      zone: z.string(),
      baseRate: MoneySchema,
      perKgRate: MoneySchema,
      perItemRate: MoneySchema,
      fuelSurcharge: z.number().min(0),
    })
  ),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
