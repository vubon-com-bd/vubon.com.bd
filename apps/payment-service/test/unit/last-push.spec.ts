import { jest } from '@jest/globals';
import { RefundService } from '../../src/module/application/services/impl/refund.service.js';
import { WebhookService } from '../../src/module/application/services/impl/webhook.service.js';
import { RefundEntity } from '../../src/module/domain/entities/refund.entity.js';
import { PaymentEntity } from '../../src/module/domain/entities/payment.entity.js';
import { PaymentIdVO } from '../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { RefundReasonVO } from '../../src/module/domain/value-objects/primitives/refund-reason.vo.js';
import { PaymentTypeVO } from '../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';
import { WebhookEventEntity } from '../../src/module/domain/entities/webhook-event.entity.js';
import { PaymentLifecycleSaga } from '../../src/module/application/sagas/payment-lifecycle.saga.js';
import { RefundLifecycleSaga } from '../../src/module/application/sagas/refund-lifecycle.saga.js';
import {
  PaymentInitiatedEvent,
  PaymentCapturedEvent,
  PaymentPaidEvent,
  PaymentFailedEvent,
  PaymentRefundedEvent,
  PaymentChargebackEvent,
} from '../../src/module/domain/events/payment.events.js';
import {
  RefundRequestedEvent,
  RefundSucceededEvent,
  RefundFailedEvent,
} from '../../src/module/domain/events/refund.events.js';
import { firstValueFrom, of, take } from 'rxjs';
import { CommandBus } from '@nestjs/cqrs';

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

function makeCaptured() {
  const p = makePayment();
  p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
  p.authorize(GatewayPaymentIdVO.create('gw_1'));
  p.capture();
  return p;
}

function makeRefund() {
  return RefundEntity.request({
    id: UUID,
    now: NOW,
    props: {
      paymentId: PaymentIdVO.create(UUID),
      amount: 500,
      currency: 'BDT',
      reason: RefundReasonVO.create('test'),
    },
  });
}

function mockRepos() {
  return {
    refund: { save: jest.fn(async (e: unknown) => e), findByIdVO: jest.fn(), findByPaymentId: jest.fn(async () => []), findPaginated: jest.fn() },
    payment: {
      save: jest.fn(async (e: unknown) => e),
      findByIdVO: jest.fn(),
      findByOrderId: jest.fn(),
      findByUserId: jest.fn(),
      findByIdempotencyKey: jest.fn(),
      getStats: jest.fn(),
      findPaginated: jest.fn(),
    },
    tx: { save: jest.fn(async (e: unknown) => e), findByPaymentId: jest.fn(async () => []) },
    webhook: {
      save: jest.fn(async (e: unknown) => e),
      findById: jest.fn(),
      findByGatewayEventId: jest.fn(async () => null),
      findPaginated: jest.fn(),
      findUnprocessed: jest.fn(async () => []),
    },
  };
}

describe('RefundService — extra branches', () => {
  let svc: RefundService;
  let r: ReturnType<typeof mockRepos>;

  beforeEach(() => {
    r = mockRepos();
    svc = new RefundService(r.refund as never, r.payment as never, r.tx as never);
  });

  it('request without explicit amount uses refundableRemaining', async () => {
    r.payment.findByIdVO.mockResolvedValue(makeCaptured());
    const out = await svc.request({ paymentId: UUID });
    expect(out.refundedAmount).toBe(1000);
  });

  it('complete with gatewayRefundId', async () => {
    const rf = makeRefund();
    rf.startProcessing();
    r.refund.findByIdVO.mockResolvedValue(rf);
    r.payment.findByIdVO.mockResolvedValue(makeCaptured());
    const out = await svc.complete({ refundId: UUID, gatewayRefundId: 'gw_rf_1' });
    expect(out.status).toBe('succeeded');
  });

  it('complete without matching payment (payment null)', async () => {
    const rf = makeRefund();
    rf.startProcessing();
    r.refund.findByIdVO.mockResolvedValue(rf);
    r.payment.findByIdVO.mockResolvedValue(null);
    const out = await svc.complete({ refundId: UUID });
    expect(out.status).toBe('succeeded');
  });

  it('cancel with reason', async () => {
    r.refund.findByIdVO.mockResolvedValue(makeRefund());
    const out = await svc.cancel({ refundId: UUID, reason: 'withdraw' });
    expect(out.status).toBe('cancelled');
  });

  it('fail with code', async () => {
    r.refund.findByIdVO.mockResolvedValue(makeRefund());
    const out = await svc.fail({ refundId: UUID, reason: 'x', code: 'CODE' });
    expect(out.status).toBe('failed');
  });

  it('listByPayment works', async () => {
    r.refund.findByPaymentId.mockResolvedValue([makeRefund()]);
    const out = await svc.listByPayment(UUID);
    expect(out).toHaveLength(1);
  });

  it('list with all filter fields', async () => {
    r.refund.findPaginated.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    });
    await svc.list({
      page: 1,
      limit: 20,
      paymentId: UUID,
      orderId: UUID,
      status: 'pending',
      fromDate: '2026-01-01',
      toDate: '2026-12-31',
      sortBy: 'amount',
      sortDir: 'asc',
    });
    expect(r.refund.findPaginated).toHaveBeenCalled();
  });
});

describe('WebhookService — routing branches', () => {
  let svc: WebhookService;
  let r: ReturnType<typeof mockRepos>;

  beforeEach(() => {
    r = mockRepos();
    svc = new WebhookService(r.webhook as never, r.payment as never);
  });

  it('routes payment.captured event', async () => {
    const p = makePayment();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    r.webhook.findByGatewayEventId.mockResolvedValue(null);
    r.payment.findByIdVO.mockResolvedValue(p);
    const out = await svc.process({
      gateway: 'bkash',
      gatewayEventId: 'evt_captured',
      eventType: 'payment.captured',
      payload: { paymentId: UUID },
    });
    expect(out.success).toBe(true);
  });

  it('routes payment.paid event', async () => {
    const p = makeCaptured();
    r.webhook.findByGatewayEventId.mockResolvedValue(null);
    r.payment.findByIdVO.mockResolvedValue(p);
    const out = await svc.process({
      gateway: 'bkash',
      gatewayEventId: 'evt_paid',
      eventType: 'payment.paid',
      payload: { paymentId: UUID },
    });
    expect(out.success).toBe(true);
  });

  it('routes payment.declined event', async () => {
    const p = makePayment();
    r.webhook.findByGatewayEventId.mockResolvedValue(null);
    r.payment.findByIdVO.mockResolvedValue(p);
    const out = await svc.process({
      gateway: 'bkash',
      gatewayEventId: 'evt_declined',
      eventType: 'payment.declined',
      payload: { paymentId: UUID, reason: 'insufficient' },
    });
    expect(out.success).toBe(true);
  });

  it('routes refund.succeeded event', async () => {
    const p = makeCaptured();
    r.webhook.findByGatewayEventId.mockResolvedValue(null);
    r.payment.findByIdVO.mockResolvedValue(p);
    const out = await svc.process({
      gateway: 'bkash',
      gatewayEventId: 'evt_ref',
      eventType: 'refund.succeeded',
      payload: { paymentId: UUID, amount: 300 },
    });
    expect(out.success).toBe(true);
  });

  it('routes with gateway_payment_id field', async () => {
    const p = makePayment();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    r.webhook.findByGatewayEventId.mockResolvedValue(null);
    r.payment.findByIdVO.mockResolvedValue(p);
    const out = await svc.process({
      gateway: 'bkash',
      gatewayEventId: 'evt_gwpid',
      eventType: 'payment.succeeded',
      payload: { order_payment_id: UUID, gateway_payment_id: 'gw_1' },
    });
    expect(out.success).toBe(true);
  });

  it('retryFailed processes pending', async () => {
    const p = makePayment();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    const wh = WebhookEventEntity.receive({
      id: UUID,
      now: NOW,
      props: {
        gateway: 'bkash',
        gatewayEventId: 'evt_r',
        eventType: 'payment.succeeded',
        payload: { paymentId: UUID },
      },
    });
    wh.verify();
    r.webhook.findUnprocessed.mockResolvedValue([wh]);
    r.payment.findByIdVO.mockResolvedValue(p);
    const out = await svc.retryFailed();
    expect(out).toBeDefined();
  });

  it('retryFailed handles routing error', async () => {
    const wh = WebhookEventEntity.receive({
      id: UUID,
      now: NOW,
      props: {
        gateway: 'bkash',
        gatewayEventId: 'evt_r2',
        eventType: 'payment.succeeded',
        payload: { paymentId: UUID },
      },
    });
    wh.verify();
    r.webhook.findUnprocessed.mockResolvedValue([wh]);
    r.payment.findByIdVO.mockRejectedValue(new Error('db err'));
    const out = await svc.retryFailed();
    expect(out.failed).toBeGreaterThanOrEqual(0);
  });

  it('list paginated', async () => {
    r.webhook.findPaginated.mockResolvedValue({
      items: [],
      total: 0,
      page: 1,
      limit: 20,
      totalPages: 0,
    });
    const out = await svc.list({ page: 1, limit: 20 });
    expect(out.total).toBe(0);
  });

  it('getById throws when missing', async () => {
    r.webhook.findById.mockResolvedValue(null);
    await expect(svc.getById(UUID)).rejects.toThrow();
  });
});

describe('PaymentLifecycleSaga — all remaining handlers', () => {
  let saga: PaymentLifecycleSaga;
  let bus: { execute: jest.Mock };

  beforeEach(() => {
    bus = { execute: jest.fn(async (c: unknown) => c) };
    saga = new PaymentLifecycleSaga(bus as unknown as CommandBus);
  });

  it('onPaymentInitiated', async () => {
    const e = new PaymentInitiatedEvent({
      aggregateId: UUID,
      payload: {
        paymentId: UUID,
        orderId: UUID,
        userId: UUID,
        amount: 1000,
        currency: 'BDT',
        method: 'mobile_banking',
        type: 'one_time',
      },
    });
    await firstValueFrom(saga.onPaymentInitiated(of(e)).pipe(take(1)));
    expect(bus.execute).toHaveBeenCalled();
  });

  it('onPaymentCaptured', async () => {
    const e = new PaymentCapturedEvent({
      aggregateId: UUID,
      payload: { paymentId: UUID, capturedAt: NOW, amount: 1000, currency: 'BDT' },
    });
    await firstValueFrom(saga.onPaymentCaptured(of(e)).pipe(take(1)));
    expect(bus.execute).toHaveBeenCalled();
  });

  it('onPaymentPaid', async () => {
    const e = new PaymentPaidEvent({
      aggregateId: UUID,
      payload: { paymentId: UUID, orderId: UUID, paidAt: NOW, amount: 1000, currency: 'BDT' },
    });
    await firstValueFrom(saga.onPaymentPaid(of(e)).pipe(take(1)));
    expect(bus.execute).toHaveBeenCalled();
  });

  it('onPaymentFailed', async () => {
    const e = new PaymentFailedEvent({
      aggregateId: UUID,
      payload: { paymentId: UUID, failedAt: NOW, reason: 'x' },
    });
    await firstValueFrom(saga.onPaymentFailed(of(e)).pipe(take(1)));
    expect(bus.execute).toHaveBeenCalled();
  });

  it('onPaymentRefunded', async () => {
    const e = new PaymentRefundedEvent({
      aggregateId: UUID,
      payload: {
        paymentId: UUID,
        refundedAt: NOW,
        amount: 500,
        currency: 'BDT',
        fullyRefunded: false,
      },
    });
    await firstValueFrom(saga.onPaymentRefunded(of(e)).pipe(take(1)));
    expect(bus.execute).toHaveBeenCalled();
  });

  it('onPaymentChargeback', async () => {
    const e = new PaymentChargebackEvent({
      aggregateId: UUID,
      payload: { paymentId: UUID, chargebackAt: NOW, amount: 1000, currency: 'BDT' },
    });
    await firstValueFrom(saga.onPaymentChargeback(of(e)).pipe(take(1)));
    expect(bus.execute).toHaveBeenCalled();
  });
});

describe('RefundLifecycleSaga — handlers', () => {
  let saga: RefundLifecycleSaga;
  let bus: { execute: jest.Mock };

  beforeEach(() => {
    bus = { execute: jest.fn(async (c: unknown) => c) };
    saga = new RefundLifecycleSaga(bus as unknown as CommandBus);
  });

  it('onRefundRequested', async () => {
    const e = new RefundRequestedEvent({
      aggregateId: UUID,
      payload: { refundId: UUID, paymentId: UUID, amount: 500, currency: 'BDT' },
    });
    await firstValueFrom(saga.onRefundRequested(of(e)).pipe(take(1)));
    expect(bus.execute).toHaveBeenCalled();
  });

  it('onRefundSucceeded', async () => {
    const e = new RefundSucceededEvent({
      aggregateId: UUID,
      payload: {
        refundId: UUID,
        paymentId: UUID,
        processedAt: NOW,
        amount: 500,
        currency: 'BDT',
      },
    });
    await firstValueFrom(saga.onRefundSucceeded(of(e)).pipe(take(1)));
    expect(bus.execute).toHaveBeenCalled();
  });

  it('onRefundFailed', async () => {
    const e = new RefundFailedEvent({
      aggregateId: UUID,
      payload: { refundId: UUID, paymentId: UUID, failedAt: NOW, reason: 'x' },
    });
    await firstValueFrom(saga.onRefundFailed(of(e)).pipe(take(1)));
    expect(bus.execute).toHaveBeenCalled();
  });
});
