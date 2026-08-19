/**
 * Flash Sales & Deals Regular Expression Constants
 * Contains all regex patterns for flash sales and deals management
 */

export const FlashSalesDealsRegex = {
  // ==================== Email Patterns ====================
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  EMAIL_WITH_NAME: /^[a-zA-Z\s]+<[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}>$/,
  EMAIL_DOMAIN: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // ==================== Phone Patterns ====================
  PHONE: {
    BANGLADESH: /^(?:\+880|880|0)1[3-9]\d{8}$/,
    INTERNATIONAL: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    USA: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
    UK: /^((?:\+44)?[0-9]{10,12})$/,
    INDIA: /^((?:\+91)?[6-9]\d{9})$/,
  },

  // ==================== URL Patterns ====================
  URL: /^(https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
  URL_WITH_PROTOCOL:
    /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,

  // ==================== Slug Patterns ====================
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  SLUG_WITH_SEPARATOR: /^[a-zA-Z0-9]+(?:[-_][a-zA-Z0-9]+)*$/,
  SLUG_WITH_UNDERSCORE: /^[a-z0-9]+(?:_[a-z0-9]+)*$/,

  // ==================== UUID & ID Patterns ====================
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,
  UUID_V4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,

  // ==================== Flash Sales & Deals ID Patterns ====================
  FLASH_SALE_ID: /^FS-[A-Z0-9]{8,12}$/,
  DEAL_ID: /^DEAL-[A-Z0-9]{8,12}$/,
  PRODUCT_DEAL_ID: /^PD-[A-Z0-9]{8,12}$/,
  BUNDLE_DEAL_ID: /^BD-[A-Z0-9]{8,12}$/,
  SCHEDULE_ID: /^SCH-[A-Z0-9]{8,12}$/,
  PARTICIPANT_ID: /^PART-[A-Z0-9]{8,12}$/,

  // ==================== Coupon & Voucher Patterns ====================
  COUPON_CODE: /^[A-Z0-9]{6,16}$/,
  COUPON_CODE_WITH_PREFIX: /^[A-Z]{2,4}[0-9]{6,12}$/,
  VOUCHER_CODE: /^[A-Z0-9]{8,20}$/,
  VOUCHER_CODE_WITH_PREFIX: /^[A-Z]{2,4}[0-9]{8,16}$/,

  // ==================== Date Patterns ====================
  DATE: {
    ISO: /^\d{4}-\d{2}-\d{2}$/,
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
    DD_MM_YYYY: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
    MM_DD_YYYY: /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/,
    YYYY_MM_DD: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/,
    DD_MM_YYYY_HYPHEN: /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-\d{4}$/,
  },

  // ==================== Time Patterns ====================
  TIME: {
    _24H: /^([0-1][0-9]|2[0-3]):[0-5][0-9](?::[0-5][0-9])?$/,
    _12H: /^(0[0-9]|1[0-2]):[0-5][0-9](?::[0-5][0-9])?\s?(?:AM|PM)$/,
    _24H_WITH_MS: /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\.\d{3}$/,
  },

  // ==================== DateTime Patterns ====================
  DATETIME: {
    ISO: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
    DD_MM_YYYY_HH_MM:
      /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4} ([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
  },

  // ==================== Password Patterns ====================
  PASSWORD: {
    STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
    WEAK: /^.{4,}$/,
    VERY_STRONG:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=.*[^a-zA-Z0-9])[A-Za-z\d@$!%*?&]{10,}$/,
  },

  // ==================== Username Patterns ====================
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,
  USERNAME_VALID: /^[a-zA-Z][a-zA-Z0-9_]{2,29}$/,
  USERNAME_STRICT: /^[a-z][a-z0-9_]{2,29}$/,

  // ==================== Zip Code Patterns ====================
  ZIP_CODE: {
    BANGLADESH: /^\d{4}$/,
    USA: /^\d{5}(?:-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
    CANADA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
    INDIA: /^\d{6}$/,
    GERMANY: /^\d{5}$/,
    FRANCE: /^\d{5}$/,
    AUSTRALIA: /^\d{4}$/,
  },

  // ==================== IP Address Patterns ====================
  IP_ADDRESS: {
    IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    IPV6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  },

  // ==================== MAC Address Patterns ====================
  MAC_ADDRESS: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,
  MAC_ADDRESS_COLON: /^([0-9A-Fa-f]{2}:){5}([0-9A-Fa-f]{2})$/,
  MAC_ADDRESS_HYPHEN: /^([0-9A-Fa-f]{2}-){5}([0-9A-Fa-f]{2})$/,

  // ==================== Hex Color Patterns ====================
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  HEX_COLOR_8: /^#([A-Fa-f0-9]{8})$/,

  // ==================== Credit Card Patterns ====================
  CREDIT_CARD: {
    VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MASTERCARD: /^5[1-5][0-9]{14}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{13}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    JCB: /^(?:2131|1800|35\d{3})\d{11}$/,
    DINERS_CLUB: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    GENERIC: /^[0-9]{13,19}$/,
  },

  // ==================== Currency Patterns ====================
  CURRENCY: /^\$?(\d{1,3},?)+\d{1,2}(?:\.\d{2})?$/,
  CURRENCY_SYMBOL: /^[$€£¥₩₽₹₴₪₫₦₱₵₡₢₣₤₥₦₧₨₩₪₫€£¥]/,
  CURRENCY_AMOUNT: /^\d+(?:\.\d{2})?$/,

  // ==================== Percentage Pattern ====================
  PERCENTAGE: /^(\d+(?:\.\d{1,2})?)%$/,
  PERCENTAGE_DECIMAL: /^0\.\d{1,2}$/,

  // ==================== Alphanumeric Patterns ====================
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,
  ALPHANUMERIC_WITH_SPACE: /^[a-zA-Z0-9\s]+$/,
  ALPHANUMERIC_WITH_SPECIAL: /^[a-zA-Z0-9\s\-_.,!@#$%^&*()]+$/,

  // ==================== Alphabetic Patterns ====================
  ALPHABETIC: /^[a-zA-Z]+$/,
  ALPHABETIC_WITH_SPACE: /^[a-zA-Z\s]+$/,
  ALPHABETIC_WITH_ACCENTS: /^[a-zA-ZÀ-ÿ\s]+$/,

  // ==================== Numeric Patterns ====================
  NUMERIC: /^\d+$/,
  DECIMAL: /^\d+(?:\.\d{1,2})?$/,
  FLOAT: /^-?\d+(?:\.\d+)?$/,
  INTEGER: /^-?\d+$/,
  POSITIVE_INTEGER: /^[1-9]\d*$/,
  NEGATIVE_INTEGER: /^-[1-9]\d*$/,

  // ==================== HTML Patterns ====================
  HTML_TAG: /^<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>$/,
  HTML_ATTRIBUTE: /^[a-zA-Z-]+="[^"]*"$/,
  HTML_SAFE: /^[^<>{}]*$/,
  HTML_TAG_STRIP: /<[^>]*>/g,

  // ==================== Security Patterns ====================
  SQL_SAFE: /^[a-zA-Z0-9_\-]+$/,
  XSS_SAFE: /^[^<>{}'"]*$/,
  JSON_VALID: /^[\s\[\{]*(?:"[^"]*"|true|false|null|\d+)[\s\]\}]*$/,
  XML_VALID: /^<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>$/,

  // ==================== File Patterns ====================
  FILE_EXTENSION: /\.([a-zA-Z0-9]+)$/,
  IMAGE_EXTENSION: /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|ico)$/i,
  VIDEO_EXTENSION: /\.(mp4|avi|mkv|mov|wmv|flv|webm|m4v|mpg|mpeg)$/i,
  AUDIO_EXTENSION: /\.(mp3|wav|aac|flac|m4a|ogg|wma)$/i,
  DOCUMENT_EXTENSION: /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt|rtf|csv|json|xml)$/i,

  // ==================== Barcode Patterns ====================
  BARCODE: {
    EAN_13: /^\d{13}$/,
    UPC_A: /^\d{12}$/,
    CODE_128: /^[ -~]+$/,
    QR_CODE: /^[A-Za-z0-9\-_]+$/,
  },

  // ==================== Discount Patterns ====================
  DISCOUNT: {
    PERCENTAGE: /^([1-9][0-9]?|100)$/,
    AMOUNT: /^\d+(?:\.\d{2})?$/,
    TIER: /^TIER_(?:[1-9]|1[0-9]|20)$/,
  },
} as const;

// ==================== Helper Functions ====================

export const FlashSalesDealsRegexTester = {
  // Email
  testEmail: (value: string): boolean => FlashSalesDealsRegex.EMAIL.test(value),
  testEmailWithName: (value: string): boolean => FlashSalesDealsRegex.EMAIL_WITH_NAME.test(value),

  // Phone
  testBangladeshPhone: (value: string): boolean =>
    FlashSalesDealsRegex.PHONE.BANGLADESH.test(value),
  testInternationalPhone: (value: string): boolean =>
    FlashSalesDealsRegex.PHONE.INTERNATIONAL.test(value),

  // URL
  testURL: (value: string): boolean => FlashSalesDealsRegex.URL.test(value),
  testURLWithProtocol: (value: string): boolean =>
    FlashSalesDealsRegex.URL_WITH_PROTOCOL.test(value),

  // Slug
  testSlug: (value: string): boolean => FlashSalesDealsRegex.SLUG.test(value),
  testSlugWithSeparator: (value: string): boolean =>
    FlashSalesDealsRegex.SLUG_WITH_SEPARATOR.test(value),

  // UUID
  testUUID: (value: string): boolean => FlashSalesDealsRegex.UUID.test(value),
  testUUIDV4: (value: string): boolean => FlashSalesDealsRegex.UUID_V4.test(value),

  // Flash Sales & Deals IDs
  testFlashSaleId: (value: string): boolean => FlashSalesDealsRegex.FLASH_SALE_ID.test(value),
  testDealId: (value: string): boolean => FlashSalesDealsRegex.DEAL_ID.test(value),
  testProductDealId: (value: string): boolean => FlashSalesDealsRegex.PRODUCT_DEAL_ID.test(value),
  testBundleDealId: (value: string): boolean => FlashSalesDealsRegex.BUNDLE_DEAL_ID.test(value),

  // Coupon & Voucher
  testCouponCode: (value: string): boolean => FlashSalesDealsRegex.COUPON_CODE.test(value),
  testVoucherCode: (value: string): boolean => FlashSalesDealsRegex.VOUCHER_CODE.test(value),

  // Date
  testDateISO: (value: string): boolean => FlashSalesDealsRegex.DATE.ISO.test(value),
  testDateISO8601: (value: string): boolean => FlashSalesDealsRegex.DATE.ISO8601.test(value),
  testDateDDMMYYYY: (value: string): boolean => FlashSalesDealsRegex.DATE.DD_MM_YYYY.test(value),
  testDateMMDDYYYY: (value: string): boolean => FlashSalesDealsRegex.DATE.MM_DD_YYYY.test(value),

  // Time
  testTime24H: (value: string): boolean => FlashSalesDealsRegex.TIME._24H.test(value),
  testTime12H: (value: string): boolean => FlashSalesDealsRegex.TIME._12H.test(value),

  // Password
  testPasswordStrong: (value: string): boolean => FlashSalesDealsRegex.PASSWORD.STRONG.test(value),
  testPasswordMedium: (value: string): boolean => FlashSalesDealsRegex.PASSWORD.MEDIUM.test(value),
  testPasswordWeak: (value: string): boolean => FlashSalesDealsRegex.PASSWORD.WEAK.test(value),
  testPasswordVeryStrong: (value: string): boolean =>
    FlashSalesDealsRegex.PASSWORD.VERY_STRONG.test(value),

  // Username
  testUsername: (value: string): boolean => FlashSalesDealsRegex.USERNAME.test(value),
  testUsernameValid: (value: string): boolean => FlashSalesDealsRegex.USERNAME_VALID.test(value),

  // Zip Code
  testBangladeshZipCode: (value: string): boolean =>
    FlashSalesDealsRegex.ZIP_CODE.BANGLADESH.test(value),
  testUSAZipCode: (value: string): boolean => FlashSalesDealsRegex.ZIP_CODE.USA.test(value),
  testUKZipCode: (value: string): boolean => FlashSalesDealsRegex.ZIP_CODE.UK.test(value),

  // IP Address
  testIPV4: (value: string): boolean => FlashSalesDealsRegex.IP_ADDRESS.IPV4.test(value),
  testIPV6: (value: string): boolean => FlashSalesDealsRegex.IP_ADDRESS.IPV6.test(value),

  // MAC Address
  testMacAddress: (value: string): boolean => FlashSalesDealsRegex.MAC_ADDRESS.test(value),
  testMacAddressColon: (value: string): boolean =>
    FlashSalesDealsRegex.MAC_ADDRESS_COLON.test(value),
  testMacAddressHyphen: (value: string): boolean =>
    FlashSalesDealsRegex.MAC_ADDRESS_HYPHEN.test(value),

  // Hex Color
  testHexColor: (value: string): boolean => FlashSalesDealsRegex.HEX_COLOR.test(value),
  testHexColor8: (value: string): boolean => FlashSalesDealsRegex.HEX_COLOR_8.test(value),

  // Credit Card
  testCreditCardVisa: (value: string): boolean => FlashSalesDealsRegex.CREDIT_CARD.VISA.test(value),
  testCreditCardMastercard: (value: string): boolean =>
    FlashSalesDealsRegex.CREDIT_CARD.MASTERCARD.test(value),
  testCreditCardAmex: (value: string): boolean =>
    FlashSalesDealsRegex.CREDIT_CARD.AMERICAN_EXPRESS.test(value),
  testCreditCardDiscover: (value: string): boolean =>
    FlashSalesDealsRegex.CREDIT_CARD.DISCOVER.test(value),
  testCreditCardGeneric: (value: string): boolean =>
    FlashSalesDealsRegex.CREDIT_CARD.GENERIC.test(value),

  // Currency
  testCurrency: (value: string): boolean => FlashSalesDealsRegex.CURRENCY.test(value),
  testCurrencyAmount: (value: string): boolean => FlashSalesDealsRegex.CURRENCY_AMOUNT.test(value),

  // Percentage
  testPercentage: (value: string): boolean => FlashSalesDealsRegex.PERCENTAGE.test(value),
  testPercentageDecimal: (value: string): boolean =>
    FlashSalesDealsRegex.PERCENTAGE_DECIMAL.test(value),

  // Alphanumeric
  testAlphanumeric: (value: string): boolean => FlashSalesDealsRegex.ALPHANUMERIC.test(value),
  testAlphanumericWithSpace: (value: string): boolean =>
    FlashSalesDealsRegex.ALPHANUMERIC_WITH_SPACE.test(value),

  // Alphabetic
  testAlphabetic: (value: string): boolean => FlashSalesDealsRegex.ALPHABETIC.test(value),
  testAlphabeticWithSpace: (value: string): boolean =>
    FlashSalesDealsRegex.ALPHABETIC_WITH_SPACE.test(value),

  // Numeric
  testNumeric: (value: string): boolean => FlashSalesDealsRegex.NUMERIC.test(value),
  testDecimal: (value: string): boolean => FlashSalesDealsRegex.DECIMAL.test(value),
  testFloat: (value: string): boolean => FlashSalesDealsRegex.FLOAT.test(value),
  testInteger: (value: string): boolean => FlashSalesDealsRegex.INTEGER.test(value),
  testPositiveInteger: (value: string): boolean =>
    FlashSalesDealsRegex.POSITIVE_INTEGER.test(value),

  // HTML
  testHTMLTag: (value: string): boolean => FlashSalesDealsRegex.HTML_TAG.test(value),
  testHTMLSafe: (value: string): boolean => FlashSalesDealsRegex.HTML_SAFE.test(value),

  // Security
  testSQLSafe: (value: string): boolean => FlashSalesDealsRegex.SQL_SAFE.test(value),
  testXSSSafe: (value: string): boolean => FlashSalesDealsRegex.XSS_SAFE.test(value),
  testJSONValid: (value: string): boolean => FlashSalesDealsRegex.JSON_VALID.test(value),

  // File
  testFileExtension: (value: string): string | null => {
    const match = value.match(FlashSalesDealsRegex.FILE_EXTENSION);
    return match ? match[1] : null;
  },
  testImageExtension: (value: string): boolean => FlashSalesDealsRegex.IMAGE_EXTENSION.test(value),
  testVideoExtension: (value: string): boolean => FlashSalesDealsRegex.VIDEO_EXTENSION.test(value),
  testDocumentExtension: (value: string): boolean =>
    FlashSalesDealsRegex.DOCUMENT_EXTENSION.test(value),

  // Barcode
  testEAN13: (value: string): boolean => FlashSalesDealsRegex.BARCODE.EAN_13.test(value),
  testUPCA: (value: string): boolean => FlashSalesDealsRegex.BARCODE.UPC_A.test(value),

  // Discount
  testDiscountPercentage: (value: string): boolean =>
    FlashSalesDealsRegex.DISCOUNT.PERCENTAGE.test(value),
  testDiscountAmount: (value: string): boolean => FlashSalesDealsRegex.DISCOUNT.AMOUNT.test(value),
  testDiscountTier: (value: string): boolean => FlashSalesDealsRegex.DISCOUNT.TIER.test(value),
};

// ==================== Validation Helpers ====================

export const FlashSalesDealsRegexValidation = {
  // Get validation message for regex failure
  getMessage: (type: keyof typeof FlashSalesDealsRegexTester): string => {
    const messages: Record<keyof typeof FlashSalesDealsRegexTester, string> = {
      testEmail: 'Please enter a valid email address',
      testEmailWithName: 'Please enter a valid email address with name',
      testBangladeshPhone: 'Please enter a valid Bangladeshi phone number',
      testInternationalPhone: 'Please enter a valid international phone number',
      testURL: 'Please enter a valid URL',
      testURLWithProtocol: 'Please enter a valid URL with protocol',
      testSlug: 'Please enter a valid slug',
      testSlugWithSeparator: 'Please enter a valid slug with separator',
      testUUID: 'Please enter a valid UUID',
      testUUIDV4: 'Please enter a valid UUID v4',
      testFlashSaleId: 'Please enter a valid flash sale ID',
      testDealId: 'Please enter a valid deal ID',
      testProductDealId: 'Please enter a valid product deal ID',
      testBundleDealId: 'Please enter a valid bundle deal ID',
      testCouponCode: 'Please enter a valid coupon code',
      testVoucherCode: 'Please enter a valid voucher code',
      testDateISO: 'Please enter a valid ISO date',
      testDateISO8601: 'Please enter a valid ISO 8601 date',
      testDateDDMMYYYY: 'Please enter a valid DD/MM/YYYY date',
      testDateMMDDYYYY: 'Please enter a valid MM/DD/YYYY date',
      testTime24H: 'Please enter a valid 24-hour time',
      testTime12H: 'Please enter a valid 12-hour time',
      testPasswordStrong:
        'Password must be at least 8 characters with uppercase, lowercase, number and special character',
      testPasswordMedium:
        'Password must be at least 6 characters with uppercase, lowercase and number',
      testPasswordWeak: 'Password must be at least 4 characters',
      testPasswordVeryStrong:
        'Password must be at least 10 characters with uppercase, lowercase, number, special and symbol',
      testUsername: 'Username must be 3-30 characters with letters, numbers and underscore',
      testUsernameValid: 'Username must start with a letter and be 3-30 characters',
      testBangladeshZipCode: 'Please enter a valid Bangladeshi zip code',
      testUSAZipCode: 'Please enter a valid US zip code',
      testUKZipCode: 'Please enter a valid UK postcode',
      testIPV4: 'Please enter a valid IPv4 address',
      testIPV6: 'Please enter a valid IPv6 address',
      testMacAddress: 'Please enter a valid MAC address',
      testMacAddressColon: 'Please enter a valid MAC address with colons',
      testMacAddressHyphen: 'Please enter a valid MAC address with hyphens',
      testHexColor: 'Please enter a valid hex color code',
      testHexColor8: 'Please enter a valid 8-digit hex color code',
      testCreditCardVisa: 'Please enter a valid Visa card number',
      testCreditCardMastercard: 'Please enter a valid Mastercard number',
      testCreditCardAmex: 'Please enter a valid American Express card number',
      testCreditCardDiscover: 'Please enter a valid Discover card number',
      testCreditCardGeneric: 'Please enter a valid credit card number',
      testCurrency: 'Please enter a valid currency amount',
      testCurrencyAmount: 'Please enter a valid currency amount',
      testPercentage: 'Please enter a valid percentage (e.g., 50%)',
      testPercentageDecimal: 'Please enter a valid decimal percentage',
      testAlphanumeric: 'Please enter alphanumeric characters only',
      testAlphanumericWithSpace: 'Please enter alphanumeric characters with space only',
      testAlphabetic: 'Please enter alphabetic characters only',
      testAlphabeticWithSpace: 'Please enter alphabetic characters with space only',
      testNumeric: 'Please enter numeric characters only',
      testDecimal: 'Please enter a valid decimal number',
      testFloat: 'Please enter a valid float number',
      testInteger: 'Please enter a valid integer',
      testPositiveInteger: 'Please enter a positive integer',
      testHTMLTag: 'Please enter a valid HTML tag',
      testHTMLSafe: 'Please enter HTML-safe content',
      testSQLSafe: 'Please enter SQL-safe characters only',
      testXSSSafe: 'Please enter XSS-safe content',
      testJSONValid: 'Please enter valid JSON',
      testFileExtension: 'Please enter a valid file extension',
      testImageExtension: 'Please enter a valid image file',
      testVideoExtension: 'Please enter a valid video file',
      testDocumentExtension: 'Please enter a valid document file',
      testEAN13: 'Please enter a valid EAN-13 barcode',
      testUPCA: 'Please enter a valid UPC-A barcode',
      testDiscountPercentage: 'Please enter a valid discount percentage (1-100)',
      testDiscountAmount: 'Please enter a valid discount amount',
      testDiscountTier: 'Please enter a valid discount tier (TIER_1 to TIER_20)',
    };
    return messages[type] || 'Invalid format';
  },

  // Get regex pattern description
  getDescription: (type: keyof typeof FlashSalesDealsRegexTester): string => {
    const descriptions: Record<keyof typeof FlashSalesDealsRegexTester, string> = {
      testEmail: 'Email address (e.g., user@example.com)',
      testEmailWithName: 'Email with name (e.g., User <user@example.com>)',
      testBangladeshPhone: 'Bangladeshi phone number (e.g., 01712345678 or +8801712345678)',
      testInternationalPhone: 'International phone number with country code',
      testURL: 'URL (e.g., example.com or https://example.com)',
      testURLWithProtocol: 'URL with protocol (e.g., https://example.com)',
      testSlug: 'Slug (e.g., my-awesome-slug)',
      testSlugWithSeparator: 'Slug with separator (e.g., my_awesome-slug)',
      testUUID: 'UUID (e.g., 123e4567-e89b-12d3-a456-426614174000)',
      testUUIDV4: 'UUID v4 (e.g., 123e4567-e89b-12d3-a456-426614174000)',
      testFlashSaleId: 'Flash sale ID (e.g., FS-ABC12345)',
      testDealId: 'Deal ID (e.g., DEAL-ABC12345)',
      testProductDealId: 'Product deal ID (e.g., PD-ABC12345)',
      testBundleDealId: 'Bundle deal ID (e.g., BD-ABC12345)',
      testCouponCode: 'Coupon code (e.g., SAVE20)',
      testVoucherCode: 'Voucher code (e.g., VOUCHER2024)',
      testDateISO: 'ISO date (e.g., 2024-01-01)',
      testDateISO8601: 'ISO 8601 datetime (e.g., 2024-01-01T12:00:00Z)',
      testDateDDMMYYYY: 'DD/MM/YYYY date (e.g., 01/01/2024)',
      testDateMMDDYYYY: 'MM/DD/YYYY date (e.g., 01/01/2024)',
      testTime24H: '24-hour time (e.g., 13:00:00)',
      testTime12H: '12-hour time (e.g., 01:00:00 PM)',
      testPasswordStrong: 'Strong password (8+ chars with uppercase, lowercase, number, special)',
      testPasswordMedium: 'Medium password (6+ chars with uppercase, lowercase, number)',
      testPasswordWeak: 'Weak password (4+ chars)',
      testPasswordVeryStrong:
        'Very strong password (10+ chars with uppercase, lowercase, number, special, symbol)',
      testUsername: 'Username (3-30 chars, letters, numbers, underscore)',
      testUsernameValid: 'Valid username (starts with letter, 3-30 chars)',
      testBangladeshZipCode: 'Bangladeshi zip code (4 digits)',
      testUSAZipCode: 'US zip code (e.g., 12345 or 12345-6789)',
      testUKZipCode: 'UK postcode (e.g., EC1A 1BB)',
      testIPV4: 'IPv4 address (e.g., 192.168.1.1)',
      testIPV6: 'IPv6 address (e.g., 2001:0db8:85a3:0000:0000:8a2e:0370:7334)',
      testMacAddress: 'MAC address (e.g., 00:1A:2B:3C:4D:5E or 00-1A-2B-3C-4D-5E)',
      testMacAddressColon: 'MAC address with colons (e.g., 00:1A:2B:3C:4D:5E)',
      testMacAddressHyphen: 'MAC address with hyphens (e.g., 00-1A-2B-3C-4D-5E)',
      testHexColor: 'Hex color (e.g., #FF0000 or #F00)',
      testHexColor8: '8-digit hex color (e.g., #FF0000FF)',
      testCreditCardVisa: 'Visa card number (starts with 4)',
      testCreditCardMastercard: 'Mastercard number (starts with 51-55)',
      testCreditCardAmex: 'American Express number (starts with 34 or 37)',
      testCreditCardDiscover: 'Discover card number (starts with 6011, 65, or 644-649)',
      testCreditCardGeneric: 'Generic credit card number (13-19 digits)',
      testCurrency: 'Currency amount (e.g., $1,234.56)',
      testCurrencyAmount: 'Currency amount (e.g., 1234.56)',
      testPercentage: 'Percentage (e.g., 50%)',
      testPercentageDecimal: 'Decimal percentage (e.g., 0.50)',
      testAlphanumeric: 'Alphanumeric characters only',
      testAlphanumericWithSpace: 'Alphanumeric with spaces',
      testAlphabetic: 'Alphabetic characters only',
      testAlphabeticWithSpace: 'Alphabetic with spaces',
      testNumeric: 'Numeric characters only',
      testDecimal: 'Decimal number (e.g., 123.45)',
      testFloat: 'Float number (e.g., -123.45)',
      testInteger: 'Integer number (e.g., -123)',
      testPositiveInteger: 'Positive integer (e.g., 123)',
      testHTMLTag: 'HTML tag (e.g., <div>content</div>)',
      testHTMLSafe: 'HTML-safe content (no < > { } characters)',
      testSQLSafe: 'SQL-safe characters only (letters, numbers, underscore, hyphen)',
      testXSSSafe: 'XSS-safe content (no < > { } \' " characters)',
      testJSONValid: 'Valid JSON format',
      testFileExtension: 'File extension (e.g., .jpg)',
      testImageExtension: 'Image file (e.g., .jpg, .png, .gif)',
      testVideoExtension: 'Video file (e.g., .mp4, .avi)',
      testDocumentExtension: 'Document file (e.g., .pdf, .doc)',
      testEAN13: 'EAN-13 barcode (13 digits)',
      testUPCA: 'UPC-A barcode (12 digits)',
      testDiscountPercentage: 'Discount percentage (1-100)',
      testDiscountAmount: 'Discount amount (e.g., 10.00)',
      testDiscountTier: 'Discount tier (e.g., TIER_1 to TIER_20)',
    };
    return descriptions[type] || 'Invalid format';
  },
};
