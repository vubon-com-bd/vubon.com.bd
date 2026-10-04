/**
 * Calculate VAT (Bangladesh default 15%)
 * @module shared-utils/calculator/commerce
 */
import { calculateTax } from './calculate-tax.js';

export function calculateVat(amount: number, ratePercent = 15): number {
  return calculateTax({ amount, ratePercent }).taxAmount;
}
