import { getOptionalEnvInt, getOptionalEnvBool } from '@vubon/shared-config/common';

export const VARIANT_CONFIG = Object.freeze({
  maxPerProduct: getOptionalEnvInt('VARIANT_MAX_PER_PRODUCT', 50),
  skuPrefix: 'VAR',
  autoGenerateSku: getOptionalEnvBool('VARIANT_AUTO_GENERATE_SKU', true),
} as const);
