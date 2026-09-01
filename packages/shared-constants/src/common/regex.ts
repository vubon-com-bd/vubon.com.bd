/**
 * Regular Expressions
 * বাংলাদেশের কনটেক্সট অনুযায়ী রেগুলার এক্সপ্রেশন
 */
export const REGEX = {
  // Email validation
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

  // Phone number (Bangladesh)
  PHONE: /^(?:\+880|880|0)(?:1[3-9]\d{8})$/,

  // Password (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number)
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,

  // Slug (URL friendly)
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,

  // Bengali characters
  BANGLA: /[\u0980-\u09FF]/,

  // NID (National ID - 10 or 17 digits)
  NID: /^[0-9]{10,17}$/,

  // Birth Registration Number (17 digits)
  BIRTH_REG: /^[0-9]{17}$/,

  // bKash number (11 digits starting with 017)
  BKASH_NUMBER: /^(?:\+880|880|0)?(?:17\d{8})$/,

  // Nagad number (11 digits starting with 017)
  NAGAD_NUMBER: /^(?:\+880|880|0)?(?:17\d{8})$/,

  // Rocket number (11 digits starting with 018)
  ROCKET_NUMBER: /^(?:\+880|880|0)?(?:18\d{8})$/,

  // Postal code (4 digits)
  POSTAL_CODE: /^[0-9]{4}$/,

  // URL
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,

  // UUID
  UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,

  // Only numbers
  ONLY_NUMBERS: /^[0-9]+$/,

  // Only letters (Bengali + English)
  ONLY_LETTERS: /^[a-zA-Z\u0980-\u09FF\s]+$/,
} as const;

export type RegexKey = keyof typeof REGEX;
