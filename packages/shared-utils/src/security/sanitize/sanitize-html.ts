/**
 * Sanitize HTML by escaping ALL HTML special characters.
 * @module shared-utils/security/sanitize
 *
 * Strategy: full escape (no regex-based tag stripping — those are unsafe).
 * Every '<', '>', '&', '"', "'" is encoded to its HTML entity.
 *
 * ⚠️ If you need to ALLOW a subset of HTML, use a dedicated library
 * like DOMPurify (client) or sanitize-html (server).
 *
 * @example
 * sanitizeHtml('<script>alert(1)</script>')
 * // '&lt;script&gt;alert(1)&lt;/script&gt;'
 */
export function sanitizeHtml(input: string): string {
  if (!input) return '';

  let output = '';
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    switch (ch) {
      case 38 /* & */:
        output += '&amp;';
        break;
      case 60 /* < */:
        output += '&lt;';
        break;
      case 62 /* > */:
        output += '&gt;';
        break;
      case 34 /* " */:
        output += '&quot;';
        break;
      case 39 /* ' */:
        output += '&#39;';
        break;
      case 47 /* / */:
        output += '&#x2F;';
        break;
      default:
        output += input[i];
    }
  }
  return output;
}
