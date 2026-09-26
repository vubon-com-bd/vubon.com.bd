/**
 * Locale configuration
 * @module shared-config/common/locale
 *
 * Values আসে shared-constants/common থেকে।
 */
import { LOCALE } from '@vubon/shared-constants/common';
import { getOptionalEnv } from '../env/env.helper';

export const LOCALE_CONFIG = Object.freeze({
  default: getOptionalEnv('DEFAULT_LOCALE', LOCALE.BN_BD),
  supported: Object.freeze([LOCALE.BN_BD, LOCALE.EN_US, LOCALE.EN_GB] as const),
  fallback: LOCALE.EN_US,
} as const);

export type LocaleConfig = typeof LOCALE_CONFIG;
