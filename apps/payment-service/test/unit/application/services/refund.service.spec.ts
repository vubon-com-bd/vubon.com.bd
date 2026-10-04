import { jest } from '@jest/globals';
import { RefundService } from '../../../../src/module/application/services/impl/refund.service.js';
import type { RefundRepository } from '../../../../src/module/domain/repositories/refund.repository.interface.js';
import type { PaymentRepository } from '../../../../src/module/domain/repositories/payment.repository.interface.js';
import type { TransactionRepository } from '../../../../src/module/domain/repositories/transaction.repository.interface.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { RefundEntity } from '../../../../src/module/domain/entities/refund.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { PaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/payment-id.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';
import { RefundReasonVO } from '../../../../src/module/domain/value-objects/primitives/refund-reason.vo.js';
import { FailureReasonVO } from '../../../../src/module/domain/value-objects/primitives/failure-reason.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

const mockRefundRepo = {
  save: jest.fn(async (r: RefundEntity) => r),
  findByIdVO: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  findByPaymentId: jest.fn(),
  findByOrderId: jest.fn(),
  findByStatus: jest.fn(),
  findPaginated: jest.fn(),
  exists: jest.fn(),
  delete: jest.fn(),
  sumSuccessfulByPaymentId: jest.fn(),
  countByPaymentId: jest.fn(),
  findStalePending: jest.fn(),
};

const mockPaymentRepo = {
  save: jest.fn(async (p: PaymentEntity) => p),
  findByIdVO: jest.fn(),
  findById: jest.fn(),
  findAll: jest.fn(),
  findByOrderId: jest.fn(),
  findByUserId: jest.fn(),
  findByStatus: jest.fn(),
  findByGateway: jest.fn(),
  findByIdempotencyKey: jest.fn(),
  findLatestByOrderId: jest.fn(),
  findPaginated: jest.fn(),
  existsByIdempotencyKey: jest.fn(),
  exists: jest.fn(),
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
  findById: jest.fn(),
  findAll: jest.fn(),
  findByPaymentId: jest.fn(),
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

function makeCapturedPayment(amount = 1000): PaymentEntity {
  const p = PaymentEntity.create({
    id: UUID,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID),
      userId: UserIdVO.create(UUID),
      type: PaymentTypeVO.oneTime(),
      method: PaymentMethodVO.create('mobile_banking'),
      gateway: PaymentGatewayVO.create('bkash'),
      amount,
      currency: 'BDT',
    },
  });
  p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
  p.authorize(GatewayPaymentIdVO.create('gw_1'));
  p.capture();
  return p;
}

function makeRefund(): RefundEntity {
  return RefundEntity.request({
    id: UUID,
    now: NOW,
    props: {
      paymentId: PaymentIdVO.create(UUID),
      amount: 500,
      currency: 'BDT',
      reason: RefundReasonVO.create('customer requested'),
    },
  });
}

describe('RefundService', () => {
  let service: RefundService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new RefundService(
      mockRefundRepo as unknown as RefundRepository,
      mockPaymentRepo as unknown as PaymentRepository,
      mockTxRepo as unknown as TransactionRepository,
    );
  });

  describe('request()', () => {
    it('creates refund for eligible payment', async () => {
      mockPaymentRepo.findByIdVO.mockResolvedValue(makeCapturedPayment());
      const out = await service.request({
        paymentId: UUID,
        amount: 500,
        reason: 'damaged',
      });
      expect(out.success).toBe(true);
      expect(out.refundedAmount).toBe(500);
    });

    it('rejects refund for pending payment', async () => {
      const pending = PaymentEntity.create({
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
      mockPaymentRepo.findByIdVO.mockResolvedValue(pending);
      await expect(
        service.request({ paymentId: UUID, amount: 500, reason: 'x' }),
      ).rejects.toThrow();
    });

    it('throws when payment not found', async () => {
      mockPaymentRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.request({ paymentId: UUID })).rejects.toThrow();
    });
  });

  describe('approve()', () => {
    it('approves a pending refund', async () => {
      mockRefundRepo.findByIdVO.mockResolvedValue(makeRefund());
      const out = await service.approve({ refundId: UUID });
      expect(out.status).toBe('pending'); // stays pending until processed
    });
  });

  describe('process()', () => {
    it('starts processing a refund', async () => {
      const r = makeRefund();
      mockRefundRepo.findByIdVO.mockResolvedValue(r);
      const out = await service.process({ refundId: UUID, gatewayRefundId: 'gw_rf_1' });
      expect(out.status).toBe('processing');
      expect(out.gatewayRefundId).toBe('gw_rf_1');
    });
  });

  describe('complete()', () => {
    it('marks refund succeeded and updates payment', async () => {
      const r = makeRefund();
      r.startProcessing();
      mockRefundRepo.findByIdVO.mockResolvedValue(r);
      mockPaymentRepo.findByIdVO.mockResolvedValue(makeCapturedPayment());
      const out = await service.complete({ refundId: UUID, gatewayRefundId: 'gw_rf_1' });
      expect(out.status).toBe('succeeded');
      expect(mockPaymentRepo.save).toHaveBeenCalled();
      expect(mockTxRepo.save).toHaveBeenCalled();
    });
  });

  describe('fail()', () => {
    it('fails a refund', async () => {
      mockRefundRepo.findByIdVO.mockResolvedValue(makeRefund());
      const out = await service.fail({ refundId: UUID, reason: 'gateway rejected' });
      expect(out.status).toBe('failed');
    });
  });

  describe('cancel()', () => {
    it('cancels a pending refund', async () => {
      mockRefundRepo.findByIdVO.mockResolvedValue(makeRefund());
      const out = await service.cancel({ refundId: UUID });
      expect(out.status).toBe('cancelled');
    });
  });

  describe('getById()', () => {
    it('throws when not found', async () => {
      mockRefundRepo.findByIdVO.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow();
    });
  });

  describe('list()', () => {
    it('returns paginated list', async () => {
      mockRefundRepo.findPaginated.mockResolvedValue({
        items: [makeRefund()],
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
