import { jest } from '@jest/globals';
import { ReconciliationWorker } from '../../../../src/module/infrastructure/workers/reconciliation.worker.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';

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

describe('ReconciliationWorker — onModuleInit', () => {
  it('logs on init', () => {
    const repo = { save: jest.fn() } as never;
    const queue = { enqueueRetry: jest.fn() } as never;
    const w = new ReconciliationWorker(repo, queue);
    expect(() => w.onModuleInit()).not.toThrow();
  });
});

describe('ReconciliationWorker — full paths', () => {
  it('handles stale fail throw gracefully', async () => {
    const repo = {
      findExpiredAuthorizations: jest.fn(async () => []),
      findStalePending: jest.fn(async () => [make()]),
      findRetryable: jest.fn(async () => []),
      save: jest.fn(async () => {
        throw new Error('cannot save');
      }),
    };
    const queue = { enqueueRetry: jest.fn(async () => 'j') };
    const w = new ReconciliationWorker(repo as never, queue as never);
    const out = await w.run();
    // Stale fail catch should swallow error; no crash
    expect(out).toBeDefined();
  });
});
