import { z } from 'zod';
import { CURRENCY } from '@vubon/shared-constants';

export const MoneySchema = z.object({
  amount: z.number().min(0, 'Amount must be positive').max(999999999.99, 'Amount is too large'),
  currency: z.enum(Object.keys(CURRENCY) as [string, ...string[]]),
});

export const MoneyAmountSchema = z.number().min(0).max(999999999.99);
