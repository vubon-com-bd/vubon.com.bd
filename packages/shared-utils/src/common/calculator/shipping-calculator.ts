/**
 * Shipping Calculator — uses SHIPPING_RATES constants.
 */
import { SHIPPING_RATES } from '@vubon/shared-constants/src/common/shipping-rates.constants';

export const calculateShippingCost = (weight: number, distance: number): number => {
  if (!Number.isFinite(weight) || weight < 0) throw new Error('Weight must be non-negative');
  if (!Number.isFinite(distance) || distance < 0) throw new Error('Distance must be non-negative');
  const { BASE, PER_KG, PER_KM } = SHIPPING_RATES;
  return BASE + weight * PER_KG + distance * PER_KM;
};

export const calculateFreeShipping = (
  totalAmount: number,
  threshold: number = SHIPPING_RATES.FREE_THRESHOLD
): boolean => totalAmount >= threshold;
