/**
 * Tax Configuration
 * ট্যাক্স কনফিগারেশন
 */
export interface TaxConfig {
  enabled: boolean;
  defaultRate: number;
  type: 'vat' | 'gst' | 'sales' | 'income';
  countrySpecific: Record<string, number>;
  categorySpecific: Record<string, number>;
  exemptions: {
    enabled: boolean;
    categories: string[];
    minAmount: number;
    maxAmount: number;
  };
  rules: {
    name: string;
    rate: number;
    condition: string;
  }[];
}

export const createTaxConfig = (): TaxConfig => ({
  enabled: true,
  defaultRate: 15,
  type: 'vat',
  countrySpecific: {
    BD: 15,
    IN: 18,
    US: 0,
    UK: 20,
    AE: 5,
  },
  categorySpecific: {
    electronics: 15,
    fashion: 15,
    food: 5,
    books: 0,
    medicine: 0,
  },
  exemptions: {
    enabled: true,
    categories: ['books', 'medicine'],
    minAmount: 0,
    maxAmount: 0,
  },
  rules: [
    {
      name: 'Standard VAT',
      rate: 15,
      condition: 'default',
    },
    {
      name: 'Electronics VAT',
      rate: 15,
      condition: 'category:electronics',
    },
  ],
});
