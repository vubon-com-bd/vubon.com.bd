/**
 * Refund configuration
 * @module shared-config/business/payment
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const REFUND_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('REFUND_ENABLED', true),
  windowDays: getOptionalEnvInt('REFUND_WINDOW_DAYS', 90),
  partialRefundAllowed: getOptionalEnvBool('REFUND_PARTIAL_ALLOWED', true),
  autoApprove: getOptionalEnvBool('REFUND_AUTO_APPROVE', false),
  autoApproveThreshold: getOptionalEnvInt('REFUND_AUTO_APPROVE_THRESHOLD', 1000),
  requireReason: getOptionalEnvBool('REFUND_REQUIRE_REASON', true),
  notifyCustomer: getOptionalEnvBool('REFUND_NOTIFY_CUSTOMER', true),
  processDays: getOptionalEnvInt('REFUND_PROCESS_DAYS', 7),
});
