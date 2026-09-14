/**
 * Sanitize a value for safe shell-like contexts (non-executing)
 * @module shared-utils/security/sanitize
 *
 * ⚠️ Prefer using shell-escape libraries for actual shell execution.
 */
const SHELL_UNSAFE = /[;&|`$(){}[\]<>*?!\\'"\s]/g;

export function sanitizeShell(input: string): string {
  if (!input) return '';
  return input.replace(SHELL_UNSAFE, '');
}
