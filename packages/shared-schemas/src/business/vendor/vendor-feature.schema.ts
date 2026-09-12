import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_FEATURE } from '@vubon/shared-constants/src/business/vendor/vendor-feature.constants';

const vendorFeatureTypeKeys = Object.keys(VENDOR_FEATURE.TYPES) as [string, ...string[]];
const vendorFeatureStatusKeys = Object.keys(VENDOR_FEATURE.FEATURE_STATUS) as [string, ...string[]];

export const VendorFeatureSchema = BaseSchema.extend({
  featureId: z.string().uuid(),
  type: z.enum(vendorFeatureTypeKeys),
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  status: z.enum(vendorFeatureStatusKeys),
  dependencies: z.array(z.string()),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
