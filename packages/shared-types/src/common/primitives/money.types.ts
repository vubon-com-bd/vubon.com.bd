/**
 * Branded Money Types
 * @module shared-types/common/primitives
 *
 * ⚠️ Note: Tax branded amount → TaxAmount, কারণ business/tax-এ Tax entity আছে।
 */

import type { Branded } from '../utils/branded.types';

export type Money = Branded<number, 'Money'>;
export type Price = Branded<number, 'Price'>;
export type Amount = Branded<number, 'Amount'>;
export type Discount = Branded<number, 'Discount'>;
export type DiscountAmount = Branded<number, 'DiscountAmount'>;
export type TaxAmount = Branded<number, 'TaxAmount'>;
export type Commission = Branded<number, 'Commission'>;
export type CommissionAmount = Branded<number, 'CommissionAmount'>;
export type Subtotal = Branded<number, 'Subtotal'>;
export type Total = Branded<number, 'Total'>;

export const toMoney = (value: number): Money => value as Money;
export const toPrice = (value: number): Price => value as Price;
export const toAmount = (value: number): Amount => value as Amount;
export const toDiscountAmount = (value: number): DiscountAmount => value as DiscountAmount;
export const toTaxAmount = (value: number): TaxAmount => value as TaxAmount;
