import { jest } from '@jest/globals';
import { OrderCancelService } from '../../../../src/module/application/services/impl/order-cancel.service.js';
import { OrderCancelEntity } from '../../../../src/module/domain/entities/order-cancel.entity.js';
import { CancelReasonVO } from '../../../../src/module/domain/value-objects/primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '../../../../src/module/domain/value-objects/primitives/cancel-status.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import {
  CancelNotFoundApplicationError,
} from '../../../../src/module/application/errors/cancel.errors.js';
import { OrderNotFoundApplicationError } from '../../../../src/module/application/errors/order.errors.js';
import { makeOrder, makeMockOrderRepo, UUID_ORDER, UUID_CUSTOMER } from './_helpers.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_CANCEL = 'c1111111-1111-4111-8111-111111111111';
const UUID_ADMIN = '99999999-9999-4999-8999-999999999999';

function makeCancel(): OrderCancelEntity {
  return OrderCancelEntity.create({
    id: UUID_CANCEL,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID_ORDER),
      reason: CancelReasonVO.create('customer_request'),
      status: CancelStatusVO.requested(),
      requestedBy: CustomerIdVO.create(UUID_CUSTOMER),
      currency: 'BDT',
      restockInventory: true,
      requestedAt: NOW,
    },
  });
}

function makeMockCancelRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByOrderId: jest.fn().mockResolvedValue([]),
    findActiveByOrder: jest.fn().mockResolvedValue(null),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByCustomerId: jest.fn().mockResolvedValue([]),
    existsByOrderId: jest.fn().mockResolvedValue(false),
    findAll: jest.fn().mockResolvedValue([]),
    exists: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockImplementation(async (c: OrderCancelEntity) => c),
    delete: jest.fn().mockResolvedValue(undefined),
  };
}

describe('OrderCancelService', () => {
  let cancelRepo: ReturnType<typeof makeMockCancelRepo>;
  let orderRepo: ReturnType<typeof makeMockOrderRepo>;
  let service: OrderCancelService;

  beforeEach(() => {
    cancelRepo = makeMockCancelRepo();
    orderRepo = makeMockOrderRepo();
    service = new OrderCancelService(cancelRepo as never, orderRepo as never);
  });

  describe('request()', () => {
    it('creates cancel for pending order (auto-approve applies)', async () => {
      // Use fresh order so cancel window (24h from createdAt) is valid
      const freshOrder = makeOrder();
      (freshOrder as unknown as { createdAt: string }).createdAt = new Date().toISOString();
      orderRepo.findById.mockResolvedValue(freshOrder);
      const result = await service.request({
        orderId: UUID_ORDER,
        reason: 'customer_request',
      } as never, UUID_CUSTOMER);
      expect(cancelRepo.save).toHaveBeenCalled();
      expect(result.orderId).toBe(UUID_ORDER);
    });

    it('throws when order missing', async () => {
      orderRepo.findById.mockResolvedValue(null);
      await expect(
        service.request({ orderId: UUID_ORDER, reason: 'customer_request' } as never),
      ).rejects.toThrow(OrderNotFoundApplicationError);
    });
  });

  describe('approve()', () => {
    it('approves requested cancel', async () => {
      cancelRepo.findById.mockResolvedValue(makeCancel());
      const result = await service.approve({
        cancelId: UUID_CANCEL,
        orderId: UUID_ORDER,
        refundAmount: 100,
      } as never, UUID_ADMIN);
      expect(result.status).toBe('approved');
      expect(result.refundAmount).toBe(100);
    });

    it('throws when not found', async () => {
      cancelRepo.findById.mockResolvedValue(null);
      await expect(
        service.approve({ cancelId: 'x' } as never, UUID_ADMIN),
      ).rejects.toThrow(CancelNotFoundApplicationError);
    });
  });

  describe('reject()', () => {
    it('rejects requested cancel', async () => {
      cancelRepo.findById.mockResolvedValue(makeCancel());
      const result = await service.reject({
        cancelId: UUID_CANCEL,
        orderId: UUID_ORDER,
        reason: 'already shipped',
      } as never, UUID_ADMIN);
      expect(result.status).toBe('rejected');
    });
  });

  describe('getById()', () => {
    it('returns DTO', async () => {
      cancelRepo.findById.mockResolvedValue(makeCancel());
      const result = await service.getById(UUID_CANCEL);
      expect(result.id).toBe(UUID_CANCEL);
    });

    it('throws when missing', async () => {
      cancelRepo.findById.mockResolvedValue(null);
      await expect(service.getById('x')).rejects.toThrow(CancelNotFoundApplicationError);
    });
  });

  describe('listByOrder()', () => {
    it('returns array', async () => {
      cancelRepo.findByOrderId.mockResolvedValue([makeCancel()]);
      const result = await service.listByOrder(UUID_ORDER);
      expect(result).toHaveLength(1);
    });
  });

  describe('getActiveByOrder()', () => {
    it('returns null when none', async () => {
      cancelRepo.findActiveByOrder.mockResolvedValue(null);
      const result = await service.getActiveByOrder(UUID_ORDER);
      expect(result).toBeNull();
    });

    it('returns DTO when found', async () => {
      cancelRepo.findActiveByOrder.mockResolvedValue(makeCancel());
      const result = await service.getActiveByOrder(UUID_ORDER);
      expect(result?.id).toBe(UUID_CANCEL);
    });
  });
});
