import { jest } from '@jest/globals';
import { OrderFulfillmentService } from '../../../../src/module/application/services/impl/order-fulfillment.service.js';
import { OrderFulfillmentEntity } from '../../../../src/module/domain/entities/order-fulfillment.entity.js';
import { FulfillmentStatusVO } from '../../../../src/module/domain/value-objects/primitives/fulfillment-status.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { OrderItemIdVO } from '../../../../src/module/domain/value-objects/primitives/order-item-id.vo.js';
import {
  FulfillmentNotFoundApplicationError,
} from '../../../../src/module/application/errors/fulfillment.errors.js';
import { OrderNotFoundApplicationError } from '../../../../src/module/application/errors/order.errors.js';
import {
  makeOrder,
  makeMockOrderRepo,
  UUID_ORDER,
  UUID_ITEM,
} from './_helpers.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_FULFILL = 'f1111111-1111-4111-8111-111111111111';

function makeFulfillment(): OrderFulfillmentEntity {
  return OrderFulfillmentEntity.create({
    id: UUID_FULFILL,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID_ORDER),
      status: FulfillmentStatusVO.unfulfilled(),
      type: 'standard',
      itemIds: [OrderItemIdVO.create(UUID_ITEM)],
      currency: 'BDT',
    },
  });
}

function makeMockFulfillRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByOrderId: jest.fn().mockResolvedValue([]),
    findByVendorId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByTrackingNumber: jest.fn().mockResolvedValue(null),
    findActiveByOrder: jest.fn().mockResolvedValue(null),
    countByOrder: jest.fn().mockResolvedValue(0),
    findAll: jest.fn().mockResolvedValue([]),
    exists: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockImplementation(async (f: OrderFulfillmentEntity) => f),
    delete: jest.fn().mockResolvedValue(undefined),
  };
}

describe('OrderFulfillmentService', () => {
  let repo: ReturnType<typeof makeMockFulfillRepo>;
  let orderRepo: ReturnType<typeof makeMockOrderRepo>;
  let service: OrderFulfillmentService;

  beforeEach(() => {
    repo = makeMockFulfillRepo();
    orderRepo = makeMockOrderRepo();
    service = new OrderFulfillmentService(repo as never, orderRepo as never);
  });

  describe('start()', () => {
    it('creates fulfillment for existing order', async () => {
      orderRepo.findById.mockResolvedValue(makeOrder());
      const result = await service.start({
        orderId: UUID_ORDER,
        itemIds: [UUID_ITEM],
        type: 'standard',
      } as never);
      expect(repo.save).toHaveBeenCalled();
      expect(result.orderId).toBe(UUID_ORDER);
    });

    it('throws when order missing', async () => {
      orderRepo.findById.mockResolvedValue(null);
      await expect(
        service.start({ orderId: UUID_ORDER, itemIds: [UUID_ITEM], type: 'standard' } as never),
      ).rejects.toThrow(OrderNotFoundApplicationError);
    });
  });

  describe('pack()', () => {
    it('packs unfulfilled fulfillment', async () => {
      repo.findById.mockResolvedValue(makeFulfillment());
      const result = await service.pack({
        fulfillmentId: UUID_FULFILL,
        orderId: UUID_ORDER,
      } as never);
      expect(result.id).toBe(UUID_FULFILL);
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(
        service.pack({ fulfillmentId: 'x', orderId: UUID_ORDER } as never),
      ).rejects.toThrow(FulfillmentNotFoundApplicationError);
    });
  });

  describe('ship()', () => {
    it('ships with tracking', async () => {
      repo.findById.mockResolvedValue(makeFulfillment());
      const result = await service.ship({
        orderId: UUID_ORDER,
        fulfillmentId: UUID_FULFILL,
        trackingNumber: 'TRK-AAAA1111',
      } as never);
      expect(result.trackingNumber).toBe('TRK-AAAA1111');
    });
  });

  describe('complete()', () => {
    it('completes fulfillment', async () => {
      repo.findById.mockResolvedValue(makeFulfillment());
      const result = await service.complete({
        fulfillmentId: UUID_FULFILL,
        orderId: UUID_ORDER,
      } as never);
      expect(result.status).toBe('fulfilled');
    });
  });

  describe('getById() / listByOrder() / listByVendor()', () => {
    it('getById()', async () => {
      repo.findById.mockResolvedValue(makeFulfillment());
      const result = await service.getById(UUID_FULFILL);
      expect(result.id).toBe(UUID_FULFILL);
    });

    it('getById() throws', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById('x')).rejects.toThrow(FulfillmentNotFoundApplicationError);
    });

    it('listByOrder()', async () => {
      repo.findByOrderId.mockResolvedValue([makeFulfillment()]);
      const result = await service.listByOrder(UUID_ORDER);
      expect(result).toHaveLength(1);
    });

    it('listByVendor()', async () => {
      repo.findByVendorId.mockResolvedValue([]);
      const result = await service.listByVendor(
        'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
      );
      expect(result).toEqual([]);
    });
  });
});
