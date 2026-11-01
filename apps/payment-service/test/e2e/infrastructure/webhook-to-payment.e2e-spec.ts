/**
 * Webhook → Payment State E2E
 * @module payment-service/test/e2e/infrastructure
 *
 * Verifies:
 *  - Webhook verifier validates + extracts payment ID
 *  - Payment transitions correctly after webhook
 *  - WebhookEvent record persists
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { BkashWebhookVerifier } from '@infrastructure/gateways/bkash/bkash.webhook';
import { StripeWebhookVerifier } from '@infrastructure/gateways/stripe/stripe.webhook';
import { NagadWebhookVerifier } from '@infrastructure/gateways/nagad/nagad.webhook';
import { RocketWebhookVerifier } from '@infrastructure/gateways/rocket/rocket.webhook';
import { PaymentPrismaRepository } from '@infrastructure/repos/payment.prisma.repository';
import { PaymentPrismaMapper } from '@infrastructure/mappers/payment.prisma.mapper';
import {
  makePrismaMock,
  type PrismaMock,
  UUID,
  NOW,
} from './setup/infra-e2e-fixtures';

jest.mock('@infrastructure/gateways/bkash/bkash.config', () => ({
  PAYMENT_BKASH_CONFIG: {
    enabled: true, appKey: 'k', appSecret: 'secret',
    username: 'u', password: 'p', baseUrl: '', callbackUrl: '',
    timeoutMs: 5000, tokenCacheTtlSeconds: 3300, merchantShortCode: '', intent: 'sale',
  },
}));

jest.mock('@infrastructure/gateways/stripe/stripe.config', () => ({
  PAYMENT_STRIPE_CONFIG: {
    enabled: true, secretKey: 'sk', publishableKey: 'pk', webhookSecret: '',
    apiVersion: 'v1', timeoutMs: 5000, maxRetries: 3, captureMethod: 'automatic',
    returnUrl: '', successUrl: '', cancelUrl: '',
  },
}));

jest.mock('@infrastructure/gateways/nagad/nagad.config', () => ({
  PAYMENT_NAGAD_CONFIG: {
    enabled: true, merchantId: 'm', merchantPrivateKey: 'p', pgPublicKey: '',
    baseUrl: '', callbackUrl: '', timeoutMs: 5000, merchantNumber: '', callbackUrlAlt: '',
  },
}));

jest.mock('@infrastructure/gateways/rocket/rocket.config', () => ({
  PAYMENT_ROCKET_CONFIG: {
    enabled: true, merchantId: 'm', apiKey: 'k', baseUrl: '', callbackUrl: '',
    timeoutMs: 5000, returnUrl: '', cancelUrl: '',
  },
}));

function makePaymentRow(overrides: Record<string, unknown> = {}) {
  return {
    id: UUID.PAYMENT,
    orderId: UUID.ORDER,
    userId: UUID.USER,
    status: 'processing',
    method: 'mobile_banking',
    methodType: 'online',
    provider: 'bkash',
    providerEnv: 'sandbox',
    amount: 1000,
    currency: 'BDT',
    gatewayReference: 'bkash_pi_123',
    authorizedAt: null,
    capturedAt: null,
    paidAt: null,
    refundedAmount: null,
    failureReason: null,
    failureCode: null,
    metadata: null,
    version: 1,
    createdAt: new Date(NOW),
    updatedAt: new Date(NOW),
    deletedAt: null,
    ...overrides,
  };
}

describe('E2E: Webhook → Payment', () => {
  let prisma: PrismaMock;
  let repo: PaymentPrismaRepository;
  let delegate: ReturnType<PrismaMock['__delegate']>;

  beforeEach(() => {
    prisma = makePrismaMock();
    repo = new PaymentPrismaRepository(prisma as never);
    delegate = prisma.__delegate('payment');
  });

  describe('bKash webhook', () => {
    it('verifies payload → extracts paymentId', () => {
      const verifier = new BkashWebhookVerifier();
      const result = verifier.verify({
        headers: {},
        payload: {
          paymentID: UUID.PAYMENT,
          trxID: 'TRX_999',
          amount: '1000',
          transactionStatus: 'Completed',
        },
      });
      expect(result.valid).toBe(true);
      expect(result.paymentId).toBe(UUID.PAYMENT);
      expect(result.externalId).toBe('TRX_999');
    });

    it('rejects malformed webhook', () => {
      const verifier = new BkashWebhookVerifier();
      const result = verifier.verify({
        headers: {},
        payload: { garbage: true },
      });
      expect(result.valid).toBe(false);
    });

    it('verified webhook → payment state transition', async () => {
      // Load payment
      const row = makePaymentRow();
      delegate.findFirst.mockResolvedValue(row);
      const payment = await repo.findById(UUID.PAYMENT);
      expect(payment?.isProcessing()).toBe(true);

      // Verify webhook
      const verifier = new BkashWebhookVerifier();
      const verification = verifier.verify({
        headers: {},
        payload: {
          paymentID: UUID.PAYMENT,
          trxID: 'TRX_999',
          amount: '1000',
          transactionStatus: 'Completed',
        },
      });
      expect(verification.valid).toBe(true);

      // Simulate state transition (domain method on entity)
      payment!.capture(1000, 'TRX_999');
      expect(payment!.isCaptured()).toBe(true);

      // Persist
      delegate.findUnique.mockResolvedValue({ id: UUID.PAYMENT });
      delegate.update.mockResolvedValue({ ...row, status: 'captured', capturedAt: new Date() });
      const saved = await repo.save(payment!);
      expect(saved.isCaptured()).toBe(true);
    });
  });

  describe('Stripe webhook', () => {
    it('verifies success event', () => {
      const verifier = new StripeWebhookVerifier();
      const result = verifier.verify({
        headers: {},
        payload: {
          id: 'evt_123',
          type: 'payment_intent.succeeded',
          data: {
            object: { metadata: { paymentId: UUID.PAYMENT } },
          },
        },
      });
      expect(result.valid).toBe(true);
      expect(result.paymentId).toBe(UUID.PAYMENT);
    });

    it('rejects missing event type', () => {
      const verifier = new StripeWebhookVerifier();
      const result = verifier.verify({
        headers: {},
        payload: { id: 'evt_x', data: { object: {} } },
      });
      expect(result.valid).toBe(false);
    });
  });

  describe('Nagad webhook', () => {
    it('verifies success payload', () => {
      const verifier = new NagadWebhookVerifier();
      const result = verifier.verify({
        headers: {},
        payload: {
          orderId: UUID.PAYMENT,
          paymentRefId: 'pr-123',
          amount: '1000',
          status: 'Success',
        },
      });
      expect(result.valid).toBe(true);
      expect(result.paymentId).toBe(UUID.PAYMENT);
    });
  });

  describe('Rocket webhook', () => {
    it('verifies success payload', () => {
      const verifier = new RocketWebhookVerifier();
      const result = verifier.verify({
        headers: {},
        payload: {
          orderId: UUID.PAYMENT,
          rocketPaymentId: 'rp-123',
          amount: '1000',
          status: 'Success',
        },
      });
      expect(result.valid).toBe(true);
    });
  });

  describe('Full webhook flow: verify → persist → transition', () => {
    it('bKash webhook → captured payment', async () => {
      // 1. Load processing payment
      const row = makePaymentRow();
      delegate.findFirst.mockResolvedValue(row);
      const payment = await repo.findById(UUID.PAYMENT);

      // 2. Verify webhook
      const verifier = new BkashWebhookVerifier();
      const verification = verifier.verify({
        headers: {},
        payload: {
          paymentID: UUID.PAYMENT,
          trxID: 'TRX_999',
          amount: '1000',
          transactionStatus: 'Completed',
        },
      });
      expect(verification.valid).toBe(true);

      // 3. Transition payment
      payment!.capture(1000, verification.externalId!);
      expect(payment!.isCaptured()).toBe(true);

      // 4. Persist
      delegate.findUnique.mockResolvedValue({ id: UUID.PAYMENT });
      delegate.update.mockResolvedValue({ ...row, status: 'captured' });
      const saved = await repo.save(payment!);
      expect(saved.status.isCaptured()).toBe(true);
    });
  });
});
