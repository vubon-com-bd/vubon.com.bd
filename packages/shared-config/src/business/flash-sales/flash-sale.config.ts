/**
 * Flash sale configuration
 * @module shared-config/business/flash-sales
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const FLASH_SALE_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('FLASH_SALE_ENABLED', true),
  maxActive: getOptionalEnvInt('FLASH_SALE_MAX_ACTIVE', 50),
  minDurationMinutes: getOptionalEnvInt('FLASH_SALE_MIN_DURATION', 15),
  maxDurationHours: getOptionalEnvInt('FLASH_SALE_MAX_DURATION', 168),
  minDiscountPercent: getOptionalEnvInt('FLASH_SALE_MIN_DISCOUNT', 1),
  maxDiscountPercent: getOptionalEnvInt('FLASH_SALE_MAX_DISCOUNT', 90),
  maxProductsPerSale: getOptionalEnvInt('FLASH_SALE_MAX_PRODUCTS', 5000),
  autoStart: getOptionalEnvBool('FLASH_SALE_AUTO_START', true),
  autoEnd: getOptionalEnvBool('FLASH_SALE_AUTO_END', true),
  notifyParticipants: getOptionalEnvBool('FLASH_SALE_NOTIFY', true),
});
