import { z } from 'zod';
import { VENDOR_TYPE } from '@vubon/shared-constants/src/business/vendor/vendor-type.constants';

const vendorTypeKeys = Object.keys(VENDOR_TYPE) as [string, ...string[]];

export const VendorTypeSchema = z.object({
  type: z.enum(vendorTypeKeys),
  category: z.literal('vendor'),
  isIndividual: z.boolean().default(false),
  isBusiness: z.boolean().default(false),
  isEnterprise: z.boolean().default(false),
  isPartnership: z.boolean().default(false),
  isCorporation: z.boolean().default(false),
});

export const VendorTypeEnumSchema = z.enum(vendorTypeKeys);
