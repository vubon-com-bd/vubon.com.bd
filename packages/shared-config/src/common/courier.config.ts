import { SHIPPING_METHODS } from '@vubon/shared-constants/src/common/shipping-methods.constants';

export const courierConfig = {
  defaultCourier: SHIPPING_METHODS.SA_PARIBAHAN,
  trackingUrl: '',
  maxWeight: 100,
  maxDimensions: { length: 150, width: 150, height: 150 },
  supportedZones: ['dhaka', 'chittagong', 'khulna', 'rajshahi', 'sylhet', 'barisal', 'rangpur'],
} as const;
