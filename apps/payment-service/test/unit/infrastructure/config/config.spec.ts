/**
 * Payment Infrastructure Config — Smoke Tests
 * @module payment-service/test/unit/infrastructure/config
 *
 * Verifies:
 *  - All config modules load without errors
 *  - Default values are correct
 *  - Aggregate `PAYMENT_INFRA_CONFIG` contains all sub-configs
 */
import { describe, it, expect } from '@jest/globals';

// ─── Individual configs ─────────────────────
import { PAYMENT_CONFIG } from '@infrastructure/config/payment.config';
import { GATEWAY_CONFIG } from '@infrastructure/config/gateway.config';
import { BKASH_INFRA_CONFIG } from '@infrastructure/config/bkash.config';
import { NAGAD_INFRA_CONFIG } from '@infrastructure/config/nagad.config';
import { ROCKET_INFRA_CONFIG } from '@infrastructure/config/rocket.config';
import { STRIPE_INFRA_CONFIG } from '@infrastructure/config/stripe.config';
import { PAYPAL_INFRA_CONFIG } from '@infrastructure/config/paypal.config';
import { SSLCOMMERZ_INFRA_CONFIG } from '@infrastructure/config/sslcommerz.config';
import { AAMARPAY_INFRA_CONFIG } from '@infrastructure/config/aamarpay.config';
import { CRYPTO_INFRA_CONFIG } from '@infrastructure/config/crypto.config';
import { REFUND_INFRA_CONFIG } from '@infrastructure/config/refund.config';
import { SUBSCRIPTION_INFRA_CONFIG } from '@infrastructure/config/subscription.config';
import { INVOICE_INFRA_CONFIG } from '@infrastructure/config/invoice.config';
import { FEE_INFRA_CONFIG } from '@infrastructure/config/fee.config';
import { RETRY_INFRA_CONFIG } from '@infrastructure/config/retry.config';
import { WEBHOOK_INFRA_CONFIG } from '@infrastructure/config/webhook.config';
import { PAYMENT_INFRA_CONFIG } from '@infrastructure/config';

describe('Payment Infrastructure Config', () => {
  describe('PAYMENT_CONFIG', () => {
    it('loads and has expected defaults', () => {
      expect(PAYMENT_CONFIG.enabled).toBe(true);
      expect(PAYMENT_CONFIG.defaultCurrency).toBe('BDT');
      expect(PAYMENT_CONFIG.minAmount).toBeGreaterThan(0);
      expect(PAYMENT_CONFIG.maxAmount).toBeGreaterThan(PAYMENT_CONFIG.minAmount);
      expect(PAYMENT_CONFIG.currencyDecimals).toBe(2);
    });

    it('is frozen', () => {
      expect(Object.isFrozen(PAYMENT_CONFIG)).toBe(true);
    });
  });

  describe('GATEWAY_CONFIG', () => {
    it('has supported gateways list', () => {
      expect(GATEWAY_CONFIG.supportedGateways).toContain('bkash');
      expect(GATEWAY_CONFIG.supportedGateways).toContain('stripe');
      expect(GATEWAY_CONFIG.supportedGateways).toContain('cod');
      expect(GATEWAY_CONFIG.supportedGateways.length).toBeGreaterThan(5);
    });

    it('has environment', () => {
      expect(['sandbox', 'production']).toContain(GATEWAY_CONFIG.environment);
    });
  });

  describe('Gateway-specific configs', () => {
    it('BKASH_INFRA_CONFIG loads', () => {
      expect(BKASH_INFRA_CONFIG).toBeDefined();
      expect(typeof BKASH_INFRA_CONFIG.enabled).toBe('boolean');
      expect(BKASH_INFRA_CONFIG.timeoutMs).toBeGreaterThan(0);
    });

    it('NAGAD_INFRA_CONFIG loads', () => {
      expect(NAGAD_INFRA_CONFIG).toBeDefined();
      expect(typeof NAGAD_INFRA_CONFIG.enabled).toBe('boolean');
    });

    it('ROCKET_INFRA_CONFIG loads', () => {
      expect(ROCKET_INFRA_CONFIG).toBeDefined();
      expect(typeof ROCKET_INFRA_CONFIG.enabled).toBe('boolean');
    });

    it('STRIPE_INFRA_CONFIG loads', () => {
      expect(STRIPE_INFRA_CONFIG).toBeDefined();
      expect(typeof STRIPE_INFRA_CONFIG.enabled).toBe('boolean');
      expect(STRIPE_INFRA_CONFIG.apiVersion).toBeDefined();
    });

    it('PAYPAL_INFRA_CONFIG loads', () => {
      expect(PAYPAL_INFRA_CONFIG).toBeDefined();
      expect(typeof PAYPAL_INFRA_CONFIG.enabled).toBe('boolean');
      expect(PAYPAL_INFRA_CONFIG.landingPage).toBeDefined();
    });

    it('SSLCOMMERZ_INFRA_CONFIG loads', () => {
      expect(SSLCOMMERZ_INFRA_CONFIG).toBeDefined();
      expect(typeof SSLCOMMERZ_INFRA_CONFIG.enabled).toBe('boolean');
    });

    it('AAMARPAY_INFRA_CONFIG loads', () => {
      expect(AAMARPAY_INFRA_CONFIG).toBeDefined();
      expect(typeof AAMARPAY_INFRA_CONFIG.enabled).toBe('boolean');
    });

    it('CRYPTO_INFRA_CONFIG loads', () => {
      expect(CRYPTO_INFRA_CONFIG).toBeDefined();
      expect(typeof CRYPTO_INFRA_CONFIG.enabled).toBe('boolean');
      expect(CRYPTO_INFRA_CONFIG.confirmationBlocks).toBeGreaterThan(0);
    });
  });

  describe('Business-specific configs', () => {
    it('REFUND_INFRA_CONFIG loads', () => {
      expect(REFUND_INFRA_CONFIG).toBeDefined();
      expect(REFUND_INFRA_CONFIG.windowDays).toBeGreaterThan(0);
      expect(typeof REFUND_INFRA_CONFIG.partialRefundAllowed).toBe('boolean');
    });

    it('SUBSCRIPTION_INFRA_CONFIG loads', () => {
      expect(SUBSCRIPTION_INFRA_CONFIG).toBeDefined();
      expect(SUBSCRIPTION_INFRA_CONFIG.gracePeriodDays).toBeGreaterThanOrEqual(0);
      expect(SUBSCRIPTION_INFRA_CONFIG.maxTrialDays).toBeGreaterThan(0);
    });

    it('INVOICE_INFRA_CONFIG loads', () => {
      expect(INVOICE_INFRA_CONFIG).toBeDefined();
      expect(INVOICE_INFRA_CONFIG.prefix).toBe('INV');
      expect(INVOICE_INFRA_CONFIG.dueDaysDefault).toBeGreaterThan(0);
    });
  });

  describe('Operational configs', () => {
    it('FEE_INFRA_CONFIG loads', () => {
      expect(FEE_INFRA_CONFIG).toBeDefined();
      expect(FEE_INFRA_CONFIG.vatRateBps).toBeGreaterThan(0);
      expect(FEE_INFRA_CONFIG.stripeFeeBps).toBeGreaterThan(0);
      expect(FEE_INFRA_CONFIG.codFlatFee).toBeGreaterThanOrEqual(0);
    });

    it('RETRY_INFRA_CONFIG loads', () => {
      expect(RETRY_INFRA_CONFIG).toBeDefined();
      expect(RETRY_INFRA_CONFIG.maxAttempts).toBeGreaterThan(0);
      expect(RETRY_INFRA_CONFIG.circuitBreakerThreshold).toBeGreaterThan(0);
    });

    it('WEBHOOK_INFRA_CONFIG loads', () => {
      expect(WEBHOOK_INFRA_CONFIG).toBeDefined();
      expect(WEBHOOK_INFRA_CONFIG.retryMaxAttempts).toBeGreaterThan(0);
      expect(WEBHOOK_INFRA_CONFIG.toleranceSeconds).toBeGreaterThan(0);
    });
  });

  describe('PAYMENT_INFRA_CONFIG aggregate', () => {
    it('contains all sub-configs', () => {
      expect(PAYMENT_INFRA_CONFIG).toBeDefined();
      expect(PAYMENT_INFRA_CONFIG.payment).toBe(PAYMENT_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.gateway).toBe(GATEWAY_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.bkash).toBe(BKASH_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.nagad).toBe(NAGAD_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.rocket).toBe(ROCKET_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.stripe).toBe(STRIPE_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.paypal).toBe(PAYPAL_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.sslcommerz).toBe(SSLCOMMERZ_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.aamarpay).toBe(AAMARPAY_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.crypto).toBe(CRYPTO_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.refund).toBe(REFUND_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.subscription).toBe(SUBSCRIPTION_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.invoice).toBe(INVOICE_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.fee).toBe(FEE_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.retry).toBe(RETRY_INFRA_CONFIG);
      expect(PAYMENT_INFRA_CONFIG.webhook).toBe(WEBHOOK_INFRA_CONFIG);
    });

    it('is frozen', () => {
      expect(Object.isFrozen(PAYMENT_INFRA_CONFIG)).toBe(true);
    });
  });
});
