/**
 * OrderHistoryEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderHistoryEntity } from '@domain/entities/order-history.entity.js';
import { OrderHistoryVO } from '@domain/composites/order-history.vo.js';
import { HistoryTypeVO } from '@domain/primitives/history-type.vo.js';
import { fixtureHistoryId, fixtureOrderId } from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeVO(): OrderHistoryVO {
  return OrderHistoryVO.create({
    id: fixtureHistoryId,
    orderId: fixtureOrderId,
    type: HistoryTypeVO.create('created'),
    message: 'Order was created',
    occurredAt: NOW,
  });
}

describe('OrderHistoryEntity', () => {
  describe('create', () => {
    it('creates history entity', () => {
      const entity = OrderHistoryEntity.create({
        id: fixtureHistoryId.value,
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.id).toBe(fixtureHistoryId.value);
      expect(entity.message).toBe('Order was created');
      expect(entity.orderId.value).toBe(fixtureOrderId.value);
    });

    it('sets createdAt + updatedAt to now', () => {
      const entity = OrderHistoryEntity.create({
        id: fixtureHistoryId.value,
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.createdAt).toBe(NOW);
      expect(entity.updatedAt).toBe(NOW);
    });
  });

  describe('reconstitute', () => {
    it('rehydrates existing history', () => {
      const entity = OrderHistoryEntity.reconstitute({
        id: fixtureHistoryId.value,
        createdAt: NOW,
        updatedAt: NOW,
        vo: makeVO(),
      });
      expect(entity.id).toBe(fixtureHistoryId.value);
      expect(entity.createdAt).toBe(NOW);
    });
  });

  describe('predicates', () => {
    it('isSystemGenerated for created type', () => {
      const entity = OrderHistoryEntity.create({
        id: fixtureHistoryId.value,
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.isSystemGenerated()).toBe(true);
    });
  });

  describe('getters', () => {
    it('exposes all getters', () => {
      const entity = OrderHistoryEntity.create({
        id: fixtureHistoryId.value,
        vo: makeVO(),
        now: NOW,
      });
      expect(entity.type).toBeDefined();
      expect(entity.type.value).toBe('created');
      expect(entity.message).toBe('Order was created');
      expect(entity.occurredAt).toBe(NOW);
    });
  });
});
