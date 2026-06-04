/**
 * String Utilities - String manipulation and formatting
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce

 * @module shared-utils/formatter/string.util

 * RULES:
 * ✅ ONLY string manipulation helpers - NO business logic
 * ✅ NO SEO crawling, filesystem operations
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

// ✅ FIXED: Correct package name
import { STRING_CONFIG } from '@vubon/shared-constants';

// ==================== Constants (from shared-constants) ====================

// ✅ FIXED: Add fallbacks for missing constants
const SLUG_SEPARATOR = STRING_CONFIG?.SLUG_SEPARATOR || '-';
const DEFAULT_TRUNCATE_LENGTH = STRING_CONFIG?.DEFAULT_TRUNCATE_LENGTH || 100;
const DEFAULT_MAX_WORDS = STRING_CONFIG?.DEFAULT_MAX_WORDS || 50;
const DEFAULT_MASK_CHAR = STRING_CONFIG?.DEFAULT_MASK_CHAR || '*';
const TITLE_CASE_EXCEPTIONS = STRING_CONFIG?.TITLE_CASE_EXCEPTIONS || [
  'a', 'an', 'and', 'the', 'of', 'for', 'in', 'on', 'at', 'to',
  'by', 'with', 'without', 'or', 'nor', 'but', 'so', 'yet',
  'as', 'is', 'was', 'were', 'be', 'been', 'being',
] as const;

// Create a Set for O(1) lookup performance
const TITLE_CASE_EXCEPTIONS_SET = new Set(TITLE_CASE_EXCEPTIONS);

const SLUG_SPECIAL_CHARS_REGEX = STRING_CONFIG?.SLUG_SPECIAL_CHARS_REGEX || /[^\w\s-]/g;
const SLUG_MULTIPLE_SEPARATOR_REGEX = STRING_CONFIG?.SLUG_MULTIPLE_SEPARATOR_REGEX || /[\s_-]+/g;

// ==================== Private Helpers ====================

/**
 * Validate string input
 */
const validateString = (value: string): string => {
  if (typeof value !== 'string') {
    throw new Error(`Expected string, got ${typeof value}`);
  }
  return value;
};

// ==================== Slug and Case Conversion ====================

/**
 * Convert string to URL-friendly slug
 *
 * @param value - String to convert
 * @param separator - Separator character (default: '-')
 * @returns URL-friendly slug
 *
 * @example
 * slugify('Hello World!') // 'hello-world'
 * slugify('My Article Title') // 'my-article-title'
 * slugify('Product (new) 2024') // 'product-new-2024'
 */
export const slugify = (value: string, separator: string = SLUG_SEPARATOR): string => {
  const validValue = validateString(value);

  return validValue
    .toLowerCase()
    .trim()
    .replace(SLUG_SPECIAL_CHARS_REGEX, '')
    .replace(SLUG_MULTIPLE_SEPARATOR_REGEX, separator)
    .replace(new RegExp(`${separator}+`, 'g'), separator)
    .replace(new RegExp(`^${separator}|${separator}$`, 'g'), '');
};

/**
 * Convert string to kebab-case (lowercase with hyphens)
 *
 * @param value - String to convert
 * @returns kebab-case string
 *
 * @example
 * toKebabCase('Hello World') // 'hello-world'
 * toKebabCase('camelCaseString') // 'camel-case-string'
 */
export const toKebabCase = (value: string): string => {
  const validValue = validateString(value);

  return validValue
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

/**
 * Convert string to snake_case (lowercase with underscores)
 *
 * @param value - String to convert
 * @returns snake_case string
 *
 * @example
 * toSnakeCase('Hello World') // 'hello_world'
 * toSnakeCase('camelCaseString') // 'camel_case_string'
 */
export const toSnakeCase = (value: string): string => {
  const validValue = validateString(value);

  return validValue
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
};

/**
 * Convert string to camelCase (lowercase first letter, then capital)
 *
 * @param value - String to convert
 * @returns camelCase string
 *
 * @example
 * toCamelCase('hello-world') // 'helloWorld'
 * toCamelCase('Hello World') // 'helloWorld'
 */
export const toCamelCase = (value: string): string => {
  const validValue = validateString(value);

  const result = validValue
    .trim()
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());

  return result;
};

/**
 * Convert string to PascalCase (capital first letter, then capital)
 *
 * @param value - String to convert
 * @returns PascalCase string
 *
 * @example
 * toPascalCase('hello-world') // 'HelloWorld'
 * toPascalCase('Hello World') // 'HelloWorld'
 */
export const toPascalCase = (value: string): string => {
  const camel = toCamelCase(value);
  if (camel.length === 0) return camel;
  return camel.charAt(0).toUpperCase() + camel.slice(1);
};

/**
 * Convert string to constant case (UPPER_SNAKE_CASE)
 *
 * @param value - String to convert
 * @returns UPPER_SNAKE_CASE string
 *
 * @example
 * toConstantCase('Hello World') // 'HELLO_WORLD'
 */
export const toConstantCase = (value: string): string => {
  const validValue = validateString(value);

  return validValue
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toUpperCase();
};

/**
 * Convert string to dot.case
 *
 * @param value - String to convert
 * @returns dot.case string
 */
export const toDotCase = (value: string): string => {
  const validValue = validateString(value);

  return validValue
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1.$2')
    .replace(/[\s_-]+/g, '.')
    .toLowerCase();
};

/**
 * Convert string to path case (forward slash separated)
 *
 * @param value - String to convert
 * @returns path/case string
 */
export const toPathCase = (value: string): string => {
  const validValue = validateString(value);

  return validValue
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1/$2')
    .replace(/[\s_-]+/g, '/')
    .toLowerCase();
};

// ==================== Capitalization ====================

/**
 * Capitalize first letter of string
 *
 * @param value - String to capitalize
 * @returns Capitalized string
 *
 * @example
 * capitalize('hello world') // 'Hello world'
 * capitalize('HELLO') // 'Hello'
 */
export const capitalize = (value: string): string => {
  const validValue = validateString(value);
  if (validValue.length === 0) return validValue;
  return validValue.charAt(0).toUpperCase() + validValue.slice(1).toLowerCase();
};

/**
 * Capitalize first letter of each word
 *
 * @param value - String to capitalize
 * @returns String with each word capitalized
 *
 * @example
 * capitalizeWords('hello world') // 'Hello World'
 * capitalizeWords('HELLO WORLD') // 'Hello World'
 */
export const capitalizeWords = (value: string): string => {
  const validValue = validateString(value);
  return validValue
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

/**
 * Convert to title case (exceptions not capitalized unless at start)
 *
 * @param value - String to convert
 * @returns Title case string
 *
 * @example
 * toTitleCase('the lord of the rings') // 'The Lord of the Rings'
 */
export const toTitleCase = (value: string): string => {
  const validValue = validateString(value);

  return validValue
    .toLowerCase()
    .split(' ')
    .map((word, index) => {
      // ✅ FIXED: Using Set for type-safe includes check
      if (index === 0 || !TITLE_CASE_EXCEPTIONS_SET.has(word as typeof TITLE_CASE_EXCEPTIONS[number])) {
        return capitalize(word);
      }
      return word;
    })
    .join(' ');
};

/**
 * Convert to sentence case (first letter capital, rest lower)
 *
 * @param value - String to convert
 * @returns Sentence case string
 *
 * @example
 * toSentenceCase('hello WORLD. how ARE you?') // 'Hello world. how are you?'
 */
export const toSentenceCase = (value: string): string => {
  const validValue = validateString(value);

  // Split by sentence boundaries
  const sentences = validValue.toLowerCase().split(/([.!?]+\s+)/);

  const result = sentences.map((sentence, index) => {
    if (index % 2 === 0 && sentence.length > 0) {
      return sentence.charAt(0).toUpperCase() + sentence.slice(1);
    }
    return sentence;
  });

  return result.join('');
};

// ==================== Truncation ====================

/**
 * Truncate string to maximum length
 *
 * @param value - String to truncate
 * @param maxLength - Maximum length (default: 100)
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated string
 *
 * @example
 * truncate('Very long string...', 10) // 'Very lo...'
 */
export const truncate = (
  value: string,
  maxLength: number = DEFAULT_TRUNCATE_LENGTH,
  suffix: string = '...'
): string => {
  const validValue = validateString(value);
  const validMaxLength = Math.max(1, maxLength);

  if (validValue.length <= validMaxLength) return validValue;
  if (validMaxLength <= suffix.length) return suffix;

  return validValue.slice(0, validMaxLength - suffix.length) + suffix;
};

/**
 * Truncate string by word count
 *
 * @param value - String to truncate
 * @param maxWords - Maximum number of words (default: 50)
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated string
 *
 * @example
 * truncateWords('This is a long sentence with many words', 5) // 'This is a long sentence...'
 */
export const truncateWords = (
  value: string,
  maxWords: number = DEFAULT_MAX_WORDS,
  suffix: string = '...'
): string => {
  const validValue = validateString(value);
  const validMaxWords = Math.max(1, maxWords);

  const words = validValue.split(' ');
  if (words.length <= validMaxWords) return validValue;

  return words.slice(0, validMaxWords).join(' ') + suffix;
};

// ==================== Masking ====================

/**
 * Mask string with asterisks (or custom character)
 *
 * @param value - String to mask
 * @param start - Number of characters to keep at start
 * @param end - Number of characters to keep at end
 * @param maskChar - Character to use for masking (default: '*')
 * @returns Masked string
 *
 * @example
 * maskString('hello@example.com', 2, 10) // 'he*******com'
 * maskString('0123456789', 3, 2) // '012*****89'
 * maskString('secret', 1, 1) // 's***t'
 */
export const maskString = (
  value: string,
  start: number = 0,
  end: number = 0,
  maskChar: string = DEFAULT_MASK_CHAR
): string => {
  const validValue = validateString(value);
  const validStart = Math.max(0, Math.min(start, validValue.length));
  const validEnd = Math.max(0, Math.min(end, validValue.length - validStart));

  if (validStart + validEnd >= validValue.length) {
    return maskChar.repeat(validValue.length);
  }

  const visibleStart = validValue.slice(0, validStart);
  const visibleEnd = validValue.slice(-validEnd);
  const maskLength = validValue.length - validStart - validEnd;

  return visibleStart + maskChar.repeat(maskLength) + visibleEnd;
};

/**
 * Mask email address for privacy
 *
 * @param email - Email address to mask
 * @returns Masked email
 *
 * @example
 * maskEmail('user@example.com') // 'u***r@example.com'
 */
export const maskEmail = (email: string): string => {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;

  const maskedUsername = maskString(username, 1, 1);
  return `${maskedUsername}@${domain}`;
};

/**
 * Mask phone number for privacy
 *
 * @param phone - Phone number to mask
 * @returns Masked phone number
 *
 * @example
 * maskPhone('+8801712345678') // '+880*****5678'
 */
export const maskPhone = (phone: string): string => {
  return maskString(phone, 4, 4);
};

// ==================== Additional Helpers ====================

/**
 * Reverse a string
 *
 * @param value - String to reverse
 * @returns Reversed string
 */
export const reverse = (value: string): string => {
  const validValue = validateString(value);
  return validValue.split('').reverse().join('');
};

/**
 * Check if string is empty or only whitespace
 *
 * @param value - String to check
 * @returns True if blank
 */
export const isBlank = (value: string): boolean => {
  return !value || value.trim().length === 0;
};

/**
 * Check if string is not empty
 *
 * @param value - String to check
 * @returns True if not blank
 */
export const isNotBlank = (value: string): boolean => {
  return !isBlank(value);
};

// ==================== Type Exports ====================

export type CaseFormat = 'camel' | 'pascal' | 'snake' | 'kebab' | 'constant' | 'dot' | 'path';
