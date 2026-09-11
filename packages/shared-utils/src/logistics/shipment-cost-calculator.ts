export interface ShipmentCostData {
  shippingCost?: { amount: number };
  insuranceCost?: { amount: number };
  packaging?: { cost: number };
}

export const calculateShipmentShippingCost = (weight: number, distance: number): number => {
  const baseRate = 50;
  const weightRate = weight * 10;
  const distanceRate = distance * 5;
  return baseRate + weightRate + distanceRate;
};

export const calculateShipmentCost = (shipment: ShipmentCostData): number => {
  const baseCost = shipment.shippingCost?.amount || 0;
  const insuranceCost = shipment.insuranceCost?.amount || 0;
  const packagingCost = shipment.packaging?.cost || 0;
  return baseCost + insuranceCost + packagingCost;
};

export const calculateShippingCostByWeight = (weight: number, distance: number): number => {
  return calculateShipmentShippingCost(weight, distance);
};

export const calculateTotalShipmentCost = (shipments: ShipmentCostData[]): number => {
  return shipments.reduce((sum, s) => sum + calculateShipmentCost(s), 0);
};
