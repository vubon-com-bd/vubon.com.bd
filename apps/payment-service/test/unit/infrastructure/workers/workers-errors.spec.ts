import { jest } from '@jest/globals';
import { PaymentRetryWorker } from '../../../../src/module/infrastructure/workers/payment-retry.worker.js';
import { PaymentExpiryWorker } from '../../../../src/module/infrastructure/workers/payment-expiry.worker.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function make(): PaymentEntity {
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

function makeFailed(): PaymentEntity {
  const p = make();
  p.fail(FailureReasonVO.create('x'));
  return p;
}

describe('PaymentRetryWorker — attempt bounds', () => {
  let w: PaymentRetryWorker;
  let qs: { registerWorker: jest.Mock };
  let pr: { findByIdVO: jest.Mock; save: jest.Mock };
  let pq: { enqueueRetry: jest.Mock };

  beforeEach(() => {
    qs = { registerWorker: jest.fn() };
    pr = { findByIdVO: jest.fn(async () => makeFailed()), save: jest.fn(async (p: PaymentEntity) => p) };
    pq = { enqueueRetry: jest.fn(async () => 'id') };
    w = new PaymentRetryWorker(qs as never, pr as never, pq as never);
  });

  const handle = (p: unknown) => (w as never as { handle: (x: unknown) => Promise<unknown> }).handle(p);

  it('attempt 2 schedules next', async () => {
    const out = await handle({ paymentId: UUID, attempt: 2 });
    expect(out).toMatchObject({ retried: true });
    expect(pq.enqueueRetry).toHaveBeenCalled();
  });

  it('attempt 0 schedules first', async () => {
    await handle({ paymentId: UUID, attempt: 0 });
    expect(pq.enqueueRetry).toHaveBeenCalled();
  });
});

describe('PaymentExpiryWorker — settled short-circuit', () => {
  let w: PaymentExpiryWorker;
  let qs: { registerWorker: jest.Mock };
  let pr: { findByIdVO: jest.Mock; save: jest.Mock };

  beforeEach(() => {
    qs = { registerWorker: jest.fn() };
    pr = { findByIdVO: jest.fn(), save: jest.fn(async (p: PaymentEntity) => p) };
    w = new PaymentExpiryWorker(qs as never, pr as never);
  });

  const handle = (p: unknown) => (w as never as { handle: (x: unknown) => Promise<unknown> }).handle(p);

  it('skips settled payment', async () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    p.capture();
    pr.findByIdVO.mockResolvedValue(p);
    const out = await handle({ paymentId: UUID });
    expect(out).toMatchObject({ skipped: true });
  });

  it('skips authorized in open window', async () => {
    const p = make();
    p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
    p.authorize(GatewayPaymentIdVO.create('gw_1'));
    pr.findByIdVO.mockResolvedValue(p);
    const out = await handle({ paymentId: UUID });
    expect(out).toMatchObject({ skipped: true });
  });
});
