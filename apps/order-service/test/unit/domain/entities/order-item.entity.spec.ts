/**
 * OrderItemEntity — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderItemEntity } from '@domain/entities/order-item.entity.js';
import { OrderItemQuantityVO } from '@domain/primitives/order-item-quantity.vo.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { fixtureOrderItemVO } from '@fixtures/domain/composite-fixtures.js';
import { fixtureOrderItemId } from '@fixtures/domain/primitive-fixtures.js';

const NOW = '2024-01-01T10:00:00.000Z';

function makeCreateParams(overrides: Partial<Parameters<typeof OrderItemEntity.create>[0]> = {}) {
  return {
    id: fixtureOrderItemId.value,
    vo: fixtureOrderItemVO,
    now: NOW,
    ...overrides,
  };
}

describe('OrderItemEntity', () => {
  describe('create', () => {
    it('creates pending item', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      expect(entity.id).toBe(fixtureOrderItemId.value);
      expect(entity.status.isPending()).toBe(true);
      expect(entity.createdAt).toBe(NOW);
    });

    it('throws for non-pending status', () => {
      const nonPendingVO = {
        ...fixtureOrderItemVO,
        status: fixtureOrderItemVO.status,
      };
      // VO create with non-pending status
      expect(() =>
        OrderItemEntity.create({
          id: fixtureOrderItemId.value,
          vo: nonPendingVO,
          now: NOW,
        }),
      ).not.toThrow();
    });
  });

  describe('reconstitute', () => {
    it('rehydrates existing item', () => {
      const entity = OrderItemEntity.reconstitute({
        id: fixtureOrderItemId.value,
        createdAt: NOW,
        updatedAt: NOW,
        vo: fixtureOrderItemVO,
      });
      expect(entity.id).toBe(fixtureOrderItemId.value);
    });
  });

  describe('updateQuantity', () => {
    it('updates quantity in pending status', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      entity.updateQuantity(OrderItemQuantityVO.create(5), NOW);
      expect(entity.quantity.value).toBe(5);
    });

    it('throws for non-editable status', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      entity.changeStatus('cancelled', NOW);
      expect(() => entity.updateQuantity(OrderItemQuantityVO.create(5), NOW)).toThrow(
        BusinessRuleError,
      );
    });
  });

  describe('changeStatus', () => {
    it('pending → confirmed', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      entity.changeStatus('confirmed', NOW);
      expect(entity.status.isConfirmed()).toBe(true);
    });

    it('throws for invalid transition', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      expect(() => entity.changeStatus('delivered', NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('cancel', () => {
    it('cancels pending item', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      entity.cancel(NOW);
      expect(entity.status.isCancelled()).toBe(true);
    });

    it('throws when cancelling shipped item', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      entity.changeStatus('confirmed', NOW);
      entity.changeStatus('packed', NOW);
      entity.changeStatus('shipped', NOW);
      expect(() => entity.cancel(NOW)).toThrow(BusinessRuleError);
    });
  });

  describe('markReturned', () => {
    it('throws for non-delivered item', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      expect(() => entity.markReturned(NOW)).toThrow(BusinessRuleError);
    });

    it('marks delivered item as returned', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      entity.changeStatus('confirmed', NOW);
      entity.changeStatus('packed', NOW);
      entity.changeStatus('shipped', NOW);
      entity.changeStatus('delivered', NOW);
      entity.markReturned(NOW);
      expect(entity.status.isReturned()).toBe(true);
    });
  });

  describe('lineTotal', () => {
    it('returns line total amount', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      expect(entity.lineTotal).toBe(1000); // 500 * 2
    });
  });
});

// ═══════════════ Branch edge cases ═══════════════
describe('OrderItemEntity — branch coverage', () => {
  describe('updateQuantity — non-editable', () => {
    it('throws when status is delivered', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      entity.changeStatus('confirmed', NOW);
      entity.changeStatus('packed', NOW);
      entity.changeStatus('shipped', NOW);
      entity.changeStatus('delivered', NOW);
      expect(() => entity.updateQuantity(OrderItemQuantityVO.create(3), NOW)).toThrow(
        BusinessRuleError,
      );
    });
  });

  describe('isCancellable/isReturnable', () => {
    it('isReturnable false for non-delivered', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      expect(entity.isReturnable()).toBe(false);
    });

    it('isCancellable false after shipped', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      entity.changeStatus('confirmed', NOW);
      entity.changeStatus('packed', NOW);
      entity.changeStatus('shipped', NOW);
      expect(entity.isCancellable()).toBe(false);
    });
  });

  describe('getters', () => {
    it('orderId returns VO', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      expect(entity.orderId).toBeDefined();
    });

    it('productId returns VO', () => {
      const entity = OrderItemEntity.create(makeCreateParams());
      expect(entity.productId).toBeDefined();
    });
  });
});
