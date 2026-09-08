export const calculateShippingCost = (weight: number, distance: number): number => {
  const baseRate = 50;
  const perKgRate = 10;
  const perKmRate = 2;
  return baseRate + weight * perKgRate + distance * perKmRate;
};

export const calculateFreeShipping = (totalAmount: number, threshold: number): boolean => {
  return totalAmount >= threshold;
};
