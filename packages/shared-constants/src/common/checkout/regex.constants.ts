/**
 * Checkout Regular Expression Constants
 * Contains all regex patterns for checkout management
 */

export const CheckoutRegex = {
  // Email validation pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number patterns
  PHONE: {
    BANGLADESH: /^(?:\+880|880|0)1[3-9]\d{8}$/,
    INTERNATIONAL: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  },

  // Password validation pattern
  // At least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Postal code patterns
  POSTAL_CODE: {
    BANGLADESH: /^\d{4}$/,
    USA: /^\d{5}(?:-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
    CANADA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
  },

  // Credit card patterns
  CARD: {
    VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MASTERCARD: /^5[1-5][0-9]{14}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{13}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    GENERIC: /^[0-9]{13,19}$/,
  },

  // CVV pattern
  CVV: /^[0-9]{3,4}$/,

  // URL validation
  URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,

  // Date format patterns
  DATE: {
    YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    DD_MM_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    MM_DD_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
  },

  // Checkout specific patterns
  CHECKOUT: {
    ORDER_ID: /^ORD-[A-Z0-9]{8,12}$/,
    TRANSACTION_ID: /^TXN-[A-Z0-9]{10,16}$/,
    COUPON_CODE: /^[A-Z0-9]{6,12}$/,
    CARD_EXPIRY: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
  },

  // Name patterns
  NAME: {
    FIRST_NAME: /^[a-zA-Z]{2,50}$/,
    LAST_NAME: /^[a-zA-Z]{2,50}$/,
    FULL_NAME: /^[a-zA-Z\s\-.]{2,100}$/,
  },

  // Address patterns
  ADDRESS: {
    STREET: /^[a-zA-Z0-9\s\-.,#]{5,100}$/,
    CITY: /^[a-zA-Z\s\-.]{2,50}$/,
    STATE: /^[a-zA-Z\s\-.]{2,50}$/,
    COUNTRY: /^[a-zA-Z\s\-.]{2,50}$/,
  },

  // Numeric patterns
  NUMERIC: {
    POSITIVE_INTEGER: /^[1-9]\d*$/,
    NON_NEGATIVE_INTEGER: /^\d+$/,
    DECIMAL: /^\d+(?:\.\d{1,2})?$/,
    PERCENTAGE: /^\d+(?:\.\d{1,2})?%$/,
  },
} as const;

// Helper function to test regex patterns with proper typing
export const CheckoutRegexTester = {
  testEmail: (value: string): boolean => CheckoutRegex.EMAIL.test(value),
  testBangladeshPhone: (value: string): boolean => CheckoutRegex.PHONE.BANGLADESH.test(value),
  testInternationalPhone: (value: string): boolean => CheckoutRegex.PHONE.INTERNATIONAL.test(value),
  testPassword: (value: string): boolean => CheckoutRegex.PASSWORD.test(value),
  testBangladeshPostalCode: (value: string): boolean =>
    CheckoutRegex.POSTAL_CODE.BANGLADESH.test(value),
  testUSAPostalCode: (value: string): boolean => CheckoutRegex.POSTAL_CODE.USA.test(value),
  testUKPostalCode: (value: string): boolean => CheckoutRegex.POSTAL_CODE.UK.test(value),
  testCanadaPostalCode: (value: string): boolean => CheckoutRegex.POSTAL_CODE.CANADA.test(value),
  testCreditCard: (value: string): boolean => CheckoutRegex.CARD.GENERIC.test(value),
  testCVV: (value: string): boolean => CheckoutRegex.CVV.test(value),
  testURL: (value: string): boolean => CheckoutRegex.URL.test(value),
  testOrderId: (value: string): boolean => CheckoutRegex.CHECKOUT.ORDER_ID.test(value),
  testTransactionId: (value: string): boolean => CheckoutRegex.CHECKOUT.TRANSACTION_ID.test(value),
  testCouponCode: (value: string): boolean => CheckoutRegex.CHECKOUT.COUPON_CODE.test(value),
  testCardExpiry: (value: string): boolean => CheckoutRegex.CHECKOUT.CARD_EXPIRY.test(value),
  testFirstName: (value: string): boolean => CheckoutRegex.NAME.FIRST_NAME.test(value),
  testLastName: (value: string): boolean => CheckoutRegex.NAME.LAST_NAME.test(value),
  testFullName: (value: string): boolean => CheckoutRegex.NAME.FULL_NAME.test(value),
  testStreet: (value: string): boolean => CheckoutRegex.ADDRESS.STREET.test(value),
  testCity: (value: string): boolean => CheckoutRegex.ADDRESS.CITY.test(value),
  testState: (value: string): boolean => CheckoutRegex.ADDRESS.STATE.test(value),
  testCountry: (value: string): boolean => CheckoutRegex.ADDRESS.COUNTRY.test(value),
  testPositiveInteger: (value: string): boolean =>
    CheckoutRegex.NUMERIC.POSITIVE_INTEGER.test(value),
  testNonNegativeInteger: (value: string): boolean =>
    CheckoutRegex.NUMERIC.NON_NEGATIVE_INTEGER.test(value),
  testDecimal: (value: string): boolean => CheckoutRegex.NUMERIC.DECIMAL.test(value),
  testPercentage: (value: string): boolean => CheckoutRegex.NUMERIC.PERCENTAGE.test(value),
} as const;
