/**
 * Shipping Rate Configuration
 * শিপিং রেট কনফিগারেশন
 */
export interface ShippingRateConfig {
  enabled: boolean;
  zones: {
    name: string;
    code: string;
    areas: string[];
    baseRate: number;
    perKgRate: number;
  }[];
  weightBreaks: {
    min: number;
    max: number | null;
    rate: number;
  }[];
  dimensions: {
    enabled: boolean;
    maxLength: number;
    maxWidth: number;
    maxHeight: number;
    volumetricFactor: number;
  };
  freeShipping: {
    enabled: boolean;
    minOrderAmount: number;
    applicableZones: string[];
  };
  seasonal: {
    enabled: boolean;
    rates: {
      season: string;
      multiplier: number;
      startDate: string;
      endDate: string;
    }[];
  };
}

export const createShippingRateConfig = (): ShippingRateConfig => ({
  enabled: true,
  zones: [
    { name: 'Dhaka City', code: 'DHA', areas: ['dhaka'], baseRate: 60, perKgRate: 20 },
    { name: 'Chittagong City', code: 'CTG', areas: ['chittagong'], baseRate: 80, perKgRate: 25 },
    { name: 'Outside Dhaka', code: 'ODH', areas: ['all'], baseRate: 100, perKgRate: 30 },
  ],
  weightBreaks: [
    { min: 0, max: 1, rate: 50 },
    { min: 1, max: 5, rate: 80 },
    { min: 5, max: 10, rate: 120 },
    { min: 10, max: null, rate: 150 },
  ],
  dimensions: {
    enabled: true,
    maxLength: 100,
    maxWidth: 100,
    maxHeight: 100,
    volumetricFactor: 5000,
  },
  freeShipping: {
    enabled: true,
    minOrderAmount: 500,
    applicableZones: ['DHA', 'CTG'],
  },
  seasonal: {
    enabled: true,
    rates: [
      { season: 'summer', multiplier: 1.2, startDate: '2024-04-01', endDate: '2024-06-30' },
      { season: 'winter', multiplier: 1.1, startDate: '2024-12-01', endDate: '2025-02-28' },
    ],
  },
});
