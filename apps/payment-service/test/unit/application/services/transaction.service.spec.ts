import { jest } from '@jest/globals';
import { TransactionService } from '../../../../src/module/application/services/impl/transaction.service.js';
import type { TransactionRepository } from '../../../../src/module/domain/repositories/transaction.repository.interface.js';
import { TransactionEntity } from '../../../../src/module/domain/entities/transaction.entity.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { TransactionTypeVO } from '../../../../src/module/domain/value-objects/primitives/transaction-type.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

const mockTxRepo = {
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

function makeTx(): TransactionEntity {
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

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TransactionService(
      mockTxRepo as unknown as TransactionRepository,
    );
  });

  describe('record()', () => {
    it('records a new transaction', async () => {
      const out = await service.record({
        paymentId: UUID,
        type: 'payment',
        amount: 1000,
        currency: 'BDT',
      });
      expect(out.paymentId).toBe(UUID);
      expect(out.type).toBe('payment');
      expect(out.amount).toBe(1000);
    });
  });

  describe('markSucceeded()', () => {
    it('transitions to success', async () => {
      const tx = makeTx();
      mockTxRepo.findByIdVO.mockResolvedValue(tx);
      const out = await service.markSucceeded(UUID, 'gw_tx_1');
      expect(out.status).toBe('success');
    });
  });

  describe('markFailed()', () => {
    it('transitions to failed', async () => {
      const tx = makeTx();
      mockTxRepo.findByIdVO.mockResolvedValue(tx);
      const out = await service.markFailed(UUID, 'gateway timeout');
      expect(out.status).toBe('failed');
    });
  });

  describe('getById()', () => {
    it('throws when not found', async () => {
      mockTxRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow();
    });
  });

  describe('list()', () => {
    it('returns paginated list', async () => {
      mockTxRepo.findPaginated.mockResolvedValue({
        items: [makeTx()],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      });
      const out = await service.list({ page: 1, limit: 20 });
      expect(out.total).toBe(1);
    });
  });
});
