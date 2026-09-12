/**
 * Sanitize Helper — XSS & injection prevention.
 * @module shared-utils/common/helper/sanitize
 *
 * ⚠️ For rich HTML, use DOMPurify (client) or sanitize-html (server).
 * These helpers are for plain-text contexts.
 */

/**
 * Escapes HTML special characters — safe for text interpolation.
 */
export const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

/**
 * Strips ALL `<...>` constructs in a single linear pass.
 * O(n) — ReDoS-safe. Also removes `<script` without `>`.
 */
export const stripHtml = (input: string): string => {
  let out = '';
  let i = 0;
  while (i < input.length) {
    const c = input.charCodeAt(i);
    if (c === 60 /* < */) {
      // skip to next '>' or end
      while (i < input.length && input.charCodeAt(i) !== 62 /* > */) i++;
      if (i < input.length) i++; // skip '>'
    } else {
      out += input[i];
      i++;
    }
  }
  return out;
};

/**
 * Removes dangerous URI schemes (javascript:, data:, vbscript:).
 */
export const sanitizeUrl = (url: string): string => {
  const trimmed = url.trim();
  const lowered = trimmed.toLowerCase().slice(0, 20);
  if (
    lowered.startsWith('javascript:') ||
    lowered.startsWith('data:') ||
    lowered.startsWith('vbscript:') ||
    lowered.startsWith('file:')
  ) {
    return '';
  }
  return trimmed;
};

/**
 * Recursively escapes string fields.
 */
export const sanitizeObject = <T extends Record<string, unknown>>(obj: T): T => {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      result[key] = escapeHtml(value);
    } else if (value && typeof value === 'object' && !Array.isArray(value)) {
      result[key] = sanitizeObject(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }
  return result as T;
};
