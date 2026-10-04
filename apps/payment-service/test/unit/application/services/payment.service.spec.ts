import { jest } from '@jest/globals';
import { PaymentService } from '../../../../src/module/application/services/impl/payment.service.js';
import type { PaymentRepository } from '../../../../src/module/domain/repositories/payment.repository.interface.js';
import type { TransactionRepository } from '../../../../src/module/domain/repositories/transaction.repository.interface.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

// ─── Mock Repos ───
const mockPaymentRepo = {
  save: jest.fn(async (p: PaymentEntity) => p),
  findByIdVO: jest.fn(),
  findById: jest.fn(),
  findByOrderId: jest.fn(),
  findByUserId: jest.fn(),
  findByStatus: jest.fn(),
  findByGateway: jest.fn(),
  findByIdempotencyKey: jest.fn(),
  findLatestByOrderId: jest.fn(),
  findPaginated: jest.fn(),
  existsByIdempotencyKey: jest.fn(),
  exists: jest.fn(),
  findAll: jest.fn(),
  delete: jest.fn(),
  softDelete: jest.fn(),
  countByUser: jest.fn(),
  getStats: jest.fn(),
  findExpiredAuthorizations: jest.fn(),
  findStalePending: jest.fn(),
  findRetryable: jest.fn(),
};

const mockTxRepo = {
  save: jest.fn(async (t: unknown) => t),
  findByIdVO: jest.fn(),
  findByPaymentId: jest.fn(async () => []),
  findById: jest.fn(),
  findAll: jest.fn(),
  findByOrderId: jest.fn(),
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

function makePayment(): PaymentEntity {
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

describe('PaymentService', () => {
  let service: PaymentService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PaymentService(
      mockPaymentRepo as unknown as PaymentRepository,
      mockTxRepo as unknown as TransactionRepository,
    );
  });

  describe('initiate()', () => {
    it('creates a new payment when no idempotency hit', async () => {
      mockPaymentRepo.findByIdempotencyKey.mockResolvedValue(null);
      const out = await service.initiate(
        { orderId: UUID, method: 'mobile_banking', amount: 1000, currency: 'BDT' },
        UUID,
      );
      expect(out.success).toBe(true);
      expect(out.paymentId).toBeDefined();
      expect(out.status).toBe('pending');
      expect(mockPaymentRepo.save).toHaveBeenCalledTimes(1);
      expect(mockTxRepo.save).toHaveBeenCalledTimes(1);
    });

    it('returns existing payment on idempotency hit', async () => {
      const existing = makePayment();
      mockPaymentRepo.findByIdempotencyKey.mockResolvedValue(existing);
      const out = await service.initiate(
        {
          orderId: UUID,
          method: 'mobile_banking',
          amount: 1000,
          currency: 'BDT',
          idempotencyKey: 'idem-key-abc-1',
        },
        UUID,
      );
      expect(out.paymentId).toBe(existing.id);
      expect(mockPaymentRepo.save).not.toHaveBeenCalled();
    });
  });

  describe('capture()', () => {
    it('captures an authorized payment', async () => {
      const p = makePayment();
      p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
      p.authorize(GatewayPaymentIdVO.create('gw_1'));
      mockPaymentRepo.findByIdVO.mockResolvedValue(p);
      const out = await service.capture({ paymentId: UUID });
      expect(out.status).toBe('captured');
      expect(mockPaymentRepo.save).toHaveBeenCalled();
    });
  });

  describe('fail()', () => {
    it('fails a pending payment', async () => {
      const p = makePayment();
      mockPaymentRepo.findByIdVO.mockResolvedValue(p);
      const out = await service.fail({ paymentId: UUID, reason: 'network' });
      expect(out.status).toBe('failed');
    });
  });

  describe('cancel()', () => {
    it('cancels a pending payment', async () => {
      const p = makePayment();
      mockPaymentRepo.findByIdVO.mockResolvedValue(p);
      const out = await service.cancel({ paymentId: UUID });
      expect(out.status).toBe('cancelled');
    });
  });

  describe('retry()', () => {
    it('retries a failed payment', async () => {
      const p = makePayment();
      p.fail(FailureReasonVO.create('network'));
      mockPaymentRepo.findByIdVO.mockResolvedValue(p);
      const out = await service.retry({ paymentId: UUID });
      expect(out.status).toBe('pending');
      expect(out.retryAttempts).toBe(1);
    });
  });

  describe('chargeback()', () => {
    it('marks captured payment as chargeback', async () => {
      const p = makePayment();
      p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
      p.authorize(GatewayPaymentIdVO.create('gw_1'));
      p.capture();
      mockPaymentRepo.findByIdVO.mockResolvedValue(p);
      const out = await service.chargeback({ paymentId: UUID, amount: 1000 });
      expect(out.status).toBe('chargeback');
    });
  });

  describe('markPaid()', () => {
    it('marks captured payment as paid', async () => {
      const p = makePayment();
      p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
      p.authorize(GatewayPaymentIdVO.create('gw_1'));
      p.capture();
      mockPaymentRepo.findByIdVO.mockResolvedValue(p);
      const out = await service.markPaid(UUID);
      expect(out.status).toBe('paid');
    });
  });

  describe('getById()', () => {
    it('throws if not found', async () => {
      mockPaymentRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow();
    });

    it('returns mapped DTO', async () => {
      mockPaymentRepo.findByIdVO.mockResolvedValue(makePayment());
      const dto = await service.getById(UUID);
      expect(dto.id).toBe(UUID);
    });
  });

  describe('list()', () => {
    it('returns paginated list', async () => {
      mockPaymentRepo.findPaginated.mockResolvedValue({
        items: [makePayment()],
        total: 1,
        page: 1,
        limit: 20,
        totalPages: 1,
      });
      const out = await service.list({ page: 1, limit: 20 });
      expect(out.total).toBe(1);
    });
  });

  describe('getStats()', () => {
    it('returns stats from repo', async () => {
      mockPaymentRepo.getStats.mockResolvedValue({
        totalPayments: 5,
        totalCaptured: 4000,
        totalRefunded: 500,
        averageAmount: 900,
        currency: 'BDT',
        byStatus: { captured: 4, refunded: 1 },
        byGateway: { bkash: 3, nagad: 2 },
      });
      const out = await service.getStats();
      expect(out.totalPayments).toBe(5);
      expect(out.totalCaptured).toBe(4000);
    });
  });
});
