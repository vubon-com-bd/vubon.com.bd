import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_RATING } from '@vubon/shared-constants/src/business/vendor/vendor-rating.constants';

const vendorRatingTypeKeys = Object.keys(VENDOR_RATING.TYPES) as [string, ...string[]];

export const VendorRatingSchema = BaseSchema.extend({
  ratingId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorRatingTypeKeys),
  score: z.number().min(1).max(5),
  criteria: z.object({
    productQuality: z.number().min(1).max(5),
    shippingSpeed: z.number().min(1).max(5),
    customerService: z.number().min(1).max(5),
    valueForMoney: z.number().min(1).max(5),
    packaging: z.number().min(1).max(5),
    accuracy: z.number().min(1).max(5),
  }),
  count: z.number().int().min(0),
  average: z.number().min(1).max(5),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
