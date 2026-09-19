/**
 * Product configuration
 * @module shared-config/business/product
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const PRODUCT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('PRODUCT_ENABLED', true),
  maxImagesPerProduct: getOptionalEnvInt('PRODUCT_MAX_IMAGES', 20),
  maxVariantsPerProduct: getOptionalEnvInt('PRODUCT_MAX_VARIANTS', 100),
  maxTagsPerProduct: getOptionalEnvInt('PRODUCT_MAX_TAGS', 50),
  maxDescriptionLength: getOptionalEnvInt('PRODUCT_MAX_DESCRIPTION_LENGTH', 5000),
  autoApproveProducts: getOptionalEnvBool('PRODUCT_AUTO_APPROVE', false),
  requireApproval: getOptionalEnvBool('PRODUCT_REQUIRE_APPROVAL', true),
  allowDigitalProducts: getOptionalEnvBool('PRODUCT_DIGITAL_ENABLED', true),
  allowPhysicalProducts: getOptionalEnvBool('PRODUCT_PHYSICAL_ENABLED', true),
  slugUnique: getOptionalEnvBool('PRODUCT_SLUG_UNIQUE', true),
  lowStockThreshold: getOptionalEnvInt('PRODUCT_LOW_STOCK_THRESHOLD', 10),
});
