/**
 * Currency configuration
 * @module shared-config/common/locale
 *
 * Values আসে shared-constants/common থেকে।
 */
import { CURRENCY } from '@vubon/shared-constants/common';
import { getOptionalEnv } from '../env/env.helper';

export const CURRENCY_CONFIG = Object.freeze({
  default: getOptionalEnv('DEFAULT_CURRENCY', CURRENCY.BDT),
  supported: Object.freeze([CURRENCY.BDT, CURRENCY.USD, CURRENCY.EUR, CURRENCY.GBP] as const),
  fallback: CURRENCY.USD,
} as const);

export type CurrencyConfig = typeof CURRENCY_CONFIG;
