/**
 * Payment Infrastructure Configs — Barrel + Aggregate
 * @module payment-service/infrastructure/config
 */
export * from './payment.config.js';
export * from './gateway.config.js';
export * from './bkash.config.js';
export * from './nagad.config.js';
export * from './rocket.config.js';
export * from './stripe.config.js';
export * from './paypal.config.js';
export * from './sslcommerz.config.js';
export * from './aamarpay.config.js';
export * from './crypto.config.js';
export * from './refund.config.js';
export * from './subscription.config.js';
export * from './invoice.config.js';
export * from './fee.config.js';
export * from './retry.config.js';
export * from './webhook.config.js';

// Aggregate — single import for all payment configs
import { PAYMENT_CONFIG } from './payment.config.js';
import { GATEWAY_CONFIG } from './gateway.config.js';
import { BKASH_INFRA_CONFIG } from './bkash.config.js';
import { NAGAD_INFRA_CONFIG } from './nagad.config.js';
import { ROCKET_INFRA_CONFIG } from './rocket.config.js';
import { STRIPE_INFRA_CONFIG } from './stripe.config.js';
import { PAYPAL_INFRA_CONFIG } from './paypal.config.js';
import { SSLCOMMERZ_INFRA_CONFIG } from './sslcommerz.config.js';
import { AAMARPAY_INFRA_CONFIG } from './aamarpay.config.js';
import { CRYPTO_INFRA_CONFIG } from './crypto.config.js';
import { REFUND_INFRA_CONFIG } from './refund.config.js';
import { SUBSCRIPTION_INFRA_CONFIG } from './subscription.config.js';
import { INVOICE_INFRA_CONFIG } from './invoice.config.js';
import { FEE_INFRA_CONFIG } from './fee.config.js';
import { RETRY_INFRA_CONFIG } from './retry.config.js';
import { WEBHOOK_INFRA_CONFIG } from './webhook.config.js';

export const PAYMENT_INFRA_CONFIG = Object.freeze({
  payment: PAYMENT_CONFIG,
  gateway: GATEWAY_CONFIG,
  bkash: BKASH_INFRA_CONFIG,
  nagad: NAGAD_INFRA_CONFIG,
  rocket: ROCKET_INFRA_CONFIG,
  stripe: STRIPE_INFRA_CONFIG,
  paypal: PAYPAL_INFRA_CONFIG,
  sslcommerz: SSLCOMMERZ_INFRA_CONFIG,
  aamarpay: AAMARPAY_INFRA_CONFIG,
  crypto: CRYPTO_INFRA_CONFIG,
  refund: REFUND_INFRA_CONFIG,
  subscription: SUBSCRIPTION_INFRA_CONFIG,
  invoice: INVOICE_INFRA_CONFIG,
  fee: FEE_INFRA_CONFIG,
  retry: RETRY_INFRA_CONFIG,
  webhook: WEBHOOK_INFRA_CONFIG,
} as const);

export type PaymentInfraConfig = typeof PAYMENT_INFRA_CONFIG;
