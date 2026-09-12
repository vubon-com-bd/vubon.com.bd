/**
 * Tax Calculator — uses TAX constants.
 * Note: VAT functions live in vat-calculator.ts (no duplication).
 */
import { TAX } from '@vubon/shared-constants/src/common/tax.constants';

export const calculateTax = (amount: number, taxRate: number): number => {
  if (!Number.isFinite(amount) || amount < 0) throw new Error('Amount must be non-negative');
  if (taxRate < 0 || taxRate > 100) throw new Error('Tax rate must be between 0 and 100');
  return (amount * taxRate) / 100;
};

export const calculateTotalWithTax = (amount: number, taxRate: number): number =>
  amount + calculateTax(amount, taxRate);

export const getStandardTaxRate = (): number => TAX.BD.VAT_STANDARD;
