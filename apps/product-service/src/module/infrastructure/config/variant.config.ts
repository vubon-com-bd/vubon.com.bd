import { getOptionalEnvInt, getOptionalEnvBool } from './_helpers.js';
import { VARIANT } from '@vubon/shared-constants/business/product';

const VARIANT_CONFIG = Object.freeze({
  MAX_VARIANTS_PER_PRODUCT: VARIANT.MAX_VARIANTS_PER_PRODUCT,
  MAX_OPTIONS_PER_VARIANT: VARIANT.MAX_OPTIONS_PER_VARIANT,
  SKU_MAX_LENGTH: VARIANT.SKU_MAX_LENGTH,
  CACHE_TTL_SECONDS: getOptionalEnvInt('VARIANT_CACHE_TTL', 300),
  AUTO_GENERATE_MATRIX: getOptionalEnvBool('VARIANT_AUTO_MATRIX', true),
} as const);

export type VariantConfig = typeof VARIANT_CONFIG;
export const variantConfig = VARIANT_CONFIG;
export function getVariantConfig(): VariantConfig { return VARIANT_CONFIG; }
