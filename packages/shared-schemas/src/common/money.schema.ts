import { z } from 'zod';
import { CURRENCY } from '@vubon/shared-constants/src/common/currency.constants';

/**
 * Currency codes — key and value are the same ('BDT', 'USD', ...).
 * Using Object.values for consistency with other schemas.
 */
const currencyValues = Object.values(CURRENCY).map((c) => c.code) as [string, ...string[]];

export const MoneySchema = z.object({
  amount: z.number().min(0, 'Amount must be positive').max(999999999.99, 'Amount is too large'),
  currency: z.enum(currencyValues),
});

export const MoneyAmountSchema = z.number().min(0).max(999999999.99);
