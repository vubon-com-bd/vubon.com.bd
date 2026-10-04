import { jest } from '@jest/globals';
import { WebhookService } from '../../../../src/module/application/services/impl/webhook.service.js';
import type { WebhookEventRepository } from '../../../../src/module/domain/repositories/webhook-event.repository.interface.js';
import type { PaymentRepository } from '../../../../src/module/domain/repositories/payment.repository.interface.js';
import { WebhookEventEntity } from '../../../../src/module/domain/entities/webhook-event.entity.js';
import { PaymentEntity } from '../../../../src/module/domain/entities/payment.entity.js';
import { PaymentTypeVO } from '../../../../src/module/domain/value-objects/primitives/payment-type.vo.js';
import { PaymentMethodVO } from '../../../../src/module/domain/value-objects/primitives/payment-method.vo.js';
import { PaymentGatewayVO } from '../../../../src/module/domain/value-objects/primitives/payment-gateway.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../../../../src/module/domain/value-objects/primitives/user-id.vo.js';
import { GatewayPaymentIdVO } from '../../../../src/module/domain/value-objects/primitives/gateway-payment-id.vo.js';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
const NOW = '2026-01-01T00:00:00.000Z';

const mockWhRepo = {
  save: jest.fn(async (e: WebhookEventEntity) => e),
  findById: jest.fn(),
  findByIdVO: jest.fn(),
  findAll: jest.fn(),
  findByGatewayEventId: jest.fn(async () => null),
  existsByGatewayEventId: jest.fn(),
  findByPaymentId: jest.fn(),
  findUnprocessed: jest.fn(async () => []),
  findPaginated: jest.fn(),
  exists: jest.fn(),
  delete: jest.fn(),
  countUnprocessed: jest.fn(),
  findProcessedOlderThan: jest.fn(),
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

describe('WebhookService', () => {
  let service: WebhookService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new WebhookService(
      mockWhRepo as unknown as WebhookEventRepository,
      mockPaymentRepo as unknown as PaymentRepository,
    );
  });

  describe('process()', () => {
    it('persists a fresh webhook event', async () => {
      mockWhRepo.findByGatewayEventId.mockResolvedValue(null);
      mockPaymentRepo.findByIdVO.mockResolvedValue(null);
      const out = await service.process({
        gateway: 'bkash',
        gatewayEventId: 'evt_1',
        eventType: 'payment.succeeded',
        payload: { paymentId: UUID, status: 'success' },
      });
      expect(out.success).toBe(true);
      expect(mockWhRepo.save).toHaveBeenCalled();
    });

    it('handles duplicate webhook', async () => {
      const existing = WebhookEventEntity.receive({
        id: UUID,
        now: NOW,
        props: {
          gateway: 'bkash',
          gatewayEventId: 'evt_1',
          eventType: 'payment.succeeded',
          payload: {},
        },
      });
      mockWhRepo.findByGatewayEventId.mockResolvedValue(existing);
      const out = await service.process({
        gateway: 'bkash',
        gatewayEventId: 'evt_1',
        eventType: 'payment.succeeded',
        payload: {},
      });
      expect(out.webhookId).toBe(existing.id);
    });

    it('routes payment.succeeded to payment capture', async () => {
      const p = makePayment();
      p.startProcessing(GatewayPaymentIdVO.create('gw_1'));
      mockWhRepo.findByGatewayEventId.mockResolvedValue(null);
      mockPaymentRepo.findByIdVO.mockResolvedValue(p);
      const out = await service.process({
        gateway: 'bkash',
        gatewayEventId: 'evt_2',
        eventType: 'payment.succeeded',
        payload: { paymentId: UUID, status: 'success' },
      });
      expect(out.success).toBe(true);
      expect(mockPaymentRepo.save).toHaveBeenCalled();
    });

    it('routes payment.failed to payment failure', async () => {
      const p = makePayment();
      mockWhRepo.findByGatewayEventId.mockResolvedValue(null);
      mockPaymentRepo.findByIdVO.mockResolvedValue(p);
      const out = await service.process({
        gateway: 'bkash',
        gatewayEventId: 'evt_3',
        eventType: 'payment.failed',
        payload: { paymentId: UUID, reason: 'declined' },
      });
      expect(out.success).toBe(true);
    });
  });

  describe('getById()', () => {
    it('throws when not found', async () => {
      mockWhRepo.findById.mockResolvedValue(null);
      await expect(service.getById(UUID)).rejects.toThrow();
    });
  });

  describe('list()', () => {
    it('returns paginated list', async () => {
      mockWhRepo.findPaginated.mockResolvedValue({
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0,
      });
      const out = await service.list({ page: 1, limit: 20 });
      expect(out.total).toBe(0);
    });
  });

  describe('retryFailed()', () => {
    it('returns counts', async () => {
      mockWhRepo.findUnprocessed.mockResolvedValue([]);
      const out = await service.retryFailed();
      expect(out).toEqual({ processed: 0, failed: 0 });
    });
  });
});
