/**
 * Cart Regular Expression Constants
 * Contains all regex patterns for cart management
 */

export const CartRegex = {
  // Email validation pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number patterns
  PHONE: {
    BANGLADESH: /^(?:\+880|880|0)1[3-9]\d{8}$/,
    INTERNATIONAL: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  },

  // URL validation
  URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,

  // Coupon code pattern
  COUPON_CODE: /^[A-Z0-9]{6,12}$/,

  // Currency format pattern
  CURRENCY: /^\$?(\d{1,3},?)+\d{1,2}(?:\.\d{2})?$/,

  // Quantity validation pattern
  QUANTITY: /^[1-9]\d*$/,

  // Name validation patterns
  NAME: {
    FIRST: /^[a-zA-Z]{2,50}$/,
    LAST: /^[a-zA-Z]{2,50}$/,
    FULL: /^[a-zA-Z\s\-.]{2,100}$/,
  },

  // Address validation pattern
  ADDRESS: /^[a-zA-Z0-9\s\-.,#]{5,200}$/,

  // Zip code pattern
  ZIP_CODE: {
    BANGLADESH: /^\d{4}$/,
    USA: /^\d{5}(?:-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
    CANADA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
    INTERNATIONAL: /^[A-Z0-9\s\-]{3,10}$/,
  },

  // UUID validation pattern
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,

  // Cart specific patterns
  CART: {
    ID: /^CART-[A-Z0-9]{8,12}$/,
    ITEM_ID: /^ITEM-[A-Z0-9]{8,12}$/,
  },

  // Numeric patterns
  NUMERIC: {
    POSITIVE_INTEGER: /^[1-9]\d*$/,
    NON_NEGATIVE_INTEGER: /^\d+$/,
    DECIMAL: /^\d+(?:\.\d{1,2})?$/,
  },
} as const;

// Helper function to test regex patterns
export const CartRegexTester = {
  testEmail: (value: string): boolean => CartRegex.EMAIL.test(value),
  testBangladeshPhone: (value: string): boolean => CartRegex.PHONE.BANGLADESH.test(value),
  testURL: (value: string): boolean => CartRegex.URL.test(value),
  testCouponCode: (value: string): boolean => CartRegex.COUPON_CODE.test(value),
  testQuantity: (value: string): boolean => CartRegex.QUANTITY.test(value),
  testNameFull: (value: string): boolean => CartRegex.NAME.FULL.test(value),
  testAddress: (value: string): boolean => CartRegex.ADDRESS.test(value),
  testZipCode: (value: string): boolean => CartRegex.ZIP_CODE.BANGLADESH.test(value),
  testUUID: (value: string): boolean => CartRegex.UUID.test(value),
};
