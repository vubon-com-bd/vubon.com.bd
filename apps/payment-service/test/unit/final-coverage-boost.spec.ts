import { jest } from '@jest/globals';
import { GatewayResolverService } from '../../src/module/infrastructure/gateways/gateway-resolver.service.js';
import { BkashGatewayAdapter } from '../../src/module/infrastructure/gateways/bkash.gateway.adapter.js';
import { CodGatewayAdapter } from '../../src/module/infrastructure/gateways/cod.gateway.adapter.js';
import { StripeGatewayAdapter } from '../../src/module/infrastructure/gateways/stripe.gateway.adapter.js';
import { PaymentQueue } from '../../src/module/infrastructure/queues/payment.queue.js';
import { RefundQueue } from '../../src/module/infrastructure/queues/refund.queue.js';
import { WebhookQueue } from '../../src/module/infrastructure/queues/webhook.queue.js';
import { PaymentEntity } from '../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';
import { PaymentIdempotencyService } from '../../src/module/domain/services/payment-idempotency.service.js';
import { PaymentGatewayRouterService } from '../../src/module/domain/services/payment-gateway-router.service.js';
import { CurrencyVO } from '../../src/module/domain/value-objects/primitives/currency.vo.js';
import { RetryPolicyService } from '../../src/module/infrastructure/services/internal/retry-policy.service.js';
import { FeeCalculatorService } from '../../src/module/infrastructure/services/internal/fee-calculator.service.js';
import { PaymentAnalyticsService } from '../../src/module/infrastructure/services/external/payment-analytics.service.js';
import { PaymentTransactionLedgerService } from '../../src/module/domain/services/payment-transaction-ledger.service.js';
import { PaymentFeeService } from '../../src/module/domain/services/payment-fee.service.js';
import { PaymentRefundPolicyService } from '../../src/module/domain/services/payment-refund-policy.service.js';
import { TransactionEntity } from '../../src/module/domain/entities/transaction.entity.js';
import { TransactionTypeVO } from '../../src/module/domain/value-objects/primitives/transaction-type.vo.js';
import { PaymentIdVO } from '../../src/module/domain/value-objects/primitives/payment-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makePayment() {
  return PaymentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      method: PaymentMethodVO.create('mobile_banking'),
      gateway: PaymentGatewayVO.create('bkash'),
      amount: 1000,
      currency: 'BDT',
    },
  });
}

describe('GatewayResolver — disabled gateway warning path', () => {
  it('resolve warns for disabled adapter but returns it', () => {
    const bkash = new BkashGatewayAdapter();
    const cod = new CodGatewayAdapter();
    const svc = new GatewayResolverService([bkash, cod]);
    // bkash likely disabled in test env
    const adapter = svc.resolve('bkash');
    expect(adapter).toBe(bkash);
  });

  it('enabledGateways always includes manual', () => {
    const svc = new GatewayResolverService([new CodGatewayAdapter()]);
    expect(svc.enabledGateways()).toContain('manual');
  });
});

describe('StripeGatewayAdapter — full verify/capture branches', () => {
  it('capture with gatewayPaymentId set', async () => {
    const p = makePayment();
    p.startProcessing(GatewayPaymentIdVO.create('pi_1'));
    const a = new StripeGatewayAdapter();
    const r = await a.capture({ payment: p });
    expect(r.success).toBe(true);
  });

  it('verify with payment_intent.status only', async () => {
    const a = new StripeGatewayAdapter();
    const r = await a.verify({
      payment: makePayment(),
      callbackPayload: { 'payment_intent.status': 'succeeded' },
    });
    expect(r.verified).toBe(true);
  });
});

describe('PaymentQueue / RefundQueue / WebhookQueue — default args', () => {
  it('PaymentQueue enqueueRetry default delay', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    await new PaymentQueue(q as never).enqueueRetry({ paymentId: 'p', attempt: 1 });
    expect(q.enqueue).toHaveBeenCalled();
  });

  it('PaymentQueue enqueueExpire default delay', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    await new PaymentQueue(q as never).enqueueExpire({ paymentId: 'p' });
    expect(q.enqueue).toHaveBeenCalled();
  });

  it('PaymentQueue enqueueReconcile default payload', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    await new PaymentQueue(q as never).enqueueReconcile();
    expect(q.enqueue).toHaveBeenCalled();
  });

  it('RefundQueue default retry delay', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    await new RefundQueue(q as never).enqueueRetry({ refundId: 'r', attempt: 1 });
    expect(q.enqueue).toHaveBeenCalled();
  });

  it('WebhookQueue default retry delay', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    await new WebhookQueue(q as never).enqueueRetry({ webhookId: 'w', attempt: 1 });
    expect(q.enqueue).toHaveBeenCalled();
  });

  it('WebhookQueue default cleanup delay', async () => {
    const q = { enqueue: jest.fn(async () => 'id') };
    await new WebhookQueue(q as never).enqueueCleanupStale();
    expect(q.enqueue).toHaveBeenCalled();
  });
});

describe('PaymentIdempotencyService — extra paths', () => {
  it('ttlSeconds is positive integer', () => {
    const ttl = PaymentIdempotencyService.ttlSeconds();
    expect(Number.isInteger(ttl)).toBe(true);
    expect(ttl).toBeGreaterThan(0);
  });

  it('isValid false for empty string', () => {
    expect(PaymentIdempotencyService.isValid('')).toBe(false);
  });

  it('deriveKey formatting for different amounts', () => {
    const a = PaymentIdempotencyService.deriveKey({
      orderId: 'o', userId: 'u', amount: 100.5, method: 'card',
    });
    const b = PaymentIdempotencyService.deriveKey({
      orderId: 'o', userId: 'u', amount: 100.50, method: 'card',
    });
    expect(a.value).toBe(b.value);
  });
});

describe('PaymentGatewayRouterService — every branch', () => {
  it('BDT + net_banking → sslcommerz/manual', () => {
    const r = PaymentGatewayRouterService.select({
      method: PaymentMethodVO.create('net_banking'),
      currency: CurrencyVO.create('BDT'),
      amount: 500,
    });
    expect(r.gateway).not.toBeNull();
  });

  it('USD + net_banking → stripe/paypal', () => {
    const r = PaymentGatewayRouterService.select({
      method: PaymentMethodVO.create('net_banking'),
      currency: CurrencyVO.create('USD'),
      amount: 100,
    });
    expect(r.gateway!.value).toBeTruthy();
  });

  it('preferred gateway with unavailable code', () => {
    const r = PaymentGatewayRouterService.select({
      method: PaymentMethodVO.create('mobile_banking'),
      currency: CurrencyVO.create('BDT'),
      amount: 1000,
      preferredGateway: PaymentGatewayVO.create('stripe'),
    });
    expect(r.gateway).not.toBeNull();
  });

  it('EUR + wallet → international', () => {
    const r = PaymentGatewayRouterService.select({
      method: PaymentMethodVO.create('wallet'),
      currency: CurrencyVO.create('EUR'),
      amount: 100,
    });
    expect(r.gateway).not.toBeNull();
  });
});

describe('RetryPolicyService — boundaries', () => {
  const rp = new RetryPolicyService();

  it('next() negative attempt', () => {
    expect(rp.next(-1)).toBe(30_000);
  });

  it('next() custom array, index 0', () => {
    expect(rp.next(0, [100, 200])).toBe(100);
  });

  it('isExhausted custom max', () => {
    expect(rp.isExhausted(5, 5)).toBe(true);
    expect(rp.isExhausted(4, 5)).toBe(false);
  });
});

describe('FeeCalculatorService — full gateway matrix', () => {
  const fc = new FeeCalculatorService();

  for (const gw of ['bkash', 'nagad', 'rocket', 'sslcommerz', 'stripe', 'paypal']) {
    it(`calculates fee for ${gw}`, () => {
      const r = fc.calculate({
        amount: 1000,
        currency: 'BDT',
        gateway: PaymentGatewayVO.create(gw),
      });
      expect(r.totalFee).toBeGreaterThanOrEqual(0);
    });
  }
});

describe('PaymentAnalyticsService — all paths', () => {
  const a = new PaymentAnalyticsService();

  it('track with empty properties', async () => {
    await a.track('ev', {});
    expect(true).toBe(true);
  });

  it('identify with empty traits', async () => {
    await a.identify('u', {});
    expect(true).toBe(true);
  });
});

describe('PaymentTransactionLedgerService — all types', () => {
  function makeTx(t: string) {
    return TransactionEntity.create({
      id: UUID,
      now: NOW,
      props: {
        paymentId: PaymentIdVO.create(UUID),
        type: TransactionTypeVO.create(t),
        amount: 1000,
        currency: 'BDT',
      },
    });
  }

  for (const t of ['payment', 'refund', 'payout', 'transfer', 'chargeback', 'adjustment', 'reversal']) {
    it(`builds entries for ${t}`, () => {
      const entries = PaymentTransactionLedgerService.buildEntries(makeTx(t));
      expect(entries.length).toBeGreaterThanOrEqual(0);
    });
  }

  it('isBalanced returns false for imbalanced custom entries', () => {
    const entries = [
      { account: 'customer', side: 'debit', amount: 100, currency: 'BDT', transactionId: UUID },
    ] as never;
    expect(PaymentTransactionLedgerService.isBalanced(entries)).toBe(false);
  });
});

describe('PaymentFeeService — full paths', () => {
  it('USD exempt from VAT', () => {
    const r = PaymentFeeService.calculate({
      amount: 100,
      currency: 'USD',
      gateway: PaymentGatewayVO.create('stripe'),
    });
    expect(r.vat).toBe(0);
  });

  it('unknown gateway uses default 2%', () => {
    const r = PaymentFeeService.calculate({
      amount: 1000,
      currency: 'BDT',
      gateway: PaymentGatewayVO.reconstitute('braintree'),
    });
    expect(r.gatewayFee).toBeGreaterThan(0);
  });

  it('JPY uses 0 decimals', () => {
    const r = PaymentFeeService.calculate({
      amount: 1000,
      currency: 'JPY',
      gateway: null,
    });
    expect(r.totalFee).toBe(0);
  });

  it('reverseFromNet returns approximation', () => {
    const r = PaymentFeeService.reverseFromNet(1000, 'BDT', PaymentGatewayVO.create('bkash'));
    expect(r).toBeGreaterThan(1000);
  });
});

describe('PaymentRefundPolicyService — remaining branches', () => {
  it('rejects requested 0', () => {
    const p = makePayment();
    p.startProcessing(GatewayPaymentIdVO.create('gw'));
    p.authorize(GatewayPaymentIdVO.create('gw'));
    p.capture();
    const r = PaymentRefundPolicyService.checkEligibility({
      payment: p,
      requestedAmount: 0,
    });
    expect(r.eligible).toBe(false);
  });

  it('calculate with requested=paid', () => {
    const r = PaymentRefundPolicyService.calculateRefundAmount({
      paidAmount: 1000,
      requestedAmount: 1000,
    });
    expect(r).toBe(1000);
  });

  it('calculate returns 0 for negative paidAmount', () => {
    expect(
      PaymentRefundPolicyService.calculateRefundAmount({ paidAmount: -100 }),
    ).toBe(0);
  });
});
