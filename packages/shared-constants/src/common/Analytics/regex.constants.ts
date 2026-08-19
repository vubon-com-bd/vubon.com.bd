/**
 * Analytics Regular Expression Constants
 * Contains all regex patterns for analytics management
 */

export const AnalyticsRegex = {
  // Email validation pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  EMAIL_DOMAIN: /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number patterns
  PHONE: {
    BANGLADESH: /^(?:\+880|880|0)1[3-9]\d{8}$/,
    USA: /^(?:\+1|1)?\s*\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
    INTERNATIONAL: /^\+(?:[0-9] ?){6,14}[0-9]$/,
    UK: /^(?:\+44|44)?\s*7\d{3}\s*\d{6}$/,
    CANADA: /^(?:\+1|1)?\s*\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$/,
    AUSTRALIA: /^(?:\+61|61)?\s*[0-9]{9}$/,
    INDIA: /^(?:\+91|91)?\s*[6-9]\d{9}$/,
    PAKISTAN: /^(?:\+92|92)?\s*3[0-9]{9}$/,
    SAUDI_ARABIA: /^(?:\+966|966)?\s*5[0-9]{8}$/,
    UAE: /^(?:\+971|971)?\s*5[0-9]{8}$/,
    SINGAPORE: /^(?:\+65|65)?\s*[0-9]{8}$/,
    MALAYSIA: /^(?:\+60|60)?\s*1[0-9]{9}$/,
    THAILAND: /^(?:\+66|66)?\s*[0-9]{9}$/,
    VIETNAM: /^(?:\+84|84)?\s*[0-9]{9,10}$/,
    PHILIPPINES: /^(?:\+63|63)?\s*[0-9]{10}$/,
    INDONESIA: /^(?:\+62|62)?\s*[0-9]{10,12}$/,
    SOUTH_KOREA: /^(?:\+82|82)?\s*1[0-9]{9}$/,
    JAPAN: /^(?:\+81|81)?\s*[0-9]{10}$/,
    CHINA: /^(?:\+86|86)?\s*1[0-9]{10}$/,
    GERMANY: /^(?:\+49|49)?\s*[0-9]{10,11}$/,
    FRANCE: /^(?:\+33|33)?\s*[0-9]{9}$/,
    ITALY: /^(?:\+39|39)?\s*[0-9]{10}$/,
    SPAIN: /^(?:\+34|34)?\s*[0-9]{9}$/,
    NETHERLANDS: /^(?:\+31|31)?\s*[0-9]{10}$/,
    BELGIUM: /^(?:\+32|32)?\s*[0-9]{9}$/,
    SWITZERLAND: /^(?:\+41|41)?\s*[0-9]{9}$/,
    SWEDEN: /^(?:\+46|46)?\s*[0-9]{9}$/,
    NORWAY: /^(?:\+47|47)?\s*[0-9]{8}$/,
    DENMARK: /^(?:\+45|45)?\s*[0-9]{8}$/,
    FINLAND: /^(?:\+358|358)?\s*[0-9]{9}$/,
    POLAND: /^(?:\+48|48)?\s*[0-9]{9}$/,
    GREECE: /^(?:\+30|30)?\s*[0-9]{10}$/,
    TURKEY: /^(?:\+90|90)?\s*5[0-9]{9}$/,
    EGYPT: /^(?:\+20|20)?\s*1[0-9]{9}$/,
    NIGERIA: /^(?:\+234|234)?\s*[0-9]{10}$/,
    SOUTH_AFRICA: /^(?:\+27|27)?\s*[0-9]{9}$/,
    BRAZIL: /^(?:\+55|55)?\s*[0-9]{10,11}$/,
    MEXICO: /^(?:\+52|52)?\s*[0-9]{10}$/,
    ARGENTINA: /^(?:\+54|54)?\s*[0-9]{10}$/,
    CHILE: /^(?:\+56|56)?\s*[0-9]{9}$/,
    COLOMBIA: /^(?:\+57|57)?\s*[0-9]{10}$/,
    PERU: /^(?:\+51|51)?\s*[0-9]{9}$/,
  },

  // URL validation
  URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
  URL_SAFE: /^[a-zA-Z0-9\-_.~]+$/,

  // Date patterns
  DATE: {
    YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    DD_MM_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    MM_DD_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
  },

  // Time patterns
  TIME: {
    HH_MM: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
    HH_MM_SS: /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
  },

  // DateTime pattern
  DATETIME: /^\d{4}-\d{2}-\d{2}\s\d{2}:\d{2}:\d{2}$/,

  // Zip/Postal code patterns
  ZIP_CODE: {
    BANGLADESH: /^\d{4}$/,
    USA: /^\d{5}(?:-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
    CANADA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
    AUSTRALIA: /^\d{4}$/,
    INDIA: /^\d{6}$/,
    PAKISTAN: /^\d{5}$/,
    SAUDI_ARABIA: /^\d{5}$/,
    UAE: /^\d{5}$/,
    SINGAPORE: /^\d{6}$/,
    MALAYSIA: /^\d{5}$/,
    THAILAND: /^\d{5}$/,
    VIETNAM: /^\d{6}$/,
    PHILIPPINES: /^\d{4}$/,
    INDONESIA: /^\d{5}$/,
    SOUTH_KOREA: /^\d{5}$/,
    JAPAN: /^\d{3}-\d{4}$/,
    CHINA: /^\d{6}$/,
    GERMANY: /^\d{5}$/,
    FRANCE: /^\d{5}$/,
    ITALY: /^\d{5}$/,
    SPAIN: /^\d{5}$/,
    NETHERLANDS: /^\d{4}\s?[A-Z]{2}$/,
    BELGIUM: /^\d{4}$/,
    SWITZERLAND: /^\d{4}$/,
    SWEDEN: /^\d{5}$/,
    NORWAY: /^\d{4}$/,
    DENMARK: /^\d{4}$/,
    FINLAND: /^\d{5}$/,
    POLAND: /^\d{2}-\d{3}$/,
    GREECE: /^\d{5}$/,
    TURKEY: /^\d{5}$/,
    EGYPT: /^\d{5}$/,
    NIGERIA: /^\d{6}$/,
    SOUTH_AFRICA: /^\d{4}$/,
    BRAZIL: /^\d{5}-\d{3}$/,
    MEXICO: /^\d{5}$/,
    ARGENTINA: /^\d{4}$/,
    CHILE: /^\d{7}$/,
    COLOMBIA: /^\d{6}$/,
    PERU: /^\d{5}$/,
  },

  // Username pattern
  USERNAME: /^[a-zA-Z0-9_]{3,30}$/,

  // Password patterns
  PASSWORD: {
    STRONG: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    MEDIUM: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/,
    WEAK: /^.{4,}$/,
  },

  // Slug pattern
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // UUID pattern
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,

  // Hex color pattern
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  // IP Address patterns
  IP_ADDRESS: {
    IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    IPV6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  },

  // MAC Address pattern
  MAC_ADDRESS: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,

  // Credit card patterns
  CREDIT_CARD: {
    VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MASTERCARD: /^5[1-5][0-9]{14}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{13}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    GENERIC: /^[0-9]{13,19}$/,
  },

  // Currency pattern
  CURRENCY: /^\$?(\d{1,3},?)+\d{1,2}(?:\.\d{2})?$/,

  // Percentage pattern
  PERCENTAGE: /^\d+(?:\.\d{1,2})?%$/,

  // Alphanumeric pattern
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,

  // Alphabetic pattern
  ALPHABETIC: /^[a-zA-Z]+$/,

  // Numeric pattern
  NUMERIC: /^\d+$/,

  // HTML tag pattern
  HTML_TAG: /^<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>$/,

  // Base64 pattern
  BASE64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/,

  // JWT pattern
  JWT: /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,

  // JSON pattern
  JSON: /^[\s\[\{]*(?:"[^"]*"|true|false|null|\d+)[\s\]\}]*$/,

  // XML pattern
  XML: /^<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>$/,

  // HTML entity pattern
  HTML_ENTITY: /&[a-zA-Z]+;/,

  // Unicode pattern
  UNICODE: /[\u{0000}-\u{10FFFF}]/u,

  // Whitespace pattern
  WHITESPACE: /^\s*$/,

  // Special character pattern
  SPECIAL_CHARACTER: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,

  // Analytics specific patterns
  ANALYTICS: {
    METRIC_NAME: /^[a-zA-Z][a-zA-Z0-9_]*$/,
    DIMENSION_NAME: /^[a-zA-Z][a-zA-Z0-9_]*$/,
    FILTER: /^[a-zA-Z0-9_\-]+$/,
  },
} as const;

// Helper function to test regex patterns
export const AnalyticsRegexTester = {
  testEmail: (value: string): boolean => AnalyticsRegex.EMAIL.test(value),
  testBangladeshPhone: (value: string): boolean => AnalyticsRegex.PHONE.BANGLADESH.test(value),
  testURL: (value: string): boolean => AnalyticsRegex.URL.test(value),
  testUUID: (value: string): boolean => AnalyticsRegex.UUID.test(value),
  testSlug: (value: string): boolean => AnalyticsRegex.SLUG.test(value),
  testPasswordStrong: (value: string): boolean => AnalyticsRegex.PASSWORD.STRONG.test(value),
  testUsername: (value: string): boolean => AnalyticsRegex.USERNAME.test(value),
  testIPV4: (value: string): boolean => AnalyticsRegex.IP_ADDRESS.IPV4.test(value),
  testMacAddress: (value: string): boolean => AnalyticsRegex.MAC_ADDRESS.test(value),
  testHexColor: (value: string): boolean => AnalyticsRegex.HEX_COLOR.test(value),
  testCreditCard: (value: string): boolean => AnalyticsRegex.CREDIT_CARD.GENERIC.test(value),
  testCurrency: (value: string): boolean => AnalyticsRegex.CURRENCY.test(value),
  testPercentage: (value: string): boolean => AnalyticsRegex.PERCENTAGE.test(value),
  testAlphanumeric: (value: string): boolean => AnalyticsRegex.ALPHANUMERIC.test(value),
  testNumeric: (value: string): boolean => AnalyticsRegex.NUMERIC.test(value),
  testJWT: (value: string): boolean => AnalyticsRegex.JWT.test(value),
  testBase64: (value: string): boolean => AnalyticsRegex.BASE64.test(value),
};
