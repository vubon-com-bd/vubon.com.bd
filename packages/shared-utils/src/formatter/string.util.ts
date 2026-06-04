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

import { STRING_CONFIG } from '@vubon/shared-constants';

// ==================== Constants ====================

const SLUG_SEPARATOR = STRING_CONFIG?.SLUG_SEPARATOR || '-';
const DEFAULT_TRUNCATE_LENGTH = STRING_CONFIG?.DEFAULT_TRUNCATE_LENGTH || 100;
const DEFAULT_MAX_WORDS = STRING_CONFIG?.DEFAULT_MAX_WORDS || 50;
const DEFAULT_MASK_CHAR = STRING_CONFIG?.DEFAULT_MASK_CHAR || '*';

// ✅ FIXED: Use simple string array
const TITLE_CASE_EXCEPTIONS: string[] = [
  'a', 'an', 'and', 'the', 'of', 'for', 'in', 'on', 'at', 'to',
  'by', 'with', 'without', 'or', 'nor', 'but', 'so', 'yet',
  'as', 'is', 'was', 'were', 'be', 'been', 'being',
];

const SLUG_SPECIAL_CHARS_REGEX = STRING_CONFIG?.SLUG_SPECIAL_CHARS_REGEX || /[^\w\s-]/g;
const SLUG_MULTIPLE_SEPARATOR_REGEX = STRING_CONFIG?.SLUG_MULTIPLE_SEPARATOR_REGEX || /[\s_-]+/g;

// ==================== Private Helpers ====================

const validateString = (value: string): string => {
  if (typeof value !== 'string') {
    throw new Error(`Expected string, got ${typeof value}`);
  }
  return value;
};

// ==================== Slug and Case Conversion ====================

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

export const toKebabCase = (value: string): string => {
  const validValue = validateString(value);
  return validValue
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const toSnakeCase = (value: string): string => {
  const validValue = validateString(value);
  return validValue
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();
};

export const toCamelCase = (value: string): string => {
  const validValue = validateString(value);
  const result = validValue
    .trim()
    .replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
  return result;
};

export const toPascalCase = (value: string): string => {
  const camel = toCamelCase(value);
  if (camel.length === 0) return camel;
  return camel.charAt(0).toUpperCase() + camel.slice(1);
};

export const toConstantCase = (value: string): string => {
  const validValue = validateString(value);
  return validValue
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toUpperCase();
};

export const toDotCase = (value: string): string => {
  const validValue = validateString(value);
  return validValue
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1.$2')
    .replace(/[\s_-]+/g, '.')
    .toLowerCase();
};

export const toPathCase = (value: string): string => {
  const validValue = validateString(value);
  return validValue
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1/$2')
    .replace(/[\s_-]+/g, '/')
    .toLowerCase();
};

// ==================== Capitalization ====================

export const capitalize = (value: string): string => {
  const validValue = validateString(value);
  if (validValue.length === 0) return validValue;
  return validValue.charAt(0).toUpperCase() + validValue.slice(1).toLowerCase();
};

export const capitalizeWords = (value: string): string => {
  const validValue = validateString(value);
  return validValue
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ');
};

// ✅ FIXED: toTitleCase - properly handled
export const toTitleCase = (value: string): string => {
  const validValue = validateString(value);
  const words = validValue.toLowerCase().split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    if (i === 0 || !TITLE_CASE_EXCEPTIONS.includes(word)) {
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
  }

  return words.join(' ');
};

export const toSentenceCase = (value: string): string => {
  const validValue = validateString(value);
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

export const maskEmail = (email: string): string => {
  const [username, domain] = email.split('@');
  if (!username || !domain) return email;
  const maskedUsername = maskString(username, 1, 1);
  return `${maskedUsername}@${domain}`;
};

export const maskPhone = (phone: string): string => {
  return maskString(phone, 4, 4);
};

// ==================== Additional Helpers ====================

export const reverse = (value: string): string => {
  const validValue = validateString(value);
  return validValue.split('').reverse().join('');
};

export const isBlank = (value: string): boolean => {
  return !value || value.trim().length === 0;
};

export const isNotBlank = (value: string): boolean => {
  return !isBlank(value);
};

// ==================== Type Exports ====================

export type CaseFormat = 'camel' | 'pascal' | 'snake' | 'kebab' | 'constant' | 'dot' | 'path';
