/**
 * Vendor settlement configuration
 * @module shared-config/business/vendor
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const SETTLEMENT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('SETTLEMENT_ENABLED', true),
  cycleDays: getOptionalEnvInt('SETTLEMENT_CYCLE_DAYS', 7),
  autoSettle: getOptionalEnvBool('SETTLEMENT_AUTO', false),
  holdOnDispute: getOptionalEnvBool('SETTLEMENT_HOLD_ON_DISPUTE', true),
  minSettlementAmount: getOptionalEnvInt('SETTLEMENT_MIN_AMOUNT', 100),
  gracePeriodDays: getOptionalEnvInt('SETTLEMENT_GRACE_DAYS', 3),
});
