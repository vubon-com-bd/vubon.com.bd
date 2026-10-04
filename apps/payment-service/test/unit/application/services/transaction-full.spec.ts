import { jest } from '@jest/globals';
import { TransactionService } from '../../../../src/module/application/services/impl/transaction.service.js';
import { TransactionEntity } from '../../../../src/module/domain/entities/transaction.entity.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { TransactionTypeVO } from '../../../../src/module/domain/value-objects/primitives/transaction-type.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

function mockRepo() {
  return {
    save: jest.fn(async (t: TransactionEntity) => t),
    findByIdVO: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    findByPaymentId: jest.fn(async () => []),
    findByOrderId: jest.fn(async () => []),
    findByUserId: jest.fn(),
    findByType: jest.fn(),
    findByStatus: jest.fn(),
    findByIdempotencyKey: jest.fn(),
    findPaginated: jest.fn(),
    exists: jest.fn(),
    delete: jest.fn(),
    sumByPaymentIdAndType: jest.fn(),
    countByPaymentId: jest.fn(),
  };
}

function make() {
  return TransactionEntity.create({
    id: UUID,
    now: NOW,
    props: {
      paymentId: PaymentIdVO.create(UUID),
      type: TransactionTypeVO.create('payment'),
      amount: 1000,
      currency: 'BDT',
    },
  });
}

describe('TransactionService — full paths', () => {
  let svc: TransactionService;
  let repo: ReturnType<typeof mockRepo>;

  beforeEach(() => {
    repo = mockRepo();
    svc = new TransactionService(repo as never);
  });

  it('record with all optional fields', async () => {
    const out = await svc.record({
      paymentId: UUID,
      orderId: UUID,
      userId: UUID,
      type: 'payment',
      amount: 1000,
      currency: 'BDT',
      gateway: 'bkash',
      gatewayTransactionId: 'gw_tx_1',
      reference: 'ref-1',
      idempotencyKey: 'idem_abc12345',
      metadata: { k: 'v' },
    });
    expect(out.id).toBeDefined();
  });

  it('markFailed with code', async () => {
    repo.findByIdVO.mockResolvedValue(make());
    const out = await svc.markFailed(UUID, 'error', 'CODE');
    expect(out.status).toBe('failed');
  });

  it('listByOrder works', async () => {
    repo.findByOrderId.mockResolvedValue([make()]);
    const out = await svc.listByOrder(UUID);
    expect(out).toHaveLength(1);
  });

  it('listByPayment works', async () => {
    repo.findByPaymentId.mockResolvedValue([make()]);
    const out = await svc.listByPayment(UUID);
    expect(out).toHaveLength(1);
  });

  it('list with all filters', async () => {
    repo.findPaginated.mockResolvedValue({
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
      userId: UUID,
      type: 'payment',
      status: 'success',
      gateway: 'bkash',
      fromDate: '2026-01-01',
      toDate: '2026-12-31',
    });
    expect(repo.findPaginated).toHaveBeenCalled();
  });

  it('markSucceeded on missing tx throws', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.markSucceeded(UUID)).rejects.toThrow();
  });

  it('markFailed on missing tx throws', async () => {
    repo.findByIdVO.mockResolvedValue(null);
    await expect(svc.markFailed(UUID, 'x')).rejects.toThrow();
  });
});
