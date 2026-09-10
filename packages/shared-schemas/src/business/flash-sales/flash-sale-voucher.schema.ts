import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { UserSchema } from '../../user/user.schema';
import { FLASH_SALE_VOUCHER } from '@vubon/shared-constants/src/business/flash-sales/flash-sale-voucher.constants';

const voucherStatusKeys = Object.keys(FLASH_SALE_VOUCHER.STATUS) as [string, ...string[]];
const voucherTypeKeys = Object.keys(FLASH_SALE_VOUCHER.TYPES) as [string, ...string[]];

export const FlashSaleVoucherSchema = BaseSchema.extend({
  voucherId: z.string().uuid(),
  flashSaleId: z.string().uuid(),
  userId: z.string().uuid(),
  user: UserSchema,
  code: z.string().min(3).max(50),
  status: z.enum(voucherStatusKeys),
  type: z.enum(voucherTypeKeys),
  value: z.number(),
  isUsed: z.boolean().default(false),
  usedAt: z.date().optional(),
  expiresAt: z.date(),
  metadata: z.record(z.unknown()).optional(),
});
