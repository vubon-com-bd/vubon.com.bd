/**
 * DeliveryService tests
 */
import { jest } from '@jest/globals';
import { DeliveryService } from '../../../../src/module/application/services/impl/delivery.service.js';
import { DeliveryEntity } from '../../../../src/module/domain/entities/delivery.entity.js';
import { DeliveryStatusVO } from '../../../../src/module/domain/value-objects/primitives/delivery-status.vo.js';
import { DeliveryTypeVO } from '../../../../src/module/domain/value-objects/primitives/delivery-type.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import { DeliveryNotFoundApplicationError } from '../../../../src/module/application/errors/delivery.errors.js';
import { OrderNotFoundApplicationError } from '../../../../src/module/application/errors/order.errors.js';
import { makeOrder, makeMockOrderRepo, UUID_ORDER } from './_helpers.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_DELIVERY = '88888888-8888-4888-8888-888888888888';

function makeDelivery(): DeliveryEntity {
  return DeliveryEntity.create({
    id: UUID_DELIVERY,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID_ORDER),
      status: DeliveryStatusVO.scheduled(),
      type: DeliveryTypeVO.create('standard'),
      attempts: 0,
    },
  });
}

function makeMockDeliveryRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByOrderId: jest.fn().mockResolvedValue([]),
    findByStatus: jest.fn().mockResolvedValue([]),
    findByTrackingNumber: jest.fn().mockResolvedValue(null),
    findByCourierId: jest.fn().mockResolvedValue([]),
    findActiveByOrder: jest.fn().mockResolvedValue(null),
    findOverdue: jest.fn().mockResolvedValue([]),
    findAll: jest.fn().mockResolvedValue([]),
    exists: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockImplementation(async (d: DeliveryEntity) => d),
    delete: jest.fn().mockResolvedValue(undefined),
    softDelete: jest.fn().mockResolvedValue(undefined),
  };
}

describe('DeliveryService', () => {
  let deliveryRepo: ReturnType<typeof makeMockDeliveryRepo>;
  let orderRepo: ReturnType<typeof makeMockOrderRepo>;
  let service: DeliveryService;

  beforeEach(() => {
    deliveryRepo = makeMockDeliveryRepo();
    orderRepo = makeMockOrderRepo();
    service = new DeliveryService(deliveryRepo as never, orderRepo as never);
  });

  describe('schedule()', () => {
    it('creates delivery when order exists', async () => {
      orderRepo.findById.mockResolvedValue(makeOrder());
      const result = await service.schedule({
        orderId: UUID_ORDER,
        type: 'standard',
      } as never);
      expect(deliveryRepo.save).toHaveBeenCalled();
      expect(result.orderId).toBe(UUID_ORDER);
      expect(result.status).toBe('scheduled');
    });

    it('throws when order missing', async () => {
      orderRepo.findById.mockResolvedValue(null);
      await expect(
        service.schedule({ orderId: UUID_ORDER, type: 'standard' } as never),
      ).rejects.toThrow(OrderNotFoundApplicationError);
    });
  });

  describe('reschedule()', () => {
    it('reschedules existing', async () => {
      const d = makeDelivery();
      d.assignCourier('c1', NOW);
      deliveryRepo.findById.mockResolvedValue(d);
      const result = await service.reschedule({
        deliveryId: UUID_DELIVERY,
        orderId: UUID_ORDER,
        reason: 'customer request',
      } as never);
      expect(result.status).toBe('rescheduled');
    });

    it('throws when missing', async () => {
      deliveryRepo.findById.mockResolvedValue(null);
      await expect(
        service.reschedule({ deliveryId: 'x', orderId: UUID_ORDER, reason: 'r' } as never),
      ).rejects.toThrow(DeliveryNotFoundApplicationError);
    });
  });

  describe('confirm()', () => {
    it('delivers and marks complete', async () => {
      const d = makeDelivery();
      d.assignCourier('c1', NOW);
      d.pickUp('TRK-AAAA1111', NOW);
      d.markInTransit('hub', NOW);
      d.markOutForDelivery(NOW);
      deliveryRepo.findById.mockResolvedValue(d);
      const result = await service.confirm({
        deliveryId: UUID_DELIVERY,
        orderId: UUID_ORDER,
        receivedBy: 'John',
      } as never);
      expect(result.status).toBe('delivered');
      expect(result.isComplete).toBe(true);
    });
  });

  describe('getById() / listByOrder() / listByStatus()', () => {
    it('getById() returns DTO', async () => {
      deliveryRepo.findById.mockResolvedValue(makeDelivery());
      const result = await service.getById(UUID_DELIVERY);
      expect(result.id).toBe(UUID_DELIVERY);
    });

    it('getById() throws when missing', async () => {
      deliveryRepo.findById.mockResolvedValue(null);
      await expect(service.getById('x')).rejects.toThrow(DeliveryNotFoundApplicationError);
    });

    it('listByOrder() returns array', async () => {
      deliveryRepo.findByOrderId.mockResolvedValue([makeDelivery()]);
      const result = await service.listByOrder(UUID_ORDER);
      expect(result).toHaveLength(1);
    });

    it('listByStatus() returns array', async () => {
      deliveryRepo.findByStatus.mockResolvedValue([makeDelivery()]);
      const result = await service.listByStatus('scheduled');
      expect(result).toHaveLength(1);
    });
  });
});
