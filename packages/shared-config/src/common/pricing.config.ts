/**
 * Pricing Configuration
 * প্রাইসিং কনফিগারেশন
 */
export interface PricingConfig {
  currency: string;
  rounding: {
    enabled: boolean;
    precision: number;
    method: 'round' | 'ceil' | 'floor';
  };
  discount: {
    maxPercentage: number;
    minAmount: number;
    stackable: boolean;
    priority: ('auto' | 'coupon' | 'bulk' | 'seasonal')[];
  };
  tax: {
    included: boolean;
    rate: number;
    countryRates: Record<string, number>;
  };
  markup: {
    defaultPercentage: number;
    categoryBased: Record<string, number>;
  };
}

export const createPricingConfig = (): PricingConfig => ({
  currency: 'BDT',
  rounding: {
    enabled: true,
    precision: 2,
    method: 'round',
  },
  discount: {
    maxPercentage: 50,
    minAmount: 10,
    stackable: false,
    priority: ['auto', 'coupon', 'bulk', 'seasonal'],
  },
  tax: {
    included: false,
    rate: 15,
    countryRates: {
      BD: 15,
      IN: 18,
      US: 0,
      UK: 20,
      AE: 5,
    },
  },
  markup: {
    defaultPercentage: 30,
    categoryBased: {
      electronics: 25,
      fashion: 50,
      food: 20,
      books: 15,
    },
  },
});
