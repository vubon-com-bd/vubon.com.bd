export interface ShippingData {
  cost: { amount: number };
  freeShippingThreshold?: { amount: number };
}

export interface CartShippingData {
  grandTotal?: { amount: number };
}

export const isFreeShippingEligibleByTotal = (total: number, threshold: number): boolean => {
  return threshold > 0 && total >= threshold;
};

export const calculateCartShipping = (cart: CartShippingData, shipping: ShippingData): number => {
  const total = cart.grandTotal?.amount || 0;
  const isFree = isFreeShippingEligibleByTotal(total, shipping.freeShippingThreshold?.amount || 0);
  return isFree ? 0 : shipping.cost.amount;
};

export const isFreeShippingEligible = (cart: CartShippingData, threshold: number): boolean => {
  const total = cart.grandTotal?.amount || 0;
  return isFreeShippingEligibleByTotal(total, threshold);
};
