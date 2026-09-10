import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_BUSINESS } from '@vubon/shared-constants/src/business/vendor/vendor-business.constants';

const vendorBusinessTypeKeys = Object.keys(VENDOR_BUSINESS.TYPES) as [string, ...string[]];
const vendorBusinessSizeKeys = Object.keys(VENDOR_BUSINESS.BUSINESS_SIZE) as [string, ...string[]];

export const VendorBusinessSchema = BaseSchema.extend({
  businessId: z.string().uuid(),
  vendorId: z.string().uuid(),
  name: z.string().min(1).max(255),
  type: z.enum(vendorBusinessTypeKeys),
  registrationNumber: z.string().min(1).max(100),
  taxId: z.string().min(1).max(100),
  foundedYear: z.number().int().min(1900).max(new Date().getFullYear()),
  employeeCount: z.number().int().min(0),
  annualRevenue: z.number().min(0).optional(),
  businessSector: z.array(z.string()),
  businessSize: z.enum(vendorBusinessSizeKeys),
  isVerified: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
