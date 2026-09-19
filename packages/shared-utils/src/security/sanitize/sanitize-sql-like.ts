/**
 * Strip characters that commonly appear in SQL injection attempts (defensive, not a replacement for parameterized queries)
 * @module shared-utils/security/sanitize
 *
 * ⚠️ ALWAYS use parameterized queries / prepared statements.
 * This helper is only an extra barrier.
 */
const SQL_DANGEROUS = /(--|\/\*|\*\/|;|'|"|`)/g;

export function sanitizeSqlLike(input: string): string {
  if (!input) return '';
  return input.replace(SQL_DANGEROUS, '');
}
