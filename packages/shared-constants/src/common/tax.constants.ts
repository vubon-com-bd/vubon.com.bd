/**
 * Tax Constants
 * @module shared-constants/common/tax.constants
 */

export const TAX = {
  // Tax types
  TYPE: {
    VAT: 'vat', // Value Added Tax
    GST: 'gst', // Goods and Services Tax
    SALES_TAX: 'sales_tax',
    INCOME_TAX: 'income_tax',
    WITHHOLDING_TAX: 'withholding_tax',
    SERVICE_TAX: 'service_tax',
    EXCISE: 'excise',
    CUSTOMS: 'customs',
    IMPORT_DUTY: 'import_duty',
    EXPORT_DUTY: 'export_duty',
    TDS: 'tds', // Tax Deducted at Source
    TCS: 'tcs', // Tax Collected at Source
  } as const,

  // Bangladesh tax rates
  BD: {
    VAT_STANDARD: 15, // 15%
    VAT_REDUCED: 7.5, // 7.5%
    VAT_EXPORT: 0, // 0% for export
    VAT_ITEMS: [
      // Some common items with reduced VAT
      'books',
      'newspaper',
      'medicine',
      'agricultural_products',
    ],
    TDS_RATES: {
      company: 10,
      individual: 5,
      non_resident: 20,
      contractor: 6,
    },
    TCS_RATES: {
      goods: 2,
      services: 5,
    },
    INCOME_TAX_RATES: {
      individual: {
        up_to_300000: 0,
        '300001-500000': 5,
        '500001-700000': 10,
        '700001-1000000': 15,
        '1000001-2000000': 20,
        above_2000000: 25,
      },
      company: {
        public: 25,
        private: 27.5,
        bank: 40,
      },
    },
  },

  // VAT calculation types
  VAT_CALCULATION: {
    EXCLUSIVE: 'exclusive',
    INCLUSIVE: 'inclusive',
    COMPOUND: 'compound',
  } as const,

  // Tax jurisdiction levels
  JURISDICTION: {
    FEDERAL: 'federal',
    STATE: 'state',
    LOCAL: 'local',
    INTERNATIONAL: 'international',
  } as const,

  // Tax status
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
    EXPIRED: 'expired',
  } as const,

  // Tax filing frequency
  FREQUENCY: {
    MONTHLY: 'monthly',
    QUARTERLY: 'quarterly',
    HALF_YEARLY: 'half_yearly',
    YEARLY: 'yearly',
    ONE_TIME: 'one_time',
  } as const,

  // Tax exemptions
  EXEMPTION_TYPE: {
    EDUCATION: 'education',
    MEDICAL: 'medical',
    CHARITY: 'charity',
    EXPORT: 'export',
    STARTUP: 'startup',
    SPECIAL_ZONE: 'special_zone',
  } as const,

  // Tax calculation methods
  CALCULATION: {
    PERCENTAGE: 'percentage',
    FIXED: 'fixed',
    SLAB: 'slab',
    COMPOUND: 'compound',
  } as const,

  // Default values
  DEFAULT: {
    VAT_RATE: 15,
    TAX_ROUNDING: 2,
    TAX_DECIMALS: 2,
    CURRENCY: 'BDT',
  },
} as const;

export type TaxType = (typeof TAX.TYPE)[keyof typeof TAX.TYPE];
export type TaxJurisdiction = (typeof TAX.JURISDICTION)[keyof typeof TAX.JURISDICTION];
export type TaxStatus = (typeof TAX.STATUS)[keyof typeof TAX.STATUS];
export type TaxFrequency = (typeof TAX.FREQUENCY)[keyof typeof TAX.FREQUENCY];
export type TaxCalculation = (typeof TAX.CALCULATION)[keyof typeof TAX.CALCULATION];
export type VatCalculationType = (typeof TAX.VAT_CALCULATION)[keyof typeof TAX.VAT_CALCULATION];
