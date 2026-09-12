import { SHIPPING_RATES } from '@vubon/shared-constants/src/common/shipping-rates.constants';

export const shippingRateConfig = {
  baseRate: SHIPPING_RATES.BASE,
  perKgRate: SHIPPING_RATES.PER_KG,
  perKmRate: SHIPPING_RATES.PER_KM,
  fuelSurcharge: 0.1,
  zones: {
    dhaka: { rate: 50, freeThreshold: 500 },
    chittagong: { rate: 100, freeThreshold: 1000 },
    other: { rate: 150, freeThreshold: 1500 },
  },
} as const;
