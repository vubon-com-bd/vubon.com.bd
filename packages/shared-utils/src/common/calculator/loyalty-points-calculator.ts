/**
 * Loyalty Points Calculator — uses LOYALTY_RULES constants.
 */
import { LOYALTY_RULES } from '@vubon/shared-constants/src/common/loyalty-rules.constants';

export const calculateLoyaltyPoints = (
  amount: number,
  multiplier: number = LOYALTY_RULES.DEFAULT_MULTIPLIER
): number => {
  if (!Number.isFinite(amount) || amount < 0) throw new Error('Amount must be non-negative');
  if (multiplier < 0) throw new Error('Multiplier must be non-negative');
  return Math.floor(amount * multiplier);
};

export const calculatePointsValue = (
  points: number,
  rate: number = LOYALTY_RULES.POINT_VALUE
): number => {
  if (!Number.isFinite(points) || points < 0) throw new Error('Points must be non-negative');
  return points * rate;
};
