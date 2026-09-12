/**
 * Commission Calculator — uses COMMISSION constants.
 */
import { COMMISSION } from '@vubon/shared-constants/src/common/commission.constants';

export const calculateCommission = (amount: number, commissionRate: number): number => {
  if (!Number.isFinite(amount) || amount < 0) throw new Error('Amount must be non-negative');
  if (commissionRate < 0 || commissionRate > 100)
    throw new Error('Commission rate must be between 0 and 100');
  return (amount * commissionRate) / 100;
};

export const calculateNetAmount = (amount: number, commissionRate: number): number =>
  amount - calculateCommission(amount, commissionRate);

/**
 * Gets tiered commission rate by transaction amount.
 */
export const getTieredRate = (amount: number): number => {
  const tiers = [
    COMMISSION.TIER.LEVEL_5,
    COMMISSION.TIER.LEVEL_4,
    COMMISSION.TIER.LEVEL_3,
    COMMISSION.TIER.LEVEL_2,
    COMMISSION.TIER.LEVEL_1,
  ];
  for (const tier of tiers) {
    if (amount >= tier.threshold) return tier.rate;
  }
  return COMMISSION.DEFAULT.RATE;
};
