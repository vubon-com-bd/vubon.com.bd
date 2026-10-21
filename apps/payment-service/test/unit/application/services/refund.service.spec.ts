/**
 * RefundService — Unit Tests (full branch coverage)
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

import { RefundService } from '@application/services/impl/refund.service';
import {
  RefundNotFoundApplicationError,
  RefundRequestError,
  RefundApprovalError,
  RefundRejectionError,
  PartialRefundError,
} from '@application/errors/refund.errors';
import type { RefundRepository } from '@domain/repositories/refund.repository.interface';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';
import { RefundEntity } from '@domain/entities/refund.entity';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { RefundAmountVO } from '@domain/primitives/refund-amount.vo';
import { RefundReasonVO } from '@domain/primitives/refund-reason.vo';
import { makePaymentEntity, VALID_PAYMENT_ID } from '@app-fixtures/payment-entity.fixture';
import { makeMockPaymentRepository } from '@app-fixtures/mock-helpers';

const REFUND_ID = '423e4567-e89b-42d3-a456-426614174099';

function makeMockRefundRepo() {
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
    findByStatus: jest.fn(),
    findPending: jest.fn(),
    findRetryable: jest.fn(),
    findExpired: jest.fn(),
    softDelete: jest.fn(),
  };
}

function makeCapturedPayment() {
  const entity = makePaymentEntity();
  entity.startProcessing();
  entity.capture(1000, 'ch_1');
  return entity;
}

function makeRefundEntity() {
  return RefundEntity.create({
    id: RefundIdVO.create(REFUND_ID),
    now: '2025-01-15T10:00:00.000Z',
    props: {
      paymentId: PaymentIdVO.create(VALID_PAYMENT_ID),
      amount: RefundAmountVO.create(100, 'BDT'),
      reason: RefundReasonVO.create('customer_request'),
    },
  });
}

describe('RefundService', () => {
  let service: RefundService;
  let refundRepo: ReturnType<typeof makeMockRefundRepo>;
  let paymentRepo: ReturnType<typeof makeMockPaymentRepository>;

  beforeEach(() => {
    refundRepo = makeMockRefundRepo();
    paymentRepo = makeMockPaymentRepository();
    service = new RefundService(
      refundRepo as unknown as RefundRepository,
      paymentRepo as unknown as PaymentRepository,
    );
  });

  // ═════════════ REQUEST ═════════════
  describe('request', () => {
    it('should create refund with explicit amount', async () => {
      paymentRepo.findByIdVO.mockResolvedValue(makeCapturedPayment());
      refundRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.request({ paymentId: VALID_PAYMENT_ID, amount: 100 });
      expect(result.success).toBe(true);
      expect(result.status).toBe('requested');
    });

    it('should create refund with default amount = remaining', async () => {
      paymentRepo.findByIdVO.mockResolvedValue(makeCapturedPayment());
      refundRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.request({ paymentId: VALID_PAYMENT_ID });
      expect(result.success).toBe(true);
    });

    it('should throw not found when payment missing', async () => {
      paymentRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.request({ paymentId: VALID_PAYMENT_ID, amount: 100 }),
      ).rejects.toThrow(RefundNotFoundApplicationError);
    });

    it('should wrap errors as RefundRequestError', async () => {
      paymentRepo.findByIdVO.mockResolvedValue(makeCapturedPayment());
      refundRepo.save.mockRejectedValue(new Error('DB error'));
      await expect(
        service.request({ paymentId: VALID_PAYMENT_ID, amount: 100 }),
      ).rejects.toThrow(RefundRequestError);
    });
  });

  // ═════════════ APPROVE ═════════════
  describe('approve', () => {
    it('should approve and start processing', async () => {
      refundRepo.findByIdVO.mockResolvedValue(makeRefundEntity());
      refundRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.approve({ refundId: REFUND_ID }, 'admin-1');
      expect(result.status).toBe('processing');
    });

    it('should throw RefundNotFoundApplicationError', async () => {
      refundRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.approve({ refundId: REFUND_ID }, 'admin')).rejects.toThrow(
        RefundNotFoundApplicationError,
      );
    });

    it('should wrap as RefundApprovalError on DB fail', async () => {
      refundRepo.findByIdVO.mockResolvedValue(makeRefundEntity());
      refundRepo.save.mockRejectedValue(new Error('DB error'));
      await expect(service.approve({ refundId: REFUND_ID }, 'admin')).rejects.toThrow(
        RefundApprovalError,
      );
    });
  });

  // ═════════════ REJECT ═════════════
  describe('reject', () => {
    it('should reject and set failureReason', async () => {
      refundRepo.findByIdVO.mockResolvedValue(makeRefundEntity());
      refundRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.reject({ refundId: REFUND_ID, reason: 'invalid' }, 'admin');
      expect(result.status).toBe('rejected');
      expect(result.failureReason).toBe('invalid');
    });

    it('should throw not found', async () => {
      refundRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.reject({ refundId: REFUND_ID, reason: 'x' }, 'admin'),
      ).rejects.toThrow(RefundNotFoundApplicationError);
    });

    it('should wrap as RefundRejectionError on DB fail', async () => {
      refundRepo.findByIdVO.mockResolvedValue(makeRefundEntity());
      refundRepo.save.mockRejectedValue(new Error('DB error'));
      await expect(
        service.reject({ refundId: REFUND_ID, reason: 'x' }, 'admin'),
      ).rejects.toThrow(RefundRejectionError);
    });
  });

  // ═════════════ PARTIAL ═════════════
  describe('partial', () => {
    it('should create partial refund', async () => {
      paymentRepo.findByIdVO.mockResolvedValue(makeCapturedPayment());
      refundRepo.save.mockImplementation(async (e: unknown) => e);
      const result = await service.partial({
        paymentId: VALID_PAYMENT_ID,
        amount: 200,
        currency: 'BDT',
        reason: 'partial',
      });
      expect(result.amount).toBe(200);
    });

    it('should throw not found when payment missing', async () => {
      paymentRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.partial({
          paymentId: VALID_PAYMENT_ID,
          amount: 100,
          currency: 'BDT',
          reason: 'partial',
        }),
      ).rejects.toThrow(RefundNotFoundApplicationError);
    });

    it('should wrap as PartialRefundError on DB fail', async () => {
      paymentRepo.findByIdVO.mockResolvedValue(makeCapturedPayment());
      refundRepo.save.mockRejectedValue(new Error('DB error'));
      await expect(
        service.partial({
          paymentId: VALID_PAYMENT_ID,
          amount: 100,
          currency: 'BDT',
          reason: 'partial',
        }),
      ).rejects.toThrow(PartialRefundError);
    });
  });

  // ═════════════ GET / LIST / STATS ═════════════
  describe('getById', () => {
    it('should return DTO', async () => {
      refundRepo.findByIdVO.mockResolvedValue(makeRefundEntity());
      const dto = await service.getById(REFUND_ID);
      expect(dto.id).toBe(REFUND_ID);
    });

    it('should throw not found', async () => {
      refundRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(REFUND_ID)).rejects.toThrow(
        RefundNotFoundApplicationError,
      );
    });
  });

  describe('listByPayment', () => {
    it('should return empty array', async () => {
      refundRepo.findByPayment.mockResolvedValue([]);
      const result = await service.listByPayment(VALID_PAYMENT_ID);
      expect(result).toHaveLength(0);
    });

    it('should map multiple entities', async () => {
      refundRepo.findByPayment.mockResolvedValue([makeRefundEntity()]);
      const result = await service.listByPayment(VALID_PAYMENT_ID);
      expect(result).toHaveLength(1);
    });
  });

  describe('list', () => {
    it('should paginate', async () => {
      refundRepo.findPaginated.mockResolvedValue({
        items: [makeRefundEntity()],
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
      refundRepo.getStats.mockResolvedValue({
        total: 5,
        totalRefunded: 500,
        currency: 'BDT',
        byStatus: { completed: 5 },
        byReason: { customer_request: 5 },
      });
      const stats = await service.getStats();
      expect(stats.total).toBe(5);
    });
  });
});
