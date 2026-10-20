/**
 * OrderTrackingEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderTrackingEntity } from '@domain/entities/order-tracking.entity.js';
import { OrderTrackingVO } from '@domain/composites/order-tracking.vo.js';
import { TrackingStatusVO } from '@domain/primitives/tracking-status.vo.js';
import {
  fixtureTrackingId,
  fixtureOrderId,
  fixtureTrackingNumber,
} from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeVO(status: string = 'pending'): OrderTrackingVO {
  return OrderTrackingVO.create({
    id: fixtureTrackingId,
    orderId: fixtureOrderId,
    status: TrackingStatusVO.create(status),
    trackingNumber: fixtureTrackingNumber,
    message: 'Order picked up',
    occurredAt: NOW,
  });
}

describe('OrderTrackingEntity', () => {
  describe('create', () => {
    it('creates tracking entity', () => {
      const entity = OrderTrackingEntity.create({
        id: fixtureTrackingId.value,
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.id).toBe(fixtureTrackingId.value);
      expect(entity.message).toBe('Order picked up');
      expect(entity.orderId.value).toBe(fixtureOrderId.value);
    });
  });

  describe('reconstitute', () => {
    it('rehydrates existing tracking', () => {
      const entity = OrderTrackingEntity.reconstitute({
        id: fixtureTrackingId.value,
        createdAt: NOW,
        updatedAt: NOW,
        vo: makeVO(),
      });
      expect(entity.id).toBe(fixtureTrackingId.value);
    });
  });

  describe('predicates', () => {
    it('isTerminal false for pending', () => {
      const entity = OrderTrackingEntity.create({
        id: fixtureTrackingId.value,
        vo: makeVO('pending'),
        now: NOW,
      });
      expect(entity.isTerminal()).toBe(false);
    });

    it('isTerminal true for delivered', () => {
      const entity = OrderTrackingEntity.create({
        id: fixtureTrackingId.value,
        vo: makeVO('delivered'),
        now: NOW,
      });
      expect(entity.isTerminal()).toBe(true);
    });

    it('hasLocation false without location', () => {
      const entity = OrderTrackingEntity.create({
        id: fixtureTrackingId.value,
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.hasLocation()).toBe(false);
    });

    it('hasLocation true with location', () => {
      const vo = OrderTrackingVO.create({
        id: fixtureTrackingId,
        orderId: fixtureOrderId,
        status: TrackingStatusVO.create('in_transit'),
        trackingNumber: fixtureTrackingNumber,
        message: 'In transit',
        location: 'Dhaka Hub',
        occurredAt: NOW,
      });
      const entity = OrderTrackingEntity.create({
        id: fixtureTrackingId.value,
        vo,
        now: NOW,
      });
      expect(entity.hasLocation()).toBe(true);
    });
  });

  describe('getters', () => {
    it('exposes all getters', () => {
      const entity = OrderTrackingEntity.create({
        id: fixtureTrackingId.value,
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.status).toBeDefined();
      expect(entity.trackingNumber).toBeDefined();
      expect(entity.trackingNumber.value).toBe(fixtureTrackingNumber.value);
      expect(entity.message).toBe('Order picked up');
      expect(entity.occurredAt).toBe(NOW);
    });
  });
});
