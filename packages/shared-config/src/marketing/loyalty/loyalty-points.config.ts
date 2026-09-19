/**
 * Loyalty points configuration
 * @module shared-config/marketing/loyalty
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const LOYALTY_POINTS_CONFIG = Object.freeze({
  expiryEnabled: getOptionalEnvBool('LOYALTY_POINTS_EXPIRY', true),
  expiryDays: getOptionalEnvInt('LOYALTY_POINTS_EXPIRY_DAYS', 365),
  earnOnSignup: getOptionalEnvBool('LOYALTY_EARN_ON_SIGNUP', true),
  earnOnFirstOrder: getOptionalEnvBool('LOYALTY_EARN_ON_FIRST_ORDER', true),
  earnOnReview: getOptionalEnvBool('LOYALTY_EARN_ON_REVIEW', true),
  earnOnReferral: getOptionalEnvBool('LOYALTY_EARN_ON_REFERRAL', true),
  earnOnBirthday: getOptionalEnvBool('LOYALTY_EARN_ON_BIRTHDAY', true),
  redeemOnCheckout: getOptionalEnvBool('LOYALTY_REDEEM_ON_CHECKOUT', true),
  maxBalance: getOptionalEnvInt('LOYALTY_MAX_BALANCE', 1000000),
  allowNegative: false,
});
