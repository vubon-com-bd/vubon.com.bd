import { jest } from '@jest/globals';
import { PaymentRetryWorker } from '../../../../src/module/infrastructure/workers/payment-retry.worker.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makeFailedPayment(): PaymentEntity {
  const p = PaymentEntity.create({
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
  p.fail(FailureReasonVO.create('network'));
  return p;
}

describe('PaymentRetryWorker', () => {
  let worker: PaymentRetryWorker;
  let queueService: { registerWorker: jest.Mock };
  let paymentRepo: { findByIdVO: jest.Mock; save: jest.Mock };
  let paymentQueue: { enqueueRetry: jest.Mock };

  beforeEach(() => {
    queueService = { registerWorker: jest.fn() };
    paymentRepo = {
      findByIdVO: jest.fn(),
      save: jest.fn(async (p: PaymentEntity) => p),
    };
    paymentQueue = { enqueueRetry: jest.fn(async () => 'job-id') };
    worker = new PaymentRetryWorker(
      queueService as never,
      paymentRepo as never,
      paymentQueue as never,
    );
  });

  it('skips when payment not found', async () => {
    paymentRepo.findByIdVO.mockResolvedValue(null);
    const out = await (worker as never as { handle: (p: unknown) => Promise<unknown> }).handle({
      paymentId: UUID,
      attempt: 1,
    });
    expect(out).toMatchObject({ skipped: true });
  });

  it('skips when payment not retryable', async () => {
    const p = PaymentEntity.create({
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
    paymentRepo.findByIdVO.mockResolvedValue(p);
    const out = await (worker as never as { handle: (p: unknown) => Promise<unknown> }).handle({
      paymentId: UUID,
      attempt: 1,
    });
    expect(out).toMatchObject({ skipped: true });
  });

  it('retries failed payment and schedules next attempt', async () => {
    paymentRepo.findByIdVO.mockResolvedValue(makeFailedPayment());
    const out = await (worker as never as { handle: (p: unknown) => Promise<unknown> }).handle({
      paymentId: UUID,
      attempt: 1,
    });
    expect(out).toMatchObject({ retried: true, attempt: 1 });
    expect(paymentQueue.enqueueRetry).toHaveBeenCalled();
  });

  it('does not schedule next when exhausted', async () => {
    paymentRepo.findByIdVO.mockResolvedValue(makeFailedPayment());
    const out = await (worker as never as { handle: (p: unknown) => Promise<unknown> }).handle({
      paymentId: UUID,
      attempt: 3,
    });
    expect(out).toMatchObject({ retried: true });
    expect(paymentQueue.enqueueRetry).not.toHaveBeenCalled();
  });
});
