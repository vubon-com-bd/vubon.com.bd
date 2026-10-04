import { jest } from '@jest/globals';
import { PaymentController } from '../../../../src/module/interfaces/controllers/rest/payment.controller.js';
import { RefundController } from '../../../../src/module/interfaces/controllers/rest/refund.controller.js';
import { TransactionController } from '../../../../src/module/interfaces/controllers/rest/transaction.controller.js';
import { WebhookController } from '../../../../src/module/interfaces/controllers/rest/webhook.controller.js';
import { HealthController } from '../../../../src/module/interfaces/controllers/rest/health.controller.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const USER = { userId: UUID };

function cmd() {
  return { execute: jest.fn(async () => ({ ok: true })) };
}

describe('PaymentController — every field combination', () => {
  let c: PaymentController;
  let cb: ReturnType<typeof cmd>;
  let qb: ReturnType<typeof cmd>;

  beforeEach(() => {
    cb = cmd();
    qb = cmd();
    c = new PaymentController(cb as never, qb as never);
  });

  it('initiate with returnUrl only', async () => {
    await c.initiate(
      {
        orderId: UUID,
        method: 'mobile_banking',
        amount: 1000,
        currency: 'BDT',
        returnUrl: 'https://x.com/r',
      },
      USER,
    );
    expect(cb.execute).toHaveBeenCalled();
  });

  it('initiate with gateway only', async () => {
    await c.initiate(
      {
        orderId: UUID,
        method: 'card',
        gateway: 'stripe',
        amount: 100,
        currency: 'USD',
      },
      USER,
    );
    expect(cb.execute).toHaveBeenCalled();
  });

  it('verify with gatewayData', async () => {
    await c.verify(UUID, { gatewayData: { status: 'success' } }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });

  it('capture with idempotencyKey only', async () => {
    await c.capture(UUID, { idempotencyKey: 'idem_abc12345' }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });

  it('fail with code', async () => {
    await c.fail(UUID, { reason: 'err', code: 'CODE' }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });

  it('cancel with reason', async () => {
    await c.cancel(UUID, { reason: 'user' }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });

  it('retry with idempotencyKey', async () => {
    await c.retry(UUID, { idempotencyKey: 'idem_abc12345' }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });

  it('chargeback with reason', async () => {
    await c.chargeback(UUID, { amount: 1000, reason: 'dispute' }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });
});

describe('RefundController — every field', () => {
  let c: RefundController;
  let cb: ReturnType<typeof cmd>;
  let qb: ReturnType<typeof cmd>;

  beforeEach(() => {
    cb = cmd();
    qb = cmd();
    c = new RefundController(cb as never, qb as never);
  });

  it('request with idempotencyKey', async () => {
    await c.request(
      { paymentId: UUID, amount: 500, reason: 'r', idempotencyKey: 'idem_abc12345' },
      USER,
    );
    expect(cb.execute).toHaveBeenCalled();
  });

  it('approve without approvedBy → uses actor userId', async () => {
    await c.approve(UUID, {}, USER);
    expect(cb.execute).toHaveBeenCalled();
  });

  it('approve with explicit approvedBy', async () => {
    await c.approve(UUID, { approvedBy: UUID }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });

  it('process with gatewayRefundId', async () => {
    await c.process(UUID, { gatewayRefundId: 'gw_rf' }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });

  it('complete with gatewayRefundId', async () => {
    await c.complete(UUID, { gatewayRefundId: 'gw_rf' }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });

  it('fail with code', async () => {
    await c.fail(UUID, { reason: 'x', code: 'CODE' }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });

  it('cancel with reason', async () => {
    await c.cancel(UUID, { reason: 'x' }, USER);
    expect(cb.execute).toHaveBeenCalled();
  });
});

describe('TransactionController — all methods', () => {
  let c: TransactionController;
  let qb: ReturnType<typeof cmd>;

  beforeEach(() => {
    qb = cmd();
    c = new TransactionController(qb as never);
  });

  it('list with all filters', async () => {
    await c.list({
      page: 1,
      limit: 10,
      paymentId: UUID,
      orderId: UUID,
      userId: UUID,
      type: 'payment',
      status: 'success',
      gateway: 'bkash',
      fromDate: '2026-01-01',
      toDate: '2026-12-31',
    });
    expect(qb.execute).toHaveBeenCalled();
  });
});

describe('WebhookController — signature fallbacks', () => {
  let c: WebhookController;
  let cb: ReturnType<typeof cmd>;
  let qb: ReturnType<typeof cmd>;

  beforeEach(() => {
    cb = cmd();
    qb = cmd();
    c = new WebhookController(cb as never, qb as never);
  });

  it('receive with all fields', async () => {
    await c.receive('stripe', {
      id: 'evt_1',
      type: 'payment.succeeded',
      signature: 'sig',
    });
    expect(cb.execute).toHaveBeenCalled();
  });

  it('receive with eventId only', async () => {
    await c.receive('stripe', { eventId: 'e1' });
    expect(cb.execute).toHaveBeenCalled();
  });

  it('receive with eventType only', async () => {
    await c.receive('stripe', { eventType: 'x' });
    expect(cb.execute).toHaveBeenCalled();
  });
});

describe('HealthController — full health matrix', () => {
  it('all ok', async () => {
    const c = new HealthController(
      { isHealthy: jest.fn(async () => true) } as never,
      { isHealthy: jest.fn(async () => true) } as never,
    );
    const r = await c.check();
    expect(r.status).toBe('ok');
    expect(r.service).toBe('payment-service');
  });

  it('redis only down', async () => {
    const c = new HealthController(
      { isHealthy: jest.fn(async () => true) } as never,
      { isHealthy: jest.fn(async () => false) } as never,
    );
    expect((await c.check()).status).toBe('degraded');
  });

  it('both down', async () => {
    const c = new HealthController(
      { isHealthy: jest.fn(async () => false) } as never,
      { isHealthy: jest.fn(async () => false) } as never,
    );
    const r = await c.check();
    expect(r.checks.prisma).toBe(false);
    expect(r.checks.redis).toBe(false);
  });
});
