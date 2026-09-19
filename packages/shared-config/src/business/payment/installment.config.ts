/**
 * Installment payment configuration
 * @module shared-config/business/payment
 */
import { getOptionalEnvBool, getOptionalEnvInt } from '../../common/env/env.helper';

export const INSTALLMENT_CONFIG = Object.freeze({
  enabled: getOptionalEnvBool('INSTALLMENT_ENABLED', false),
  minAmount: getOptionalEnvInt('INSTALLMENT_MIN_AMOUNT', 1000),
  maxAmount: getOptionalEnvInt('INSTALLMENT_MAX_AMOUNT', 1000000),
  minTenureMonths: getOptionalEnvInt('INSTALLMENT_MIN_TENURE', 3),
  maxTenureMonths: getOptionalEnvInt('INSTALLMENT_MAX_TENURE', 24),
  defaultTenureMonths: getOptionalEnvInt('INSTALLMENT_DEFAULT_TENURE', 6),
  interestRatePercent: getOptionalEnvInt('INSTALLMENT_INTEREST_RATE', 0),
  requireApproval: getOptionalEnvBool('INSTALLMENT_REQUIRE_APPROVAL', true),
  processingFeePercent: getOptionalEnvInt('INSTALLMENT_FEE_PERCENT', 2),
});
