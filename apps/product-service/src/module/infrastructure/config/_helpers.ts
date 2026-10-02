/**
 * Config helpers — thin wrappers around shared-config env helpers.
 * @module product-service/infrastructure/config
 */
import {
  getEnv,
  getOptionalEnv,
  getOptionalEnvInt,
} from '@vubon/shared-config/common/env';

export { getEnv, getOptionalEnv, getOptionalEnvInt };

/**
 * Boolean env reader — "true"/"1"/"yes" → true.
 */
export function getOptionalEnvBool(key: string, fallback: boolean): boolean {
  const raw = getOptionalEnv(key, fallback ? 'true' : 'false') as string;
  const lowered = String(raw).toLowerCase();
  if (lowered === 'true' || lowered === '1' || lowered === 'yes' || lowered === 'on') return true;
  if (lowered === 'false' || lowered === '0' || lowered === 'no' || lowered === 'off') return false;
  return fallback;
}
