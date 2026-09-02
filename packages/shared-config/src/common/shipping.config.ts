/**
 * Shipping Configuration
 * শিপিং কনফিগারেশন
 */
export interface ShippingConfig {
  defaultCountry: string;
  defaultZone: string;
  rates: {
    domestic: Record<string, number>;
    international: Record<string, number>;
  };
  weight: {
    unit: 'kg' | 'g' | 'lb';
    maxWeight: number;
    minWeight: number;
  };
  dimensions: {
    unit: 'cm' | 'in';
    maxLength: number;
    maxWidth: number;
    maxHeight: number;
  };
  delivery: {
    estimatedDays: Record<string, number>;
    saturdayDelivery: boolean;
    sundayDelivery: boolean;
    holidayDelivery: boolean;
  };
  cod: {
    enabled: boolean;
    minAmount: number;
    maxAmount: number;
    charge: number;
  };
}

export const createShippingConfig = (): ShippingConfig => ({
  defaultCountry: 'BD',
  defaultZone: 'dhaka',
  rates: {
    domestic: {
      dhaka: 60,
      chittagong: 80,
      rajshahi: 100,
      khulna: 100,
      barisal: 120,
      sylhet: 120,
      rangpur: 140,
      mymensingh: 100,
    },
    international: {
      US: 2000,
      UK: 1800,
      AE: 1500,
      IN: 500,
      SG: 1200,
      MY: 1000,
    },
  },
  weight: {
    unit: 'kg',
    maxWeight: 30,
    minWeight: 0.1,
  },
  dimensions: {
    unit: 'cm',
    maxLength: 100,
    maxWidth: 100,
    maxHeight: 100,
  },
  delivery: {
    estimatedDays: {
      dhaka: 1,
      chittagong: 2,
      rajshahi: 3,
      khulna: 3,
      barisal: 4,
      sylhet: 4,
      rangpur: 5,
      mymensingh: 3,
    },
    saturdayDelivery: false,
    sundayDelivery: false,
    holidayDelivery: false,
  },
  cod: {
    enabled: true,
    minAmount: 50,
    maxAmount: 50000,
    charge: 30,
  },
});
