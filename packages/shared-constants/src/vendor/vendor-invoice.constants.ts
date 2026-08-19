/**
 * ভেন্ডার ইনভয়েস সংক্রান্ত মৌলিক কনস্ট্যান্টসমূহ
 */

/**
 * ইনভয়েস আইডি প্রিফিক্স
 */
export const InvoiceIdPrefix = 'INV-';

/**
 * ইনভয়েস টাইপ অবজেক্ট
 */
export const InvoiceType = {
  PURCHASE: 'PURCHASE',
  SERVICE: 'SERVICE',
  COMMISSION: 'COMMISSION',
  PAYOUT: 'PAYOUT',
  ADJUSTMENT: 'ADJUSTMENT',
  CREDIT_NOTE: 'CREDIT_NOTE',
  DEBIT_NOTE: 'DEBIT_NOTE',
} as const;

/**
 * ইনভয়েস টাইপ - ইউনিয়ন টাইপ
 */
export type InvoiceTypeValue = (typeof InvoiceType)[keyof typeof InvoiceType];

/**
 * ইনভয়েস কারেন্সি
 */
export const InvoiceCurrency = 'BDT';

/**
 * ইনভয়েস পেমেন্ট টার্মস
 */
export const InvoicePaymentTerms = {
  NET_7: 'NET_7',
  NET_15: 'NET_15',
  NET_30: 'NET_30',
  NET_45: 'NET_45',
  NET_60: 'NET_60',
} as const;

/**
 * ইনভয়েস পেমেন্ট টার্মস - ইউনিয়ন টাইপ
 */
export type InvoicePaymentTermsValue =
  (typeof InvoicePaymentTerms)[keyof typeof InvoicePaymentTerms];

/**
 * ইনভয়েস ট্যাক্স টাইপ
 */
export const InvoiceTaxType = {
  VAT: 'VAT',
  GST: 'GST',
  WITHHOLDING: 'WITHHOLDING',
  SERVICE_TAX: 'SERVICE_TAX',
} as const;

/**
 * ইনভয়েস ট্যাক্স টাইপ - ইউনিয়ন টাইপ
 */
export type InvoiceTaxTypeValue = (typeof InvoiceTaxType)[keyof typeof InvoiceTaxType];

/**
 * ইনভয়েস লাইন আইটেম টাইপ
 */
export const InvoiceLineItemTypes = {
  PRODUCT: 'PRODUCT',
  SERVICE: 'SERVICE',
  COMMISSION: 'COMMISSION',
  FEE: 'FEE',
  TAX: 'TAX',
  DISCOUNT: 'DISCOUNT',
  SHIPPING: 'SHIPPING',
} as const;

/**
 * ইনভয়েস লাইন আইটেম টাইপ - ইউনিয়ন টাইপ
 */
export type InvoiceLineItemTypeValue =
  (typeof InvoiceLineItemTypes)[keyof typeof InvoiceLineItemTypes];

/**
 * ইনভয়েস টাইপ লেবেলসমূহ
 */
export const InvoiceTypeLabels: Record<InvoiceTypeValue, { en: string; bn: string }> = {
  [InvoiceType.PURCHASE]: {
    en: 'Purchase Invoice',
    bn: 'ক্রয় ইনভয়েস',
  },
  [InvoiceType.SERVICE]: {
    en: 'Service Invoice',
    bn: 'সেবা ইনভয়েস',
  },
  [InvoiceType.COMMISSION]: {
    en: 'Commission Invoice',
    bn: 'কমিশন ইনভয়েস',
  },
  [InvoiceType.PAYOUT]: {
    en: 'Payout Invoice',
    bn: 'পেআউট ইনভয়েস',
  },
  [InvoiceType.ADJUSTMENT]: {
    en: 'Adjustment Invoice',
    bn: 'সমন্বয় ইনভয়েস',
  },
  [InvoiceType.CREDIT_NOTE]: {
    en: 'Credit Note',
    bn: 'ক্রেডিট নোট',
  },
  [InvoiceType.DEBIT_NOTE]: {
    en: 'Debit Note',
    bn: 'ডেবিট নোট',
  },
};

/**
 * ইনভয়েস পেমেন্ট টার্মস লেবেলসমূহ
 */
export const InvoicePaymentTermsLabels: Record<
  InvoicePaymentTermsValue,
  { en: string; bn: string }
> = {
  [InvoicePaymentTerms.NET_7]: {
    en: 'Net 7 Days',
    bn: 'নেট ৭ দিন',
  },
  [InvoicePaymentTerms.NET_15]: {
    en: 'Net 15 Days',
    bn: 'নেট ১৫ দিন',
  },
  [InvoicePaymentTerms.NET_30]: {
    en: 'Net 30 Days',
    bn: 'নেট ৩০ দিন',
  },
  [InvoicePaymentTerms.NET_45]: {
    en: 'Net 45 Days',
    bn: 'নেট ৪৫ দিন',
  },
  [InvoicePaymentTerms.NET_60]: {
    en: 'Net 60 Days',
    bn: 'নেট ৬০ দিন',
  },
};

/**
 * ইনভয়েস ট্যাক্স টাইপ লেবেলসমূহ
 */
export const InvoiceTaxTypeLabels: Record<InvoiceTaxTypeValue, { en: string; bn: string }> = {
  [InvoiceTaxType.VAT]: {
    en: 'VAT',
    bn: 'ভ্যাট',
  },
  [InvoiceTaxType.GST]: {
    en: 'GST',
    bn: 'জিএসটি',
  },
  [InvoiceTaxType.WITHHOLDING]: {
    en: 'Withholding Tax',
    bn: 'উইথহোল্ডিং ট্যাক্স',
  },
  [InvoiceTaxType.SERVICE_TAX]: {
    en: 'Service Tax',
    bn: 'সার্ভিস ট্যাক্স',
  },
};

/**
 * ইনভয়েস লাইন আইটেম টাইপ লেবেলসমূহ
 */
export const InvoiceLineItemTypeLabels: Record<
  InvoiceLineItemTypeValue,
  { en: string; bn: string }
> = {
  [InvoiceLineItemTypes.PRODUCT]: {
    en: 'Product',
    bn: 'পণ্য',
  },
  [InvoiceLineItemTypes.SERVICE]: {
    en: 'Service',
    bn: 'সেবা',
  },
  [InvoiceLineItemTypes.COMMISSION]: {
    en: 'Commission',
    bn: 'কমিশন',
  },
  [InvoiceLineItemTypes.FEE]: {
    en: 'Fee',
    bn: 'ফি',
  },
  [InvoiceLineItemTypes.TAX]: {
    en: 'Tax',
    bn: 'কর',
  },
  [InvoiceLineItemTypes.DISCOUNT]: {
    en: 'Discount',
    bn: 'ডিসকাউন্ট',
  },
  [InvoiceLineItemTypes.SHIPPING]: {
    en: 'Shipping',
    bn: 'শিপিং',
  },
};

/**
 * ডিফল্ট VAT হার (শতকরা)
 */
export const DefaultVATRate = 15;

/**
 * ডিফল্ট GST হার (শতকরা)
 */
export const DefaultGSTRate = 12;

/**
 * ডিফল্ট Withholding Tax হার (শতকরা)
 */
export const DefaultWithholdingTaxRate = 10;

/**
 * ডিফল্ট Service Tax হার (শতকরা)
 */
export const DefaultServiceTaxRate = 5;

/**
 * ইনভয়েস ডিসকাউন্ট সর্বোচ্চ হার (শতকরা)
 */
export const InvoiceMaxDiscountRate = 50;

/**
 * ইনভয়েস লাইন আইটেম সর্বোচ্চ সংখ্যা
 */
export const InvoiceMaxLineItems = 50;
