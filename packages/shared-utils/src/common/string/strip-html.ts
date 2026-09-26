/**
 * Strip HTML tags from string (bounded, non-catastrophic regex)
 * @module shared-utils/common/string
 *
 * ⚠️ NOT a security sanitizer. For display-only text extraction.
 * For untrusted HTML, use a proper sanitizer (DOMPurify server-side).
 *
 * @example
 * stripHtml('<p>Hello <b>World</b></p>')  // 'Hello World'
 */
export function stripHtml(value: string): string {
  if (!value) return '';
  // Bound iteration to prevent ReDoS: max 10000 tags, max 500 chars per tag
  let result = '';
  let i = 0;
  const maxLen = value.length;
  let removed = 0;
  const MAX_TAGS = 10000;

  while (i < maxLen && removed < MAX_TAGS) {
    const ch = value.charCodeAt(i);
    if (ch === 60 /* < */) {
      const closing = value.indexOf('>', i + 1);
      if (closing === -1 || closing - i > 500) {
        result += value[i];
        i++;
        continue;
      }
      i = closing + 1;
      removed++;
    } else {
      result += value[i];
      i++;
    }
  }

  // Append remainder
  if (i < maxLen) result += value.slice(i);
  return result;
}
