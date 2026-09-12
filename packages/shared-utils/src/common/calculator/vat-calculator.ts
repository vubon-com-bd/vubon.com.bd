/**
 * VAT Calculator — uses TAX.BD.VAT_STANDARD.
 */
import { TAX } from '@vubon/shared-constants/src/common/tax.constants';

export const calculateVAT = (amount: number, vatRate: number = TAX.BD.VAT_STANDARD): number => {
  if (!Number.isFinite(amount) || amount < 0) throw new Error('Amount must be non-negative');
  if (vatRate < 0 || vatRate > 100) throw new Error('VAT rate must be between 0 and 100');
  return (amount * vatRate) / 100;
};

export const calculateTotalWithVAT = (
  amount: number,
  vatRate: number = TAX.BD.VAT_STANDARD
): number => amount + calculateVAT(amount, vatRate);

/**
 * Extracts VAT from a VAT-inclusive amount.
 */
export const extractVAT = (grossAmount: number, vatRate: number = TAX.BD.VAT_STANDARD): number => {
  if (vatRate <= 0) return 0;
  return grossAmount - grossAmount / (1 + vatRate / 100);
};
