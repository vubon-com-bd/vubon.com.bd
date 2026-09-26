/**
 * Money Schema
 * @module shared-schemas/common/primitives
 */

import { z } from 'zod';

export const MoneySchema = z
  .number()
  .min(0, 'Amount cannot be negative')
  .max(1000000000, 'Amount is too large')
  .multipleOf(0.01, 'Amount must have at most 2 decimal places');

export const PositiveMoneySchema = z
  .number()
  .positive('Amount must be positive')
  .max(1000000000, 'Amount is too large')
  .multipleOf(0.01, 'Amount must have at most 2 decimal places');

export const PriceSchema = PositiveMoneySchema;
export const DiscountSchema = MoneySchema;
export const TaxAmountSchema = MoneySchema;

export type MoneySchemaType = z.infer<typeof MoneySchema>;
export type PriceSchemaType = z.infer<typeof PriceSchema>;
