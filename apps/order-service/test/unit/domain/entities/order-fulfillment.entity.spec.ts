/**
 * OrderFulfillmentEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderFulfillmentEntity } from '@domain/entities/order-fulfillment.entity.js';
import { OrderFulfillmentVO } from '@domain/composites/order-fulfillment.vo.js';
import { FulfillmentStatusVO } from '@domain/primitives/fulfillment-status.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import {
  fixtureFulfillmentId,
  fixtureOrderId,
} from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeVO(status: string = 'unfulfilled') {
  return OrderFulfillmentVO.create({
    id: fixtureFulfillmentId,
    orderId: fixtureOrderId,
    status: FulfillmentStatusVO.create(status),
    itemIds: ['item-1', 'item-2'],
    ...(status === 'fulfilled' ? { fulfilledAt: NOW } : {}),
  });
}

function makeCreateParams(overrides: Partial<Parameters<typeof OrderFulfillmentEntity.create>[0]> = {}) {
  return {
    id: fixtureFulfillmentId.value,
    vo: makeVO(),
    now: NOW,
    ...overrides,
  };
}

describe('OrderFulfillmentEntity', () => {
  describe('create', () => {
    it('creates unfulfilled', () => {
      const entity = OrderFulfillmentEntity.create(makeCreateParams());
      expect(entity.isUnfulfilled()).toBe(true);
    });
  });

  describe('reconstitute', () => {
    it('rehydrates existing', () => {
      const entity = OrderFulfillmentEntity.reconstitute({
        id: fixtureFulfillmentId.value,
        createdAt: NOW,
        updatedAt: NOW,
        vo: makeVO(),
      });
      expect(entity.id).toBe(fixtureFulfillmentId.value);
    });
  });

  describe('lifecycle', () => {
    it('unfulfilled → pending → fulfilled', () => {
      const entity = OrderFulfillmentEntity.create(makeCreateParams());
      entity.start(NOW);
      entity.fulfill('TRK-ABCD1234', NOW);
      expect(entity.isFulfilled()).toBe(true);
    });

    it('unfulfilled → partially_fulfilled', () => {
      const entity = OrderFulfillmentEntity.create(makeCreateParams());
      entity.markPartiallyFulfilled(NOW);
      expect(entity.status.isPartiallyFulfilled()).toBe(true);
    });

    it('throws invalid transition: unfulfilled → fulfilled', () => {
      const entity = OrderFulfillmentEntity.create(makeCreateParams());
      expect(() => entity.fulfill(undefined, NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('restock', () => {
    it('restocks fulfilled', () => {
      const entity = OrderFulfillmentEntity.create(
        makeCreateParams({ vo: makeVO('fulfilled') }),
      );
      entity.restock(NOW);
      expect(entity.status.isRestocked()).toBe(true);
    });

    it('throws when restocking unfulfilled', () => {
      const entity = OrderFulfillmentEntity.create(makeCreateParams());
      expect(() => entity.restock(NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('cancel', () => {
    it('cancels unfulfilled', () => {
      const entity = OrderFulfillmentEntity.create(makeCreateParams());
      entity.cancel(NOW);
      expect(entity.status.isCancelled()).toBe(true);
    });
  });
});

// ═══════════════ Branch edge cases ═══════════════
describe('OrderFulfillmentEntity — branch coverage', () => {
  it('getters', () => {
    const entity = OrderFulfillmentEntity.create(makeCreateParams());
    expect(entity.vo).toBeDefined();
    expect(entity.itemIds.length).toBe(2);
  });

  it('cancel on terminal throws', () => {
    const entity = OrderFulfillmentEntity.create(
      makeCreateParams({ vo: makeVO('fulfilled') }),
    );
    expect(() => entity.cancel(NOW)).toThrow(BusinessRuleError);
  });

  it('fulfill with tracking', () => {
    const entity = OrderFulfillmentEntity.create(makeCreateParams());
    entity.start(NOW);
    entity.fulfill('TRK-ABCD1234', NOW);
    expect(entity.vo.trackingNumber).toBe('TRK-ABCD1234');
  });
});
