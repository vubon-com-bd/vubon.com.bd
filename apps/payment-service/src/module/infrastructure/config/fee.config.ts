/**
 * Fee Infra Configuration
 * @module payment-service/infrastructure/config
 */
import { getOptionalEnvInt } from '@vubon/shared-config/common';

export const FEE_INFRA_CONFIG = Object.freeze({
  vatRateBps: getOptionalEnvInt('FEE_VAT_BPS', 1500), // 15% in bps
  stripeFeeBps: getOptionalEnvInt('FEE_STRIPE_BPS', 250),
  bkashFeeBps: getOptionalEnvInt('FEE_BKASH_BPS', 180),
  nagadFeeBps: getOptionalEnvInt('FEE_NAGAD_BPS', 150),
  sslcommerzFeeBps: getOptionalEnvInt('FEE_SSLCOMMERZ_BPS', 230),
  paypalFeeBps: getOptionalEnvInt('FEE_PAYPAL_BPS', 340),
  defaultFeeBps: getOptionalEnvInt('FEE_DEFAULT_BPS', 250),
  codFlatFee: getOptionalEnvInt('FEE_COD_FLAT', 20),
});

export type FeeInfraConfig = typeof FEE_INFRA_CONFIG;
