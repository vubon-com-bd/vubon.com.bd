export const shippingRateConfig = {
  baseRate: 50,
  perKgRate: 10,
  perKmRate: 2,
  fuelSurcharge: 0.1,
  zones: {
    dhaka: { rate: 50, freeThreshold: 500 },
    chittagong: { rate: 100, freeThreshold: 1000 },
    other: { rate: 150, freeThreshold: 1500 },
  },
};
