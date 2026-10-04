import { jest } from '@jest/globals';
import { PaymentExpiryWorker } from '../../../../src/module/infrastructure/workers/payment-expiry.worker.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function makePendingPayment(): PaymentEntity {
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

describe('PaymentExpiryWorker', () => {
  let worker: PaymentExpiryWorker;
  let queueService: { registerWorker: jest.Mock };
  let paymentRepo: { findByIdVO: jest.Mock; save: jest.Mock };

  beforeEach(() => {
    queueService = { registerWorker: jest.fn() };
    paymentRepo = {
      findByIdVO: jest.fn(),
      save: jest.fn(async (p: PaymentEntity) => p),
    };
    worker = new PaymentExpiryWorker(queueService as never, paymentRepo as never);
  });

  it('skips when payment not found', async () => {
    paymentRepo.findByIdVO.mockResolvedValue(null);
    const out = await (worker as never as { handle: (p: unknown) => Promise<unknown> }).handle({
      paymentId: UUID,
    });
    expect(out).toMatchObject({ skipped: true });
  });

  it('expires a pending payment', async () => {
    paymentRepo.findByIdVO.mockResolvedValue(makePendingPayment());
    const out = await (worker as never as { handle: (p: unknown) => Promise<unknown> }).handle({
      paymentId: UUID,
    });
    expect(out).toMatchObject({ expired: true });
    expect(paymentRepo.save).toHaveBeenCalled();
  });
});
