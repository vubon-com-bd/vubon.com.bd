/**
 * Logistics Regular Expression Constants
 * Contains all regex patterns for logistics management
 */

export const LogisticsRegex = {
  // Email validation pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number patterns
  PHONE: {
    BANGLADESH: /^(?:\+880|880|0)1[3-9]\d{8}$/,
    INTERNATIONAL: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  },

  // Tracking number patterns
  TRACKING: {
    DHL: /^[0-9]{10,11}$/,
    FEDEX: /^[0-9]{12,15}$/,
    UPS: /^1Z[A-Z0-9]{16}$/,
    USPS: /^[0-9]{20,22}$/,
    GENERIC: /^[A-Z0-9]{8,20}$/,
  },

  // Shipment number patterns
  SHIPMENT: {
    STANDARD: /^SHIP-[A-Z0-9]{8,12}$/,
    EXPRESS: /^EXP-[A-Z0-9]{8,12}$/,
    INTERNATIONAL: /^INT-[A-Z0-9]{8,12}$/,
  },

  // Postal/Zip code patterns
  POSTAL_CODE: {
    BANGLADESH: /^\d{4}$/,
    USA: /^\d{5}(?:-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
    CANADA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
    INTERNATIONAL: /^[A-Z0-9\s\-]{3,10}$/,
  },

  // URL validation
  URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,

  // Date formats
  DATE: {
    YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    DD_MM_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
    TIMESTAMP: /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/,
  },

  // Address patterns
  ADDRESS: {
    STREET: /^[a-zA-Z0-9\s\-.,#]{5,150}$/,
    CITY: /^[a-zA-Z\s\-.]{2,50}$/,
    STATE: /^[a-zA-Z\s\-.]{2,50}$/,
    COUNTRY: /^[a-zA-Z\s\-.]{2,50}$/,
  },

  // Name patterns with Unicode support
  NAME: {
    FIRST: /^[\p{L}]{2,50}$/u,
    LAST: /^[\p{L}]{2,50}$/u,
    FULL: /^[\p{L}\s\-.'’]{2,100}$/u,
    COMPANY: /^[\p{L}\p{N}\s\-_.,!?()&]{2,100}$/u,
  },

  // Numeric patterns
  NUMERIC: {
    POSITIVE_INTEGER: /^[1-9]\d*$/,
    NON_NEGATIVE_INTEGER: /^\d+$/,
    DECIMAL: /^\d+(?:\.\d{1,2})?$/,
  },

  // Weight patterns with case insensitive support
  WEIGHT: {
    KG: /^\d+(?:\.\d{1,2})?\s*[kK][gG]$/,
    LB: /^\d+(?:\.\d{1,2})?\s*[lL][bB]$/,
    OZ: /^\d+(?:\.\d{1,2})?\s*[oO][zZ]$/,
  },

  // Dimension patterns
  DIMENSION: {
    CM: /^\d+(?:\.\d{1,2})?\s*x\s*\d+(?:\.\d{1,2})?\s*x\s*\d+(?:\.\d{1,2})?\s*[cC][mM]$/,
    IN: /^\d+(?:\.\d{1,2})?\s*x\s*\d+(?:\.\d{1,2})?\s*x\s*\d+(?:\.\d{1,2})?\s*[iI][nN]$/,
  },
} as const;

// Helper function to test regex patterns
export const LogisticsRegexTester = {
  testEmail: (value: string): boolean => LogisticsRegex.EMAIL.test(value),
  testBangladeshPhone: (value: string): boolean => LogisticsRegex.PHONE.BANGLADESH.test(value),
  testTrackingNumber: (value: string): boolean => LogisticsRegex.TRACKING.GENERIC.test(value),
  testShipmentNumber: (value: string): boolean => LogisticsRegex.SHIPMENT.STANDARD.test(value),
  testBangladeshPostalCode: (value: string): boolean =>
    LogisticsRegex.POSTAL_CODE.BANGLADESH.test(value),
  testURL: (value: string): boolean => LogisticsRegex.URL.test(value),
  testCompanyName: (value: string): boolean => LogisticsRegex.NAME.COMPANY.test(value),
  testWeight: (value: string): boolean => LogisticsRegex.WEIGHT.KG.test(value),
};
