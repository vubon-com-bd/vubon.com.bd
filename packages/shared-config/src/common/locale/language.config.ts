/**
 * Language configuration
 * @module shared-config/common/locale
 *
 * Values আসে shared-constants/common থেকে।
 */
import { LANGUAGE } from '@vubon/shared-constants/common';
import { getOptionalEnv } from '../env/env.helper';

export const LANGUAGE_CONFIG = Object.freeze({
  default: getOptionalEnv('DEFAULT_LANGUAGE', LANGUAGE.BN),
  supported: Object.freeze([LANGUAGE.BN, LANGUAGE.EN] as const),
  fallback: LANGUAGE.EN,
  rtlLanguages: Object.freeze([LANGUAGE.AR] as const),
} as const);

export type LanguageConfig = typeof LANGUAGE_CONFIG;
