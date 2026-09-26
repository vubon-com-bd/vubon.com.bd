/**
 * Voucher configuration
 * @module shared-config/business/cart
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const VOUCHER_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('VOUCHER_ENABLED', true),
  codeMinLength: getOptionalEnvInt('VOUCHER_CODE_MIN_LENGTH', 8),
  codeMaxLength: getOptionalEnvInt('VOUCHER_CODE_MAX_LENGTH', 32),
  minAmount: getOptionalEnvInt('VOUCHER_MIN_AMOUNT', 0),
  maxAmount: getOptionalEnvInt('VOUCHER_MAX_AMOUNT', 1000000),
  expiryDaysDefault: getOptionalEnvInt('VOUCHER_EXPIRY_DAYS', 730),
  partialRedeemDefault: getOptionalEnvBool('VOUCHER_PARTIAL_REDEEM', true),
  maxActivePerUser: getOptionalEnvInt('VOUCHER_MAX_ACTIVE_PER_USER', 20),
});
