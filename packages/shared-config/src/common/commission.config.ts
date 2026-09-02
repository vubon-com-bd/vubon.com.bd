/**
 * Commission Configuration
 * কমিশন কনফিগারেশন
 */
export interface CommissionConfig {
  enabled: boolean;
  type: 'percentage' | 'fixed' | 'tiered';
  defaultRate: number;
  tiers: {
    min: number;
    max: number | null;
    rate: number;
  }[];
  categoryBased: Record<string, number>;
  vendorBased: Record<string, number>;
  minimumAmount: number;
  maximumAmount: number;
  calculation: {
    onProduct: boolean;
    onShipping: boolean;
    onTax: boolean;
  };
  payout: {
    schedule: 'daily' | 'weekly' | 'monthly' | 'custom';
    dayOfMonth: number;
    minPayout: number;
    maxPayout: number;
  };
}

export const createCommissionConfig = (): CommissionConfig => ({
  enabled: true,
  type: 'percentage',
  defaultRate: 10,
  tiers: [
    { min: 0, max: 100000, rate: 10 },
    { min: 100000, max: 500000, rate: 8 },
    { min: 500000, max: null, rate: 5 },
  ],
  categoryBased: {
    electronics: 8,
    fashion: 12,
    food: 5,
    books: 3,
  },
  vendorBased: {},
  minimumAmount: 0,
  maximumAmount: 1000000,
  calculation: {
    onProduct: true,
    onShipping: false,
    onTax: false,
  },
  payout: {
    schedule: 'monthly',
    dayOfMonth: 1,
    minPayout: 1000,
    maxPayout: 1000000,
  },
});
