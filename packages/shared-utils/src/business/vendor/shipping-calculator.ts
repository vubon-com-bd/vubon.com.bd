export interface VendorShippingData {
  cost: { amount: number };
  freeShippingThreshold?: { amount: number };
}

export const calculateShippingCost = (weight: number, distance: number): number => {
  const baseRate = 50;
  const weightRate = weight * 10;
  const distanceRate = distance * 5;
  return baseRate + weightRate + distanceRate;
};

export const calculateVendorShippingCost = (weight: number, distance: number): number => {
  return calculateShippingCost(weight, distance);
};

export const isFreeShippingEligible = (shipping: VendorShippingData, amount: number): boolean => {
  const threshold = shipping.freeShippingThreshold?.amount;
  return threshold !== undefined && amount >= threshold;
};
