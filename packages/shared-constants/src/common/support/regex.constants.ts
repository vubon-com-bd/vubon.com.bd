/**
 * Support Regular Expression Constants
 * Contains all regex patterns for support management
 */

export const SupportRegex = {
  // Email validation pattern
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number patterns
  PHONE: {
    BANGLADESH: /^(?:\+880|880|0)1[3-9]\d{8}$/,
    INTERNATIONAL: /^\+(?:[0-9] ?){6,14}[0-9]$/,
  },

  // URL validation
  URL: /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,

  // UUID validation
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/,

  // Ticket number pattern
  TICKET_NUMBER: /^TICKET-[A-Z0-9]{8,12}$/,

  // Date patterns
  DATE: {
    YYYY_MM_DD: /^\d{4}-\d{2}-\d{2}$/,
    DD_MM_YYYY: /^\d{2}\/\d{2}\/\d{4}$/,
    ISO8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
  },

  // Time patterns
  TIME: {
    HH_MM: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/,
    HH_MM_SS: /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
    HH_MM_SS_SSS: /^([0-1][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]\.[0-9]{3}$/,
  },

  // IP Address patterns
  IP_ADDRESS: {
    IPV4: /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    IPV6: /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
  },

  // Alphanumeric pattern
  ALPHANUMERIC: /^[a-zA-Z0-9]+$/,

  // Password validation pattern
  // At least 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Zip/Postal code patterns
  ZIP_CODE: {
    BANGLADESH: /^\d{4}$/,
    USA: /^\d{5}(?:-\d{4})?$/,
    UK: /^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/,
    CANADA: /^[A-Z]\d[A-Z] \d[A-Z]\d$/,
  },

  // Credit card patterns
  CREDIT_CARD: {
    VISA: /^4[0-9]{12}(?:[0-9]{3})?$/,
    MASTERCARD: /^5[1-5][0-9]{14}$/,
    AMERICAN_EXPRESS: /^3[47][0-9]{13}$/,
    DISCOVER: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
    GENERIC: /^[0-9]{13,19}$/,
  },

  // HTML tag pattern
  HTML_TAG: /^<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>$/,

  // Slug pattern
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // Hex color pattern
  HEX_COLOR: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,

  // Support specific patterns
  SUPPORT: {
    INCIDENT_ID: /^INC-[A-Z0-9]{8,12}$/,
    PROBLEM_ID: /^PRB-[A-Z0-9]{8,12}$/,
    CHANGE_ID: /^CHG-[A-Z0-9]{8,12}$/,
    RELEASE_ID: /^REL-[A-Z0-9]{8,12}$/,
  },
} as const;

// Helper function to test regex patterns
export const SupportRegexTester = {
  testEmail: (value: string): boolean => SupportRegex.EMAIL.test(value),
  testBangladeshPhone: (value: string): boolean => SupportRegex.PHONE.BANGLADESH.test(value),
  testURL: (value: string): boolean => SupportRegex.URL.test(value),
  testUUID: (value: string): boolean => SupportRegex.UUID.test(value),
  testTicketNumber: (value: string): boolean => SupportRegex.TICKET_NUMBER.test(value),
  testDateISO: (value: string): boolean => SupportRegex.DATE.ISO8601.test(value),
  testTimeHHMM: (value: string): boolean => SupportRegex.TIME.HH_MM.test(value),
  testIPV4: (value: string): boolean => SupportRegex.IP_ADDRESS.IPV4.test(value),
  testAlphanumeric: (value: string): boolean => SupportRegex.ALPHANUMERIC.test(value),
  testPassword: (value: string): boolean => SupportRegex.PASSWORD.test(value),
  testSlug: (value: string): boolean => SupportRegex.SLUG.test(value),
  testHexColor: (value: string): boolean => SupportRegex.HEX_COLOR.test(value),
};
