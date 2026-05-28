/**
 * Sanitize Utilities - XSS prevention and input cleaning
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-utils/src/validation/sanitize.util
 * 
 * RULES:
 * ✅ ONLY input sanitization and cleaning - NO business logic
 * ✅ NO DOM access, browser-only APIs
 * ✅ Pure functions with deterministic output
 * ✅ Named exports only
 * ✅ No side effects or external API calls
 */

import validator from 'validator';

// ==================== Constants (Enterprise grade) ====================

// HTML/XML patterns
const HTML_TAG_REGEX = /<[^>]*>/g;
const HTML_COMMENT_REGEX = /<!--[\s\S]*?-->/g;
const SCRIPT_TAG_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
const STYLE_TAG_REGEX = /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi;
const IFRAME_TAG_REGEX = /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi;
const OBJECT_TAG_REGEX = /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi;
const EMBED_TAG_REGEX = /<embed\b[^>]*>/gi;
const FORM_TAG_REGEX = /<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi;

// Dangerous protocols
const JAVASCRIPT_PROTOCOL_REGEX = /javascript:/gi;
const VBSCRIPT_PROTOCOL_REGEX = /vbscript:/gi;
const DATA_PROTOCOL_REGEX = /data:/gi;

// Event handlers
const ON_EVENT_REGEX = /\bon\w+\s*=/gi;

// SQL injection patterns (basic - use parameterized queries in production)
const SQL_SPECIAL_CHARS = /['"\\%_]/g;

// Unicode normalization form
const NORMALIZATION_FORM = 'NFKC';

// ==================== HTML Sanitization ====================

/**
 * Strip all HTML tags from string
 * 
 * @param value - Input string
 * @returns String with HTML tags removed
 * 
 * @example
 * stripHtml('<p>Hello</p>') // 'Hello'
 */
export const stripHtml = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(HTML_TAG_REGEX, '');
};

/**
 * Remove HTML comments
 * 
 * @param value - Input string
 * @returns String with HTML comments removed
 */
export const stripHtmlComments = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(HTML_COMMENT_REGEX, '');
};

/**
 * Remove script tags and their content (XSS prevention)
 * 
 * @param value - Input string
 * @returns String with script tags removed
 */
export const removeScripts = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(SCRIPT_TAG_REGEX, '');
};

/**
 * Remove style tags and their content
 * 
 * @param value - Input string
 * @returns String with style tags removed
 */
export const removeStyles = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(STYLE_TAG_REGEX, '');
};

/**
 * Remove iframe tags (potential XSS vectors)
 * 
 * @param value - Input string
 * @returns String with iframe tags removed
 */
export const removeIframes = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(IFRAME_TAG_REGEX, '');
};

/**
 * Remove object/embed tags (potential XSS vectors)
 * 
 * @param value - Input string
 * @returns String with object/embed tags removed
 */
export const removeObjectTags = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  let cleaned = value.replace(OBJECT_TAG_REGEX, '');
  cleaned = cleaned.replace(EMBED_TAG_REGEX, '');
  return cleaned;
};

/**
 * Remove form tags (to prevent CSRF via injected forms)
 * 
 * @param value - Input string
 * @returns String with form tags removed
 */
export const removeForms = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(FORM_TAG_REGEX, '');
};

/**
 * Remove JavaScript protocol from URLs
 * 
 * @param value - Input string
 * @returns String with javascript: protocol removed
 */
export const removeJavaScriptProtocol = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  let cleaned = value.replace(JAVASCRIPT_PROTOCOL_REGEX, '');
  cleaned = cleaned.replace(VBSCRIPT_PROTOCOL_REGEX, '');
  return cleaned;
};

/**
 * Remove data protocol from URLs (can be used for XSS)
 * 
 * @param value - Input string
 * @returns String with data: protocol removed
 */
export const removeDataProtocol = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(DATA_PROTOCOL_REGEX, '');
};

/**
 * Remove event handlers (onclick, onload, onerror, etc.)
 * 
 * @param value - Input string
 * @returns String with event handlers removed
 */
export const removeEventHandlers = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(ON_EVENT_REGEX, '');
};

/**
 * Comprehensive HTML sanitization (combines all HTML sanitizers)
 * 
 * @param value - Input string
 * @returns Fully sanitized string
 */
export const sanitizeHtml = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  
  let sanitized = value;
  sanitized = removeScripts(sanitized);
  sanitized = removeStyles(sanitized);
  sanitized = removeIframes(sanitized);
  sanitized = removeObjectTags(sanitized);
  sanitized = removeForms(sanitized);
  sanitized = removeJavaScriptProtocol(sanitized);
  sanitized = removeDataProtocol(sanitized);
  sanitized = removeEventHandlers(sanitized);
  sanitized = stripHtml(sanitized);
  sanitized = stripHtmlComments(sanitized);
  
  return sanitized.trim();
};

// ==================== String Sanitization ====================

/**
 * Escape special characters for HTML (XSS prevention)
 * Converts <, >, &, ", ' to HTML entities
 * 
 * @param value - Input string
 * @returns HTML-escaped string
 * 
 * @example
 * escapeHtml('<script>alert("xss")</script>') 
 * // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
export const escapeHtml = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return validator.escape(value);
};

/**
 * Unescape HTML entities back to normal characters
 * 
 * @param value - Input string with HTML entities
 * @returns Unescaped string
 */
export const unescapeHtml = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return validator.unescape(value);
};

/**
 * Trim whitespace from both ends
 * 
 * @param value - Input string
 * @returns Trimmed string
 */
export const trim = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.trim();
};

/**
 * Trim whitespace from left end only
 * 
 * @param value - Input string
 * @returns Left-trimmed string
 */
export const trimLeft = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.trimStart();
};

/**
 * Trim whitespace from right end only
 * 
 * @param value - Input string
 * @returns Right-trimmed string
 */
export const trimRight = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.trimEnd();
};

/**
 * Trim and normalize whitespace (collapse multiple spaces into one)
 * 
 * @param value - Input string
 * @returns Normalized string with single spaces
 * 
 * @example
 * normalizeWhitespace('Hello   World  !') // 'Hello World !'
 */
export const normalizeWhitespace = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.trim().replace(/\s+/g, ' ');
};

/**
 * Remove all whitespace (spaces, tabs, newlines)
 * 
 * @param value - Input string
 * @returns String without any whitespace
 */
export const removeWhitespace = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.replace(/\s/g, '');
};

/**
 * Truncate string to maximum length with suffix
 * 
 * @param value - Input string
 * @param maxLength - Maximum allowed length
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated string
 */
export const truncate = (value: string, maxLength: number, suffix: string = '...'): string => {
  if (!value || typeof value !== 'string') return '';
  if (maxLength <= 0) return '';
  if (value.length <= maxLength) return value;
  
  const truncatedLength = maxLength - suffix.length;
  if (truncatedLength <= 0) return suffix;
  
  return value.slice(0, truncatedLength) + suffix;
};

/**
 * Truncate string at word boundary
 * 
 * @param value - Input string
 * @param maxLength - Maximum allowed length
 * @param suffix - Suffix to add when truncated (default: '...')
 * @returns Truncated string at word boundary
 */
export const truncateWords = (value: string, maxLength: number, suffix: string = '...'): string => {
  if (!value || typeof value !== 'string') return '';
  if (value.length <= maxLength) return value;
  
  const truncated = value.slice(0, maxLength - suffix.length);
  const lastSpace = truncated.lastIndexOf(' ');
  
  if (lastSpace === -1) return truncated + suffix;
  return truncated.slice(0, lastSpace) + suffix;
};

// ==================== SQL Injection Prevention ====================

/**
 * Escape SQL special characters (basic prevention)
 * WARNING: Use parameterized queries in production!
 * This is only for legacy/edge cases
 * 
 * @param value - Input string
 * @returns SQL-escaped string
 */
export const escapeSql = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value
    .replace(/'/g, "''")
    .replace(/\\/g, '\\\\')
    .replace(/\%/g, '\\%')
    .replace(/\_/g, '\\_');
};

/**
 * Detect potential SQL injection patterns
 * 
 * @param value - Input string
 * @returns True if suspicious SQL pattern detected
 */
export const hasSqlInjectionPattern = (value: string): boolean => {
  if (!value || typeof value !== 'string') return false;
  
  const sqlPatterns = [
    /(\bSELECT\b.*\bFROM\b)/i,
    /(\bINSERT\b.*\bINTO\b)/i,
    /(\bUPDATE\b.*\bSET\b)/i,
    /(\bDELETE\b.*\bFROM\b)/i,
    /(\bDROP\b.*\bTABLE\b)/i,
    /(\bUNION\b.*\bSELECT\b)/i,
    /(--)/,
    /(;)/,
    /('.*OR.*'.*=.*')/i,
  ];
  
  return sqlPatterns.some(pattern => pattern.test(value));
};

// ==================== Normalization ====================

/**
 * Normalize string to NFKC form (Unicode normalization)
 * 
 * @param value - Input string
 * @returns Normalized string
 */
export const normalizeUnicode = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.normalize(NORMALIZATION_FORM);
};

/**
 * Remove diacritics (accents) from string
 * 
 * @param value - Input string
 * @returns String without diacritics
 * 
 * @example
 * removeDiacritics('café') // 'cafe'
 * removeDiacritics('München') // 'Munchen'
 */
export const removeDiacritics = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

/**
 * Convert to lowercase and trim (for normalization)
 * 
 * @param value - Input string
 * @returns Lowercase trimmed string
 */
export const normalizeCase = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.toLowerCase().trim();
};

/**
 * Convert to uppercase
 * 
 * @param value - Input string
 * @returns Uppercase string
 */
export const toUpperCase = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value.toUpperCase();
};

/**
 * Capitalize first letter of string
 * 
 * @param value - Input string
 * @returns Capitalized string
 */
export const capitalize = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  if (value.length === 0) return value;
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

/**
 * Capitalize first letter of each word
 * 
 * @param value - Input string
 * @returns Title-cased string
 */
export const capitalizeWords = (value: string): string => {
  if (!value || typeof value !== 'string') return '';
  return value
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

// ==================== Combined Sanitization ====================

/**
 * Sanitization options interface
 */
export interface SanitizationOptions {
  stripHtml: boolean;
  escapeHtml: boolean;
  trim: boolean;
  normalizeWhitespace: boolean;
  removeScripts: boolean;
  removeEventHandlers: boolean;
}

/**
 * Comprehensive string sanitization with options
 * 
 * @param value - Input string
 * @param options - Sanitization options
 * @returns Sanitized string
 */
export const sanitize = (value: string, options: Partial<SanitizationOptions> = {}): string => {
  if (!value || typeof value !== 'string') return '';
  
  let result = value;
  
  const defaultOptions: SanitizationOptions = {
    stripHtml: true,
    escapeHtml: false,
    trim: true,
    normalizeWhitespace: true,
    removeScripts: true,
    removeEventHandlers: true,
  };
  
  const opts = { ...defaultOptions, ...options };
  
  if (opts.removeScripts) {
    result = removeScripts(result);
  }
  
  if (opts.removeEventHandlers) {
    result = removeEventHandlers(result);
  }
  
  if (opts.stripHtml) {
    result = stripHtml(result);
  }
  
  if (opts.normalizeWhitespace) {
    result = normalizeWhitespace(result);
  }
  
  if (opts.trim) {
    result = trim(result);
  }
  
  if (opts.escapeHtml) {
    result = escapeHtml(result);
  }
  
  return result;
};

// ==================== Type Exports ====================

export type { SanitizationOptions };
