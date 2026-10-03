import { getOptionalEnvInt } from './_helpers.js';
import { BRAND } from '@vubon/shared-constants/business/product';

const BRAND_CONFIG = Object.freeze({
  NAME_MIN_LENGTH: BRAND.NAME_MIN_LENGTH,
  NAME_MAX_LENGTH: BRAND.NAME_MAX_LENGTH,
  LOGO_MAX_SIZE_MB: BRAND.LOGO_MAX_SIZE_MB,
  CACHE_TTL_SECONDS: getOptionalEnvInt('BRAND_CACHE_TTL', 600),
} as const);

export type BrandConfig = typeof BRAND_CONFIG;
export const brandConfig = BRAND_CONFIG;
export function getBrandConfig(): BrandConfig { return BRAND_CONFIG; }
