import { z } from 'zod';
import { BaseSchema } from '../../common/base.schema';
import { MoneySchema } from '../../common/money.schema';
import { CART_TAX } from '@vubon/shared-constants/src/business/cart/cart-tax.constants';
import { CURRENCY } from '@vubon/shared-constants/src/common/currency.constants';

const taxTypeKeys = Object.keys(CART_TAX.TYPES) as [string, ...string[]];
const currencyKeys = Object.keys(CURRENCY) as [string, ...string[]];

export const TaxSchema = BaseSchema.extend({
  taxId: z.string().uuid(),
  cartId: z.string().uuid(),
  type: z.enum(taxTypeKeys),
  rate: z.number().min(0).max(100),
  amount: MoneySchema,
  currency: z.enum(currencyKeys),
  isInclusive: z.boolean().default(false),
  isActive: z.boolean().default(true),
  metadata: z.record(z.unknown()).optional(),
});
