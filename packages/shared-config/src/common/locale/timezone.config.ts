/**
 * Timezone configuration
 * @module shared-config/common/locale
 *
 * Values আসে shared-constants/common থেকে।
 */
import { TIMEZONE } from '@vubon/shared-constants/common';
import { getOptionalEnv } from '../env/env.helper';

export const TIMEZONE_CONFIG = Object.freeze({
  default: getOptionalEnv('DEFAULT_TIMEZONE', TIMEZONE.ASIA_DHAKA),
  supported: Object.freeze([TIMEZONE.ASIA_DHAKA, TIMEZONE.UTC] as const),
  fallback: TIMEZONE.UTC,
} as const);

export type TimezoneConfig = typeof TIMEZONE_CONFIG;
