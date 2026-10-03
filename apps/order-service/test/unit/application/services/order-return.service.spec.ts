import { jest } from '@jest/globals';
import { OrderReturnService } from '../../../../src/module/application/services/impl/order-return.service.js';
import { OrderReturnEntity } from '../../../../src/module/domain/entities/order-return.entity.js';
import { ReturnReasonVO } from '../../../../src/module/domain/value-objects/primitives/return-reason.vo.js';
import { ReturnStatusVO } from '../../../../src/module/domain/value-objects/primitives/return-status.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { OrderItemIdVO } from '../../../../src/module/domain/value-objects/primitives/order-item-id.vo.js';
import { CustomerIdVO } from '../../../../src/module/domain/value-objects/primitives/customer-id.vo.js';
import { ReturnNotFoundApplicationError } from '../../../../src/module/application/errors/return.errors.js';
import { OrderNotFoundApplicationError } from '../../../../src/module/application/errors/order.errors.js';
import {
  makeOrder,
  makeMockOrderRepo,
  UUID_ORDER,
  UUID_CUSTOMER,
  UUID_ITEM,
} from './_helpers.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_RETURN = 'r1111111-1111-4111-8111-111111111111';

function makeReturn(): OrderReturnEntity {
  return OrderReturnEntity.create({
    id: UUID_RETURN,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID_ORDER),
      customerId: CustomerIdVO.create(UUID_CUSTOMER),
      status: ReturnStatusVO.requested(),
      reason: ReturnReasonVO.create('defective'),
      itemIds: [OrderItemIdVO.create(UUID_ITEM)],
      images: [],
      currency: 'BDT',
      requestedAt: NOW,
    },
  });
}

function makeMockReturnRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByOrderId: jest.fn().mockResolvedValue([]),
    findByCustomerId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findActiveByOrder: jest.fn().mockResolvedValue(null),
    findPendingOlderThan: jest.fn().mockResolvedValue([]),
    findAll: jest.fn().mockResolvedValue([]),
    exists: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockImplementation(async (r: OrderReturnEntity) => r),
    delete: jest.fn().mockResolvedValue(undefined),
  };
}

describe('OrderReturnService', () => {
  let returnRepo: ReturnType<typeof makeMockReturnRepo>;
  let orderRepo: ReturnType<typeof makeMockOrderRepo>;
  let service: OrderReturnService;

  beforeEach(() => {
    returnRepo = makeMockReturnRepo();
    orderRepo = makeMockOrderRepo();
    service = new OrderReturnService(returnRepo as never, orderRepo as never);
  });

  describe('request()', () => {
    it('throws when order missing', async () => {
      orderRepo.findById.mockResolvedValue(null);
      await expect(
        service.request({
          orderId: UUID_ORDER,
          reason: 'defective',
          itemIds: [UUID_ITEM],
        } as never),
      ).rejects.toThrow(OrderNotFoundApplicationError);
    });

    it('throws policy error when order not delivered', async () => {
      orderRepo.findById.mockResolvedValue(makeOrder());
      await expect(
        service.request({
          orderId: UUID_ORDER,
          reason: 'defective',
          itemIds: [UUID_ITEM],
        } as never),
      ).rejects.toThrow();
    });
  });

  describe('approve()', () => {
    it('approves requested return', async () => {
      returnRepo.findById.mockResolvedValue(makeReturn());
      const result = await service.approve({ returnId: UUID_RETURN } as never, 'admin-1');
      expect(result.status).toBe('approved');
    });

    it('throws when not found', async () => {
      returnRepo.findById.mockResolvedValue(null);
      await expect(service.approve({ returnId: 'x' } as never, 'admin')).rejects.toThrow(
        ReturnNotFoundApplicationError,
      );
    });
  });

  describe('reject()', () => {
    it('rejects requested', async () => {
      returnRepo.findById.mockResolvedValue(makeReturn());
      const result = await service.reject(
        { returnId: UUID_RETURN, reason: 'outside window' } as never,
        'admin-1',
      );
      expect(result.status).toBe('rejected');
    });
  });

  describe('complete()', () => {
    it('completes approved+ lifecycle', async () => {
      const r = makeReturn();
      r.approve('admin-1', NOW);
      r.pickUp(undefined, NOW);
      r.receive(undefined, NOW);
      r.inspect('ok', undefined, NOW);
      returnRepo.findById.mockResolvedValue(r);
      const result = await service.complete({
        returnId: UUID_RETURN,
        refundAmount: 100,
        restockFee: 0,
      } as never);
      expect(result.status).toBe('refunded');
      expect(result.refundAmount).toBe(100);
    });
  });

  describe('getById() / listByOrder() / listByCustomer()', () => {
    it('getById()', async () => {
      returnRepo.findById.mockResolvedValue(makeReturn());
      const result = await service.getById(UUID_RETURN);
      expect(result.id).toBe(UUID_RETURN);
    });

    it('getById() throws', async () => {
      returnRepo.findById.mockResolvedValue(null);
      await expect(service.getById('x')).rejects.toThrow(ReturnNotFoundApplicationError);
    });

    it('listByOrder()', async () => {
      returnRepo.findByOrderId.mockResolvedValue([makeReturn()]);
      const result = await service.listByOrder(UUID_ORDER);
      expect(result).toHaveLength(1);
    });

    it('listByCustomer()', async () => {
      returnRepo.findByCustomerId.mockResolvedValue([makeReturn()]);
      const result = await service.listByCustomer(UUID_CUSTOMER);
      expect(result).toHaveLength(1);
    });
  });
});
