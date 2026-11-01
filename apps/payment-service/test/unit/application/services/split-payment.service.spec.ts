/**
 * SplitPaymentService — Unit Tests (full branch coverage)
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

import { SplitPaymentService } from '@application/services/impl/split-payment.service';
import type { SplitPaymentRepository } from '@domain/repositories/split-payment.repository.interface';
import { SplitPaymentEntity } from '@domain/entities/split-payment.entity';
import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { SplitTypeVO } from '@domain/primitives/split-type.vo';
import { SplitAmountVO } from '@domain/primitives/split-amount.vo';
import { SplitPercentageVO } from '@domain/primitives/split-percentage.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { VALID_PAYMENT_ID } from '@app-fixtures/payment-entity.fixture';

const SPLIT_ID = 'b23e4567-e89b-42d3-a456-426614174099';

function makeMockRepo() {
  return {
    save: jest.fn(),
    findByIdVO: jest.fn(),
    findByPayment: jest.fn(),
    findPending: jest.fn(),
    findFailed: jest.fn(),
    findPaginated: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    softDelete: jest.fn(),
  };
}

function makeSplitEntity() {
  return SplitPaymentEntity.create({
    id: SplitIdVO.create(SPLIT_ID),
    now: '2025-01-15T10:00:00.000Z',
    props: {
      paymentId: PaymentIdVO.create(VALID_PAYMENT_ID),
      type: SplitTypeVO.create('percentage'),
      totalAmount: 1000,
      currency: 'BDT',
      receivers: [
        {
          receiverId: 'vendor-a',
          amount: SplitAmountVO.create(700, 'BDT'),
          percentage: SplitPercentageVO.create(70),
        },
        {
          receiverId: 'vendor-b',
          amount: SplitAmountVO.create(300, 'BDT'),
          percentage: SplitPercentageVO.create(30),
        },
      ],
    },
  });
}

describe('SplitPaymentService', () => {
  let service: SplitPaymentService;
  let mockRepo: ReturnType<typeof makeMockRepo>;

  beforeEach(() => {
    mockRepo = makeMockRepo();
    service = new SplitPaymentService(mockRepo as unknown as SplitPaymentRepository);
  });

  describe('create', () => {
    it('should create percentage split', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.create({
        paymentId: VALID_PAYMENT_ID,
        type: 'percentage' as never,
        totalAmount: 1000,
        currency: 'BDT',
        receivers: [
          { receiverId: 'a', percentage: 70 },
          { receiverId: 'b', percentage: 30 },
        ],
      });
      expect(result.receivers).toHaveLength(2);
      expect(result.totalAmount).toBe(1000);
    });

    it('should create fixed split', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.create({
        paymentId: VALID_PAYMENT_ID,
        type: 'fixed' as never,
        totalAmount: 1000,
        currency: 'BDT',
        receivers: [
          { receiverId: 'a', fixedAmount: 600 },
          { receiverId: 'b', fixedAmount: 400 },
        ],
      });
      expect(result.receivers).toHaveLength(2);
    });

    it('should create equal split', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.create({
        paymentId: VALID_PAYMENT_ID,
        type: 'equal' as never,
        totalAmount: 1000,
        currency: 'BDT',
        receivers: [{ receiverId: 'a' }, { receiverId: 'b' }],
      });
      expect(result.receivers[0]?.amount).toBe(500);
    });

    it('should reject when percentages do not sum to 100', async () => {
      await expect(
        service.create({
          paymentId: VALID_PAYMENT_ID,
          type: 'percentage' as never,
          totalAmount: 1000,
          currency: 'BDT',
          receivers: [
            { receiverId: 'a', percentage: 50 },
            { receiverId: 'b', percentage: 30 },
          ],
        }),
      ).rejects.toThrow();
    });
  });

  describe('execute', () => {
    it('should execute a pending split', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeSplitEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.execute(SPLIT_ID, 'admin');
      expect(result.isExecuted).toBe(true);
      expect(result.executedAt).toBeDefined();
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.execute(SPLIT_ID, 'admin')).rejects.toThrow();
    });
  });

  describe('getById', () => {
    it('should return DTO', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeSplitEntity());
      const dto = await service.getById(SPLIT_ID);
      expect(dto.id).toBe(SPLIT_ID);
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(SPLIT_ID)).rejects.toThrow();
    });
  });

  describe('listByPayment', () => {
    it('should return empty', async () => {
      mockRepo.findByPayment.mockResolvedValue([]);
      expect(await service.listByPayment(VALID_PAYMENT_ID)).toHaveLength(0);
    });

    it('should return one', async () => {
      mockRepo.findByPayment.mockResolvedValue([makeSplitEntity()]);
      expect(await service.listByPayment(VALID_PAYMENT_ID)).toHaveLength(1);
    });
  });

  describe('list', () => {
    it('should paginate', async () => {
      mockRepo.findPaginated.mockResolvedValue({
        items: [makeSplitEntity()],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
      const result = await service.list({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
    });
  });
});
