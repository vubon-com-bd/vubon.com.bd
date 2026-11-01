/**
 * PaymentService — Unit Tests
 */
import { describe, it, expect, beforeEach, jest } from '@jest/globals';

// ⚠️ Mock @nestjs/common before importing the service
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

import { PaymentService } from '@application/services/impl/payment.service';
import {
  PaymentNotFoundApplicationError,
  PaymentInitiationError,
  PaymentConfirmationError,
} from '@application/errors/payment.errors';
import type { IDomainEventBridge } from '@application/services/impl/payment.service';
import type { PaymentRepository } from '@domain/repositories/payment.repository.interface';
import { makePaymentEntity, VALID_ORDER_ID, VALID_USER_ID, VALID_PAYMENT_ID } from '@app-fixtures/payment-entity.fixture';
import { makeMockPaymentRepository, makeMockEventBridge } from '@app-fixtures/mock-helpers';

describe('PaymentService', () => {
  let service: PaymentService;
  let mockRepo: ReturnType<typeof makeMockPaymentRepository>;
  let mockBridge: ReturnType<typeof makeMockEventBridge>;

  beforeEach(() => {
    mockRepo = makeMockPaymentRepository();
    mockBridge = makeMockEventBridge();
    service = new PaymentService(
      mockRepo as unknown as PaymentRepository,
      mockBridge as unknown as IDomainEventBridge,
    );
  });

  describe('initiate', () => {
    it('should create, validate, save, and publish event', async () => {
      const dto = {
        orderId: VALID_ORDER_ID,
        method: 'card' as never,
        gateway: 'stripe' as never,
        amount: 1000,
        currency: 'BDT',
        returnUrl: 'https://example.com/return',
      };
      mockRepo.save.mockImplementation(async (e: unknown) => e);

      const result = await service.initiate(dto, VALID_USER_ID);
      expect(result.success).toBe(true);
      expect(result.paymentId).toMatch(/^[0-9a-f-]{36}$/);
      expect(result.status).toBe('pending');
      expect(result.redirectUrl).toBe('https://example.com/return');
      expect(mockRepo.save).toHaveBeenCalled();
      expect(mockBridge.publishFromEntity).toHaveBeenCalled();
    });

    it('should throw PaymentInitiationError on invalid method', async () => {
      const dto = {
        orderId: VALID_ORDER_ID,
        method: 'telepathy' as never,
        amount: 1000,
        currency: 'BDT',
      };
      await expect(service.initiate(dto, VALID_USER_ID)).rejects.toThrow(PaymentInitiationError);
    });

    it('should throw on missing gateway for online method', async () => {
      const dto = {
        orderId: VALID_ORDER_ID,
        method: 'card' as never,
        amount: 1000,
        currency: 'BDT',
      };
      await expect(service.initiate(dto, VALID_USER_ID)).rejects.toThrow();
    });
  });

  describe('confirm', () => {
    it('should capture and save', async () => {
      const entity = makePaymentEntity();
      entity.startProcessing();
      mockRepo.findByIdVO.mockResolvedValue(entity);
      mockRepo.save.mockImplementation(async (e: unknown) => e);

      const result = await service.confirm({
        paymentId: VALID_PAYMENT_ID,
        gatewayReference: 'stripe_ch_123',
        confirmedAmount: 1000,
      });

      expect(result.status).toBe('captured');
      expect(mockRepo.save).toHaveBeenCalled();
      expect(mockBridge.publishFromEntity).toHaveBeenCalled();
    });

    it('should throw PaymentNotFoundApplicationError when not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.confirm({ paymentId: VALID_PAYMENT_ID })).rejects.toThrow(
        PaymentNotFoundApplicationError,
      );
    });

    it('should wrap other errors into PaymentConfirmationError', async () => {
      const entity = makePaymentEntity();
      mockRepo.findByIdVO.mockResolvedValue(entity);
      mockRepo.save.mockRejectedValue(new Error('DB failure'));

      await expect(
        service.confirm({ paymentId: VALID_PAYMENT_ID, gatewayReference: 'ch_1' }),
      ).rejects.toThrow(PaymentConfirmationError);
    });
  });

  describe('cancel', () => {
    it('should cancel pending payment', async () => {
      const entity = makePaymentEntity();
      mockRepo.findByIdVO.mockResolvedValue(entity);
      mockRepo.save.mockImplementation(async (e: unknown) => e);

      const result = await service.cancel({
        paymentId: VALID_PAYMENT_ID,
        reason: 'customer_request',
      });
      expect(result.status).toBe('cancelled');
    });

    it('should throw not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.cancel({ paymentId: VALID_PAYMENT_ID, reason: 'x' }),
      ).rejects.toThrow(PaymentNotFoundApplicationError);
    });
  });

  describe('retry', () => {
    it('should start processing on retry', async () => {
      const entity = makePaymentEntity();
      mockRepo.findByIdVO.mockResolvedValue(entity);
      mockRepo.save.mockImplementation(async (e: unknown) => e);

      const result = await service.retry({ paymentId: VALID_PAYMENT_ID });
      expect(result.status).toBe('processing');
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.retry({ paymentId: VALID_PAYMENT_ID })).rejects.toThrow();
    });
  });

  describe('verify', () => {
    it('should return DTO for valid payment', async () => {
      const entity = makePaymentEntity();
      mockRepo.findByIdVO.mockResolvedValue(entity);
      const result = await service.verify({ paymentId: VALID_PAYMENT_ID }, VALID_USER_ID);
      expect(result.id).toBe(VALID_PAYMENT_ID);
    });

    it('should throw on not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(
        service.verify({ paymentId: VALID_PAYMENT_ID }, VALID_USER_ID),
      ).rejects.toThrow();
    });
  });

  describe('getById', () => {
    it('should return DTO', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makePaymentEntity());
      const dto = await service.getById(VALID_PAYMENT_ID);
      expect(dto.id).toBe(VALID_PAYMENT_ID);
      expect(dto.userId).toBe(VALID_USER_ID);
    });

    it('should throw not found', async () => {
      mockRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(VALID_PAYMENT_ID)).rejects.toThrow(
        PaymentNotFoundApplicationError,
      );
    });
  });

  describe('getPublic', () => {
    it('should return public DTO without userId', async () => {
      mockRepo.findByIdVO.mockResolvedValue(makePaymentEntity());
      const dto = await service.getPublic(VALID_PAYMENT_ID);
      expect(dto.id).toBe(VALID_PAYMENT_ID);
      expect('userId' in dto).toBe(false);
    });
  });

  describe('list', () => {
    it('should return paginated DTO', async () => {
      mockRepo.findPaginated.mockResolvedValue({
        items: [makePaymentEntity()],
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      });
      const result = await service.list({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(1);
      expect(result.total).toBe(1);
    });

    it('should handle empty list', async () => {
      mockRepo.findPaginated.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      });
      const result = await service.list({ page: 1, limit: 10 });
      expect(result.items).toHaveLength(0);
    });
  });

  describe('getStats', () => {
    it('should compute average', async () => {
      mockRepo.getStats.mockResolvedValue({
        total: 10,
        totalAmount: 5000,
        currency: 'BDT',
        byStatus: { paid: 8, failed: 2 },
        byMethod: { card: 10 },
      });
      const stats = await service.getStats();
      expect(stats.total).toBe(10);
      expect(stats.averageAmount).toBe(500);
    });

    it('should handle zero total', async () => {
      mockRepo.getStats.mockResolvedValue({
        total: 0,
        totalAmount: 0,
        currency: 'BDT',
        byStatus: {},
        byMethod: {},
      });
      const stats = await service.getStats();
      expect(stats.averageAmount).toBe(0);
    });
  });
});

// ─────────────────────────────────────────
// Additional branch-coverage tests
// ─────────────────────────────────────────
describe('PaymentService — branch coverage', () => {
  let service: PaymentService;
  let mockRepo: ReturnType<typeof makeMockPaymentRepository>;
  let mockBridge: ReturnType<typeof makeMockEventBridge>;

  beforeEach(() => {
    mockRepo = makeMockPaymentRepository();
    mockBridge = makeMockEventBridge();
    service = new PaymentService(
      mockRepo as unknown as PaymentRepository,
      mockBridge as unknown as IDomainEventBridge,
    );
  });

  it('should infer cash_on_delivery as offline', async () => {
    mockRepo.save.mockImplementation(async (e: unknown) => e);
    const result = await service.initiate(
      {
        orderId: VALID_ORDER_ID,
        method: 'cash_on_delivery' as never,
        amount: 1000,
        currency: 'BDT',
      },
      VALID_USER_ID,
    );
    expect(result.success).toBe(true);
  });

  it('should infer wallet as instant', async () => {
    mockRepo.save.mockImplementation(async (e: unknown) => e);
    const result = await service.initiate(
      {
        orderId: VALID_ORDER_ID,
        method: 'wallet' as never,
        amount: 1000,
        currency: 'BDT',
      },
      VALID_USER_ID,
    );
    expect(result.success).toBe(true);
  });

  it('should infer credit_card as online', async () => {
    mockRepo.save.mockImplementation(async (e: unknown) => e);
    const result = await service.initiate(
      {
        orderId: VALID_ORDER_ID,
        method: 'credit_card' as never,
        gateway: 'stripe' as never,
        amount: 1000,
        currency: 'BDT',
      },
      VALID_USER_ID,
    );
    expect(result.success).toBe(true);
  });

  it('should infer default as online for unknown method fallback', async () => {
    mockRepo.save.mockImplementation(async (e: unknown) => e);
    // bank_transfer is a valid method but not in the switch → default case
    const result = await service.initiate(
      {
        orderId: VALID_ORDER_ID,
        method: 'bank_transfer' as never,
        gateway: 'stripe' as never,
        amount: 1000,
        currency: 'BDT',
      },
      VALID_USER_ID,
    );
    expect(result.success).toBe(true);
  });

  it('should compute averageAmount > 0 when total > 0', async () => {
    mockRepo.getStats.mockResolvedValue({
      total: 10,
      totalAmount: 5000,
      currency: 'BDT',
      byStatus: {},
      byMethod: {},
    });
    const stats = await service.getStats();
    expect(stats.averageAmount).toBe(500);
  });

  it('should handle missing byMethod gracefully', async () => {
    mockRepo.getStats.mockResolvedValue({
      total: 5,
      totalAmount: 1000,
      currency: 'BDT',
      byStatus: { paid: 5 },
      // byMethod missing
    });
    const stats = await service.getStats();
    expect(stats.byMethod).toEqual({});
  });

  it('should throw PaymentNotFoundApplicationError on getPublic not found', async () => {
    mockRepo.findByIdVO.mockResolvedValue(null);
    await expect(service.getPublic(VALID_PAYMENT_ID)).rejects.toThrow(
      PaymentNotFoundApplicationError,
    );
  });
});
