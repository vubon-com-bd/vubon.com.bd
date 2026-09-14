export const TAX_TYPE = {
  VAT: 'vat',
  GST: 'gst',
  SALES_TAX: 'sales_tax',
  INCOME_TAX: 'income_tax',
  WITHHOLDING_TAX: 'withholding_tax',
  CUSTOMS_DUTY: 'customs_duty',
  EXCISE_DUTY: 'excise_duty',
  SERVICE_TAX: 'service_tax',
  ENVIRONMENTAL_TAX: 'environmental_tax',
  DIGITAL_SERVICE_TAX: 'digital_service_tax',
} as const;

export const TAX_CATEGORY = {
  STANDARD: 'standard',
  REDUCED: 'reduced',
  ZERO_RATED: 'zero_rated',
  EXEMPT: 'exempt',
  OUT_OF_SCOPE: 'out_of_scope',
} as const;

export type TaxTypeType = (typeof TAX_TYPE)[keyof typeof TAX_TYPE];
export type TaxCategoryType = (typeof TAX_CATEGORY)[keyof typeof TAX_CATEGORY];
