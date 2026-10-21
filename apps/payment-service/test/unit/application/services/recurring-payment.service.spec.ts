/**
 * RecurringPaymentService — Unit Tests (full branch coverage)
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

import { RecurringPaymentService } from '@application/services/impl/recurring-payment.service';
import type { RecurringPaymentRepository } from '@domain/repositories/recurring-payment.repository.interface';
import { RecurringPaymentEntity } from '@domain/entities/recurring-payment.entity';
import { RecurringIdVO } from '@domain/primitives/recurring-id.vo';
import { RecurringFrequencyVO } from '@domain/primitives/recurring-frequency.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { PaymentAmountVO } from '@domain/primitives/payment-amount.vo';
import { VALID_PAYMENT_ID } from '@app-fixtures/payment-entity.fixture';

const RECURRING_ID = '523e4567-e89b-42d3-a456-426614174099';

function makeMockRepo() {
  return {
    save: jest.fn(),
    findByIdVO: jest.fn(),
    findByPayment: jest.fn(),
    findActive: jest.fn(),
    findByStatus: jest.fn(),
    findPaginated: jest.fn(),
    findDue: jest.fn(),
    findStale: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    delete: jest.fn(),
    exists: jest.fn(),
    softDelete: jest.fn(),
  };
}

function makeRecurringEntity() {
  const e = RecurringPaymentEntity.create({
    id: RecurringIdVO.create(RECURRING_ID),
    now: '2025-01-15T10:00:00.000Z',
    props: {
      paymentId: PaymentIdVO.create(VALID_PAYMENT_ID),
      frequency: RecurringFrequencyVO.create('monthly', 1),
      amount: PaymentAmountVO.create(500, 'BDT'),
      startAt: '2025-02-01T00:00:00.000Z',
      nextRunAt: '2025-02-01T00:00:00.000Z',
    },
  });
  e.activate();
  return e;
}

describe('RecurringPaymentService', () => {
  let service: RecurringPaymentService;
  let mockRepo: ReturnType<typeof makeMockRepo>;

  beforeEach(() => {
    mockRepo = makeMockRepo();
    service = new RecurringPaymentService(mockRepo as unknown as RecurringPaymentRepository);
  });

  describe('create', () => {
    it('should create recurring with monthly interval', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.create(
        {
          paymentId: VALID_PAYMENT_ID,
          amount: 500,
          currency: 'BDT',
          interval: 'monthly' as never,
          intervalCount: 1,
          startAt: '2025-01-15T10:00:00.000Z',
        },
        'user-1',
      );
      expect(result.amount).toBe(500);
      expect(result.status).toBe('active');
    });

    it('should create with end date', async () => {
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.create(
        {
          paymentId: VALID_PAYMENT_ID,
          amount: 5000,
          currency: 'BDT',
          interval: 'yearly' as never,
          intervalCount: 1,
          startAt: '2025-01-15T10:00:00.000Z',
          endAt: '2030-01-15T10:00:00.000Z',
        },
        'user-1',
      );
      expect(result.endAt).toBe('2030-01-15T10:00:00.000Z');
    });
  });

  describe('pause', () => {
    it('should pause active recurring', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeRecurringEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.pause({ recurringId: RECURRING_ID }, 'admin');
      expect(result.status).toBe('paused');
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.pause({ recurringId: RECURRING_ID })).rejects.toThrow();
    });
  });

  describe('cancel', () => {
    it('should cancel recurring', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeRecurringEntity());
      mockRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.cancel(
        { recurringId: RECURRING_ID, reason: 'customer_request' },
        'admin',
      );
      expect(result.status).toBe('cancelled');
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.cancel({ recurringId: RECURRING_ID, reason: 'x' }),
      ).rejects.toThrow();
    });
  });

  describe('getById', () => {
    it('should return DTO', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makeRecurringEntity());
      const dto = await service.getById(RECURRING_ID);
      expect(dto.id).toBe(RECURRING_ID);
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(RECURRING_ID)).rejects.toThrow();
    });
  });

  describe('listByPayment', () => {
    it('should return empty', async () => {
      mockRepo.findByPayment.mockResolvedValue([]);
      expect(await service.listByPayment(VALID_PAYMENT_ID)).toHaveLength(0);
    });

    it('should return one', async () => {
      mockRepo.findByPayment.mockResolvedValue([makeRecurringEntity()]);
      expect(await service.listByPayment(VALID_PAYMENT_ID)).toHaveLength(1);
    });
  });

  describe('list', () => {
    it('should paginate', async () => {
      mockRepo.findPaginated.mockResolvedValue({
        items: [makeRecurringEntity()],
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
