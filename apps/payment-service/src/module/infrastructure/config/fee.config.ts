import { getOptionalEnvInt } from '@vubon/shared-config/common';
import { PAYMENT_GATEWAY } from '@vubon/shared-constants/business/payment';

export const FEE_CONFIG = Object.freeze({
  platformFeePercent: getOptionalEnvInt('FEE_PLATFORM_PERCENT', 2),
  gatewayFees: Object.freeze({
    [PAYMENT_GATEWAY.STRIPE]: getOptionalEnvInt('FEE_STRIPE_PERCENT', 3),
    [PAYMENT_GATEWAY.PAYPAL]: getOptionalEnvInt('FEE_PAYPAL_PERCENT', 4),
    [PAYMENT_GATEWAY.BKASH]: getOptionalEnvInt('FEE_BKASH_PERCENT', 2),
    [PAYMENT_GATEWAY.NAGAD]: getOptionalEnvInt('FEE_NAGAD_PERCENT', 2),
    [PAYMENT_GATEWAY.MANUAL]: 0,
  }),
} as const);
