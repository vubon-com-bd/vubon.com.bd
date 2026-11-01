import type { CsrfConfig } from './csrf.types';
import { DEFAULT_CSRF_CONFIG, readCsrfCookie } from './csrf-token';

/** Build the CSRF header object (or empty if no token). */
export function buildCsrfHeader(config: CsrfConfig = DEFAULT_CSRF_CONFIG): Record<string, string> {
  const token = readCsrfCookie(config);
  if (!token) return {};
  return { [config.headerName]: token };
}
