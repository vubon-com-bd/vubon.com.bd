/**
 * Product Regular Expression Constants
 * Contains all regex patterns for product management
 */

export const ProductRegex = {
  // Email validation pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number patterns
  PHONE: {
    BANGLADESH: /^(?:\+880|880|0)1[3-9]\d{8}$/,
    USA: /^(?:\+1|1)?\s*\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
    UK: /^(?:\+44|44)?\s*7\d{3}\s*\d{6}$/,
    INDIA: /^(?:\+91|91)?\s*[6-9]\d{9}$/,
    INTERNATIONAL: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  },

  // URL patterns
  URL: {
    PRODUCT: /^\/api\/v\d+\/products\/[a-zA-Z0-9_-]+$/,
    CATEGORY: /^\/api\/v\d+\/categories\/[a-zA-Z0-9_-]+$/,
    BRAND: /^\/api\/v\d+\/brands\/[a-zA-Z0-9_-]+$/,
    GENERIC:
      /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
    PRODUCT_IMAGE: /^\/images\/products\/[a-zA-Z0-9_-]+\.[a-zA-Z]{3,4}$/,
    PRODUCT_THUMBNAIL: /^\/thumbnails\/[a-zA-Z0-9_-]+\.[a-zA-Z]{3,4}$/,
  },

  // Product SKU pattern (supports both uppercase and lowercase)
  SKU: /^[A-Za-z]{2,4}-\d{4,8}-[A-Za-z0-9]{2,6}$/,

  // Slug generation pattern
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // Price format patterns
  PRICE: {
    DECIMAL: /^\d+(?:\.\d{1,2})?$/,
    CURRENCY: /^[A-Z]{3}\s?\d+(?:\.\d{1,2})?$/,
    PERCENTAGE: /^\d+(?:\.\d{1,2})?%$/,
    MONEY: /^\d{1,3}(?:,\d{3})*(?:\.\d{2})?$/,
  },

  // Date time format patterns
  DATETIME: {
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
    DATE: /^\d{4}-\d{2}-\d{2}$/,
    TIME: /^\d{2}:\d{2}(?::\d{2})?$/,
    TIMESTAMP: /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/,
  },

  // Product specific patterns
  PRODUCT: {
    NAME: /^[a-zA-Z0-9\s\-_.,!?()&]{1,255}$/,
    DESCRIPTION: /^[\s\S]{1,5000}$/,
    TAG: /^[a-zA-Z0-9_\-]{1,50}$/,
    QUANTITY: /^[1-9]\d*$/,
    WEIGHT: /^\d+(?:\.\d{1,2})?\s*(?:kg|g|lb|oz)$/,
    DIMENSION: /^\d+(?:\.\d{1,2})?\s*x\s*\d+(?:\.\d{1,2})?\s*x\s*\d+(?:\.\d{1,2})?\s*(?:cm|in|mm)$/,
    COLOR: /^#[0-9a-fA-F]{6}$/,
    BARCODE: /^[0-9]{8,13}$/,
  },

  // Barcode patterns
  BARCODE: {
    EAN13: /^\d{13}$/,
    UPC12: /^\d{12}$/,
    ISBN10: /^(?:\d{9}[\dX])$/,
    ISBN13: /^\d{13}$/,
    CODE128: /^[ -~]{1,50}$/,
    CODE39: /^[A-Z0-9\-.*$/+%]{1,50}$/,
  },

  // Database and ID patterns
  ID: {
    MONGO: /^[0-9a-fA-F]{24}$/,
    UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
    NUMERIC: /^\d+$/,
    ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  },

  // Security patterns
  SECURITY: {
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    TOKEN: /^[a-f0-9]{32}$/,
    API_KEY: /^[a-zA-Z0-9]{32,64}$/,
    JWT: /^eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+$/,
  },
} as const;

// Helper function to test regex patterns
export const ProductRegexTester = {
  testEmail: (value: string): boolean => ProductRegex.EMAIL.test(value),
  testBangladeshPhone: (value: string): boolean => ProductRegex.PHONE.BANGLADESH.test(value),
  testUSAphone: (value: string): boolean => ProductRegex.PHONE.USA.test(value),
  testUKPhone: (value: string): boolean => ProductRegex.PHONE.UK.test(value),
  testIndiaPhone: (value: string): boolean => ProductRegex.PHONE.INDIA.test(value),
  testInternationalPhone: (value: string): boolean => ProductRegex.PHONE.INTERNATIONAL.test(value),
  testProductURL: (value: string): boolean => ProductRegex.URL.PRODUCT.test(value),
  testCategoryURL: (value: string): boolean => ProductRegex.URL.CATEGORY.test(value),
  testBrandURL: (value: string): boolean => ProductRegex.URL.BRAND.test(value),
  testGenericURL: (value: string): boolean => ProductRegex.URL.GENERIC.test(value),
  testSKU: (value: string): boolean => ProductRegex.SKU.test(value),
  testSlug: (value: string): boolean => ProductRegex.SLUG.test(value),
  testPriceDecimal: (value: string): boolean => ProductRegex.PRICE.DECIMAL.test(value),
  testCurrency: (value: string): boolean => ProductRegex.PRICE.CURRENCY.test(value),
  testPercentage: (value: string): boolean => ProductRegex.PRICE.PERCENTAGE.test(value),
  testMoney: (value: string): boolean => ProductRegex.PRICE.MONEY.test(value),
  testProductName: (value: string): boolean => ProductRegex.PRODUCT.NAME.test(value),
  testProductDescription: (value: string): boolean => ProductRegex.PRODUCT.DESCRIPTION.test(value),
  testTag: (value: string): boolean => ProductRegex.PRODUCT.TAG.test(value),
  testQuantity: (value: string): boolean => ProductRegex.PRODUCT.QUANTITY.test(value),
  testWeight: (value: string): boolean => ProductRegex.PRODUCT.WEIGHT.test(value),
  testDimension: (value: string): boolean => ProductRegex.PRODUCT.DIMENSION.test(value),
  testColor: (value: string): boolean => ProductRegex.PRODUCT.COLOR.test(value),
  testBarcode: (value: string): boolean => ProductRegex.PRODUCT.BARCODE.test(value),
  testEAN13: (value: string): boolean => ProductRegex.BARCODE.EAN13.test(value),
  testUPC12: (value: string): boolean => ProductRegex.BARCODE.UPC12.test(value),
  testISBN10: (value: string): boolean => ProductRegex.BARCODE.ISBN10.test(value),
  testISBN13: (value: string): boolean => ProductRegex.BARCODE.ISBN13.test(value),
  testMongoId: (value: string): boolean => ProductRegex.ID.MONGO.test(value),
  testUUID: (value: string): boolean => ProductRegex.ID.UUID.test(value),
  testNumeric: (value: string): boolean => ProductRegex.ID.NUMERIC.test(value),
  testAlphanumeric: (value: string): boolean => ProductRegex.ID.ALPHANUMERIC.test(value),
  testPassword: (value: string): boolean => ProductRegex.SECURITY.PASSWORD.test(value),
  testToken: (value: string): boolean => ProductRegex.SECURITY.TOKEN.test(value),
  testApiKey: (value: string): boolean => ProductRegex.SECURITY.API_KEY.test(value),
  testJWT: (value: string): boolean => ProductRegex.SECURITY.JWT.test(value),
};
