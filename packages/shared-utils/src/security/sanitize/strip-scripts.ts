/**
 * Strip <script> and <style> blocks — DEPRECATED
 * @module shared-utils/security/sanitize
 *
 * ⚠️ DEPRECATED: Regex-based tag removal is unsafe (ReDoS, incomplete matching).
 *
 * USE INSTEAD:
 *   - `sanitizeHtml()` from './sanitize-html' — full-escape approach
 *   - DOMPurify / sanitize-html npm package for selective allow-list
 *
 * This function is kept as a thin shim that just delegates to sanitizeHtml.
 *
 * @deprecated Use `sanitizeHtml` instead.
 */
import { sanitizeHtml } from './sanitize-html';

export function stripScripts(input: string): string {
  return sanitizeHtml(input);
}
