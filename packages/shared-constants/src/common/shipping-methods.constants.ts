/**
 * Shipping Methods Constants
 * @module shared-constants/common/shipping-methods.constants
 */

export const SHIPPING_METHODS = {
  // Standard shipping
  STANDARD: 'standard',
  EXPRESS: 'express',
  NEXT_DAY: 'next_day',
  SAME_DAY: 'same_day',
  OVERNIGHT: 'overnight',

  // Courier services (Bangladesh)
  SA_PARIBAHAN: 'sa_paribahan',
  SUNDARBAN: 'sundarban',
  E_COURIER: 'e_courier',
  REDX: 'redx',
  PATHWAY: 'pathway',
  PAPERFLY: 'paperfly',
  STEADFAST: 'steadfast',

  // International
  DHL: 'dhl',
  FEDEX: 'fedex',
  UPS: 'ups',
  ARAMEX: 'aramex',

  // Other
  PICKUP: 'pickup',
  DIGITAL: 'digital',
  FREIGHT: 'freight',
  BULK: 'bulk',
} as const;

export type ShippingMethod = (typeof SHIPPING_METHODS)[keyof typeof SHIPPING_METHODS];

export const SHIPPING_METHOD_INFO: Record<
  ShippingMethod,
  {
    label: string;
    description: string;
    estimated_days: [number, number];
    tracking_available: boolean;
    insurance_available: boolean;
    international: boolean;
    requires_phone: boolean;
    requires_address: boolean;
  }
> = {
  [SHIPPING_METHODS.STANDARD]: {
    label: 'Standard Shipping',
    description: 'Standard delivery within 3-5 business days',
    estimated_days: [3, 5],
    tracking_available: true,
    insurance_available: false,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.EXPRESS]: {
    label: 'Express Shipping',
    description: 'Express delivery within 1-2 business days',
    estimated_days: [1, 2],
    tracking_available: true,
    insurance_available: true,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.NEXT_DAY]: {
    label: 'Next Day Delivery',
    description: 'Next business day delivery',
    estimated_days: [1, 1],
    tracking_available: true,
    insurance_available: true,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.SAME_DAY]: {
    label: 'Same Day Delivery',
    description: 'Same day delivery (within city limits)',
    estimated_days: [0, 1],
    tracking_available: true,
    insurance_available: true,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.OVERNIGHT]: {
    label: 'Overnight Shipping',
    description: 'Overnight delivery for urgent shipments',
    estimated_days: [1, 1],
    tracking_available: true,
    insurance_available: true,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.SA_PARIBAHAN]: {
    label: 'SA Paribahan',
    description: 'Leading courier service in Bangladesh',
    estimated_days: [2, 4],
    tracking_available: true,
    insurance_available: true,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.SUNDARBAN]: {
    label: 'Sundarban Courier',
    description: 'Trusted courier service in Bangladesh',
    estimated_days: [2, 4],
    tracking_available: true,
    insurance_available: true,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.E_COURIER]: {
    label: 'E-Courier',
    description: 'Fast and reliable courier in Bangladesh',
    estimated_days: [2, 3],
    tracking_available: true,
    insurance_available: true,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.REDX]: {
    label: 'RedX',
    description: 'On-demand delivery service in Bangladesh',
    estimated_days: [1, 2],
    tracking_available: true,
    insurance_available: true,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.PATHWAY]: {
    label: 'Pathway',
    description: 'Affordable courier service in Bangladesh',
    estimated_days: [2, 3],
    tracking_available: true,
    insurance_available: false,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.PAPERFLY]: {
    label: 'Paperfly',
    description: 'Smart logistics in Bangladesh',
    estimated_days: [2, 3],
    tracking_available: true,
    insurance_available: true,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.STEADFAST]: {
    label: 'Steadfast',
    description: 'Reliable courier service in Bangladesh',
    estimated_days: [2, 4],
    tracking_available: true,
    insurance_available: true,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.DHL]: {
    label: 'DHL',
    description: 'International express shipping',
    estimated_days: [3, 7],
    tracking_available: true,
    insurance_available: true,
    international: true,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.FEDEX]: {
    label: 'FedEx',
    description: 'International courier service',
    estimated_days: [3, 7],
    tracking_available: true,
    insurance_available: true,
    international: true,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.UPS]: {
    label: 'UPS',
    description: 'International shipping services',
    estimated_days: [3, 7],
    tracking_available: true,
    insurance_available: true,
    international: true,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.ARAMEX]: {
    label: 'Aramex',
    description: 'International courier and logistics',
    estimated_days: [4, 8],
    tracking_available: true,
    insurance_available: true,
    international: true,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.PICKUP]: {
    label: 'Store Pickup',
    description: 'Pick up from store location',
    estimated_days: [0, 0],
    tracking_available: false,
    insurance_available: false,
    international: false,
    requires_phone: false,
    requires_address: false,
  },
  [SHIPPING_METHODS.DIGITAL]: {
    label: 'Digital Delivery',
    description: 'Digital product delivery (email/link)',
    estimated_days: [0, 0],
    tracking_available: false,
    insurance_available: false,
    international: false,
    requires_phone: false,
    requires_address: false,
  },
  [SHIPPING_METHODS.FREIGHT]: {
    label: 'Freight Shipping',
    description: 'Freight and bulk shipping',
    estimated_days: [5, 14],
    tracking_available: true,
    insurance_available: true,
    international: true,
    requires_phone: true,
    requires_address: true,
  },
  [SHIPPING_METHODS.BULK]: {
    label: 'Bulk Shipping',
    description: 'Bulk order shipping',
    estimated_days: [3, 7],
    tracking_available: true,
    insurance_available: true,
    international: false,
    requires_phone: true,
    requires_address: true,
  },
};

export const BD_COURIER_SERVICES = [
  SHIPPING_METHODS.SA_PARIBAHAN,
  SHIPPING_METHODS.SUNDARBAN,
  SHIPPING_METHODS.E_COURIER,
  SHIPPING_METHODS.REDX,
  SHIPPING_METHODS.PATHWAY,
  SHIPPING_METHODS.PAPERFLY,
  SHIPPING_METHODS.STEADFAST,
] as const;

export const INTERNATIONAL_SHIPPING = [
  SHIPPING_METHODS.DHL,
  SHIPPING_METHODS.FEDEX,
  SHIPPING_METHODS.UPS,
  SHIPPING_METHODS.ARAMEX,
] as const;

export const EXPRESS_SHIPPING = [
  SHIPPING_METHODS.EXPRESS,
  SHIPPING_METHODS.NEXT_DAY,
  SHIPPING_METHODS.SAME_DAY,
  SHIPPING_METHODS.OVERNIGHT,
] as const;
