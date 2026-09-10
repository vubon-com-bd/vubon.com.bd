import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { VENDOR_RETURN_POLICY } from '@vubon/shared-constants/src/business/vendor/vendor-return-policy.constants';

const vendorReturnPolicyTypeKeys = Object.keys(VENDOR_RETURN_POLICY.TYPES) as [string, ...string[]];
const vendorReturnPolicyShippingCostKeys = Object.keys(
  VENDOR_RETURN_POLICY.RETURN_SHIPPING_COST
) as [string, ...string[]];

export const VendorReturnPolicySchema = BaseSchema.extend({
  policyId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorReturnPolicyTypeKeys),
  windowDays: z.number().int().min(0),
  conditions: z.array(z.string()),
  restockingFee: z.number().min(0).max(100),
  shippingCost: z.enum(vendorReturnPolicyShippingCostKeys),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
