/**
 * TransactionService — Unit Tests (full branch coverage)
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

jest.mock('@nestjs/common', () => ({
  Injectable: () => (target: unknown) => target,
  Inject: () => () => undefined,
  Logger: class {
    log(): void {}
    error(): void {}
    warn(): void {}
    debug(): void {}
    verbose(): void {}
  },
}));

import { TransactionService } from '@application/services/impl/transaction.service';
import {
  TransactionNotFoundApplicationError,
  TransactionCreationError,
  TransactionReversalError,
} from '@application/errors/transaction.errors';
import type { TransactionRepository } from '@domain/repositories/transaction.repository.interface';
import { TransactionEntity } from '@domain/entities/transaction.entity';
import { TransactionIdVO } from '@domain/primitives/transaction-id.vo';
import { TransactionTypeVO } from '@domain/primitives/transaction-type.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { VALID_PAYMENT_ID } from '@app-fixtures/payment-entity.fixture';

const TX_ID = '323e4567-e89b-42d3-a456-426614174099';

function makeMockRepo() {
  return {
    save: jest.fn(),
    findByIdVO: jest.fn(),
    findByPayment: jest.fn(),
    findPaginated: jest.fn(),
    getStats: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    findByGatewayReference: jest.fn(),
    findByStatus: jest.fn(),
    findPendingStale: jest.fn(),
    findSettleable: jest.fn(),
    softDelete: jest.fn(),
  };
}

function makeTxEntity() {
  const e = TransactionEntity.create({
    id: TransactionIdVO.create(TX_ID),
    now: '2025-01-15T10:00:00.000Z',
    props: {
      paymentId: PaymentIdVO.create(VALID_PAYMENT_ID),
      type: TransactionTypeVO.create('payment'),
      amount: PaymentAmountVO.create(1000, 'BDT'),
    },
  });
  e.markSuccess('ch_1');
  return e;
}

describe('TransactionService', () => {
  let service: TransactionService;
  let mockRepo: ReturnType<typeof makeMockRepo>;

  beforeEach(() => {
    mockRepo = makeMockRepo();
    service = new TransactionService(mockRepo as unknown as TransactionRepository);
  });

  describe('create', () => {
    it('should create transaction', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.create({
        paymentId: VALID_PAYMENT_ID,
        type: 'payment' as never,
        amount: 1000,
        currency: 'BDT',
      });
      expect(result.amount).toBe(1000);
    });

    it('should throw TransactionCreationError on zero amount', async () => {
      await expect(
        service.create({
          paymentId: VALID_PAYMENT_ID,
          type: 'payment' as never,
          amount: 0,
          currency: 'BDT',
        }),
      ).rejects.toThrow(TransactionCreationError);
    });

    it('should wrap DB failure as TransactionCreationError', async () => {
      mockRepo.save.mockRejectedValue(new Error('DB'));
      await expect(
        service.create({
          paymentId: VALID_PAYMENT_ID,
          type: 'payment' as never,
          amount: 1000,
          currency: 'BDT',
        }),
      ).rejects.toThrow(TransactionCreationError);
    });
  });

  describe('reverse', () => {
    it('should reverse successful transaction', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeTxEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.reverse({ transactionId: TX_ID, reason: 'mistake' });
      expect(result.status).toBe('reversed');
    });

    it('should throw TransactionNotFoundApplicationError', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.reverse({ transactionId: TX_ID, reason: 'x' }),
      ).rejects.toThrow(TransactionNotFoundApplicationError);
    });

    it('should wrap as TransactionReversalError on DB fail', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeTxEntity());
      mockRepo.save.mockRejectedValue(new Error('DB'));
      await expect(
        service.reverse({ transactionId: TX_ID, reason: 'x' }),
      ).rejects.toThrow(TransactionReversalError);
    });
  });

  describe('getById', () => {
    it('should return DTO', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeTxEntity());
      const dto = await service.getById(TX_ID);
      expect(dto.id).toBe(TX_ID);
    });

    it('should throw not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(TX_ID)).rejects.toThrow(
        TransactionNotFoundApplicationError,
      );
    });
  });

  describe('listByPayment', () => {
    it('should return empty', async () => {
      mockRepo.findByPayment.mockResolvedValue([]);
      expect(await service.listByPayment(VALID_PAYMENT_ID)).toHaveLength(0);
    });

    it('should return one', async () => {
      mockRepo.findByPayment.mockResolvedValue([makeTxEntity()]);
      expect(await service.listByPayment(VALID_PAYMENT_ID)).toHaveLength(1);
    });
  });

  describe('list', () => {
    it('should paginate', async () => {
      mockRepo.findPaginated.mockResolvedValue({
        items: [makeTxEntity()],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
      const result = await service.list({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
    });
  });

  describe('getStats', () => {
    it('should return stats', async () => {
      mockRepo.getStats.mockResolvedValue({
        total: 10,
        totalAmount: 5000,
        currency: 'BDT',
        byType: { payment: 10 },
        byStatus: { success: 8, failed: 2 },
      });
      const stats = await service.getStats();
      expect(stats.total).toBe(10);
    });
  });
});
