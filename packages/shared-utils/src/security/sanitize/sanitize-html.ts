/**
 * Sanitize HTML by allowing only a small safe subset
 * @module shared-utils/security/sanitize
 *
 * ⚠️ If you need untrusted rich HTML, use a dedicated library (DOMPurify on client).
 * This helper is intentionally conservative.
 */
import { escapeHtml } from '../../common/string/escape-html';

export function sanitizeHtml(input: string): string {
  if (!input) return '';
  // Step 1: remove full script blocks
  const withoutScripts = input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Step 2: remove event handlers (onclick=, etc.)
  const withoutHandlers = withoutScripts.replace(/\son\w+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '');
  // Step 3: strip all remaining tags, then escape
  const stripped = withoutHandlers.replace(/<[^>]*>/g, '');
  return escapeHtml(stripped);
}
