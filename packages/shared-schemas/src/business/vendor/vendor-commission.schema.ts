import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { VENDOR_COMMISSION } from '@vubon/shared-constants/src/business/vendor/vendor-commission.constants';

const vendorCommissionTypeKeys = Object.keys(VENDOR_COMMISSION.TYPES) as [string, ...string[]];

export const VendorCommissionSchema = BaseSchema.extend({
  commissionId: z.string().uuid(),
  vendorId: z.string().uuid(),
  type: z.enum(vendorCommissionTypeKeys),
  rate: z.number().min(0).max(100),
  fixedAmount: MoneySchema.optional(),
  minAmount: MoneySchema.optional(),
  maxAmount: MoneySchema.optional(),
  isActive: z.boolean().default(true),
  isDefault: z.boolean().default(false),
  metadata: z.record(z.unknown()).optional(),
});
