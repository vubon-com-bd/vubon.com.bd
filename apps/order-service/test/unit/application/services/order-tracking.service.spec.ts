import { jest } from '@jest/globals';
import { OrderTrackingService } from '../../../../src/module/application/services/impl/order-tracking.service.js';
import { OrderTrackingEntity } from '../../../../src/module/domain/entities/order-tracking.entity.js';
import { TrackingStatusVO } from '../../../../src/module/domain/value-objects/primitives/tracking-status.vo.js';
import { OrderIdVO } from '../../../../src/module/domain/value-objects/primitives/order-id.vo.js';
import {
  TrackingNotFoundApplicationError,
} from '../../../../src/module/application/errors/tracking.errors.js';
import { UUID_ORDER } from './_helpers.js';

const NOW = '2026-01-01T10:00:00Z';
const UUID_TRACK = 'tttttttt-tttt-4ttt-8ttt-tttttttttttt';

function makeTracking(event = 'order_placed'): OrderTrackingEntity {
  return OrderTrackingEntity.create({
    id: UUID_TRACK,
    now: NOW,
    props: {
      orderId: OrderIdVO.create(UUID_ORDER),
      event: TrackingStatusVO.create(event),
      message: 'Order placed',
      occurredAt: NOW,
    },
  });
}

function makeMockRepo() {
  return {
    findById: jest.fn().mockResolvedValue(null),
    findByIdVO: jest.fn().mockResolvedValue(null),
    findByOrderId: jest.fn().mockResolvedValue([]),
    findByTrackingNumber: jest.fn().mockResolvedValue([]),
    findLatestByOrder: jest.fn().mockResolvedValue(null),
    findByEvent: jest.fn().mockResolvedValue([]),
    countByOrder: jest.fn().mockResolvedValue(0),
    findOldToPrune: jest.fn().mockResolvedValue([]),
    findAll: jest.fn().mockResolvedValue([]),
    exists: jest.fn().mockResolvedValue(false),
    save: jest.fn().mockImplementation(async (t: OrderTrackingEntity) => t),
    delete: jest.fn().mockResolvedValue(undefined),
  };
}

describe('OrderTrackingService', () => {
  let repo: ReturnType<typeof makeMockRepo>;
  let service: OrderTrackingService;

  beforeEach(() => {
    repo = makeMockRepo();
    service = new OrderTrackingService(repo as never);
  });

  describe('add()', () => {
    it('creates tracking entry', async () => {
      const result = await service.add({
        orderId: UUID_ORDER,
        event: 'order_placed',
        message: 'Order placed',
      } as never, 'actor-1');
      expect(repo.save).toHaveBeenCalled();
      expect(result.orderId).toBe(UUID_ORDER);
      expect(result.event).toBe('order_placed');
    });
  });

  describe('update()', () => {
    it('updates existing tracking', async () => {
      repo.findById.mockResolvedValue(makeTracking());
      const result = await service.update({
        trackingId: UUID_TRACK,
        orderId: UUID_ORDER,
        event: 'in_transit',
        message: 'Package in transit',
      } as never);
      expect(result.event).toBe('in_transit');
    });

    it('throws when not found', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(
        service.update({ trackingId: 'x', orderId: UUID_ORDER, event: 'in_transit', message: 'm' } as never),
      ).rejects.toThrow(TrackingNotFoundApplicationError);
    });
  });

  describe('getById()', () => {
    it('returns DTO', async () => {
      repo.findById.mockResolvedValue(makeTracking());
      const result = await service.getById(UUID_TRACK);
      expect(result.id).toBe(UUID_TRACK);
    });

    it('throws when missing', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.getById('x')).rejects.toThrow(TrackingNotFoundApplicationError);
    });
  });

  describe('listByOrder()', () => {
    it('returns array', async () => {
      repo.findByOrderId.mockResolvedValue([makeTracking()]);
      const result = await service.listByOrder(UUID_ORDER);
      expect(result).toHaveLength(1);
    });
  });

  describe('getSummary()', () => {
    it('returns summary of events', async () => {
      repo.findByOrderId.mockResolvedValue([
        makeTracking('order_placed'),
        makeTracking('in_transit'),
      ]);
      const result = await service.getSummary(UUID_ORDER);
      expect(result.orderId).toBe(UUID_ORDER);
      expect(result.events.length).toBeGreaterThan(0);
    });

    it('handles empty list', async () => {
      repo.findByOrderId.mockResolvedValue([]);
      const result = await service.getSummary(UUID_ORDER);
      expect(result.orderId).toBe(UUID_ORDER);
      expect(result.currentMessage).toBeTruthy();
    });
  });
});
