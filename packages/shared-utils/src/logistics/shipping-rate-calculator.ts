export interface ShippingMethodData {
  cost: number;
  isExpress: boolean;
  isPriority: boolean;
  isEconomy: boolean;
}

export const calculateShippingRate = (
  weight: number,
  distance: number,
  method: ShippingMethodData
): number => {
  const baseRate = method.cost || 0;
  const perKgRate = 10;
  const perKmRate = 2;
  return baseRate + weight * perKgRate + distance * perKmRate;
};

export const getShippingMethodCost = (method: ShippingMethodData): number => {
  const baseCost = method.cost || 0;
  if (method.isExpress) return baseCost * 1.5;
  if (method.isPriority) return baseCost * 2;
  if (method.isEconomy) return baseCost * 0.7;
  return baseCost;
};
