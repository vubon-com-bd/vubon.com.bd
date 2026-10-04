/**
 * Payment infra config — re-export from shared-config for local imports
 * @module payment-service/infrastructure/config
 */
import { PAYMENT_CONFIG } from '@vubon/shared-config/business';
import { PAYMENT_GATEWAY_CONFIG } from '@vubon/shared-config/business';
import { REFUND_CONFIG } from '@vubon/shared-config/business';

export const PAYMENT_INFRA_CONFIG = Object.freeze({
  payment: PAYMENT_CONFIG,
  gateway: PAYMENT_GATEWAY_CONFIG,
  refund: REFUND_CONFIG,
} as const);

export { PAYMENT_CONFIG, PAYMENT_GATEWAY_CONFIG, REFUND_CONFIG };
