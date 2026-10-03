/**
 * OrderStatusVO — state machine tests
 */
import { OrderStatusVO } from '../../../../../src/module/domain/value-objects/primitives/order-status.vo.js';
import { ORDER_STATUS } from '@vubon/shared-constants/business/order';

describe('OrderStatusVO', () => {
  describe('create()', () => {
    it('accepts valid statuses', () => {
      expect(OrderStatusVO.create(ORDER_STATUS.PENDING).value).toBe('pending');
      expect(OrderStatusVO.create(ORDER_STATUS.DELIVERED).value).toBe('delivered');
      expect(OrderStatusVO.create(ORDER_STATUS.CANCELLED).value).toBe('cancelled');
    });

    it('throws on invalid status', () => {
      expect(() => OrderStatusVO.create('invalid_status')).toThrow();
      expect(() => OrderStatusVO.create('')).toThrow();
    });
  });

  describe('named constructors', () => {
    it('pending/confirmed/cancelled/delivered', () => {
      expect(OrderStatusVO.pending().value).toBe('pending');
      expect(OrderStatusVO.confirmed().value).toBe('confirmed');
      expect(OrderStatusVO.delivered().value).toBe('delivered');
      expect(OrderStatusVO.cancelled().value).toBe('cancelled');
    });
  });

  describe('predicates', () => {
    it('isPending/isConfirmed/etc.', () => {
      expect(OrderStatusVO.pending().isPending()).toBe(true);
      expect(OrderStatusVO.pending().isConfirmed()).toBe(false);
      expect(OrderStatusVO.delivered().isDelivered()).toBe(true);
    });

    it('isFinal() for terminal statuses', () => {
      expect(OrderStatusVO.delivered().isFinal()).toBe(true);
      expect(OrderStatusVO.completed().isFinal()).toBe(true);
      expect(OrderStatusVO.cancelled().isFinal()).toBe(true);
      expect(OrderStatusVO.returned().isFinal()).toBe(true);
      expect(OrderStatusVO.refunded().isFinal()).toBe(true);
      expect(OrderStatusVO.pending().isFinal()).toBe(false);
      expect(OrderStatusVO.confirmed().isFinal()).toBe(false);
    });

    it('isActive() opposite of final/failed/on_hold', () => {
      expect(OrderStatusVO.pending().isActive()).toBe(true);
      expect(OrderStatusVO.shipped().isActive()).toBe(true);
      expect(OrderStatusVO.delivered().isActive()).toBe(false);
      expect(OrderStatusVO.failed().isActive()).toBe(false);
      expect(OrderStatusVO.onHold().isActive()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('pending → confirmed', () => {
      expect(OrderStatusVO.pending().canTransitionTo(ORDER_STATUS.CONFIRMED)).toBe(true);
    });
    it('pending → cancelled', () => {
      expect(OrderStatusVO.pending().canTransitionTo(ORDER_STATUS.CANCELLED)).toBe(true);
    });
    it('pending → delivered (invalid)', () => {
      expect(OrderStatusVO.pending().canTransitionTo(ORDER_STATUS.DELIVERED)).toBe(false);
    });

    it('confirmed → processing', () => {
      expect(OrderStatusVO.confirmed().canTransitionTo(ORDER_STATUS.PROCESSING)).toBe(true);
    });
    it('confirmed → shipped (invalid — must go through processing)', () => {
      expect(OrderStatusVO.confirmed().canTransitionTo(ORDER_STATUS.SHIPPED)).toBe(false);
    });

    it('processing → packed', () => {
      expect(OrderStatusVO.processing().canTransitionTo(ORDER_STATUS.PACKED)).toBe(true);
    });

    it('packed → shipped', () => {
      expect(OrderStatusVO.packed().canTransitionTo(ORDER_STATUS.SHIPPED)).toBe(true);
    });

    it('shipped → out_for_delivery / delivered / returned', () => {
      const s = OrderStatusVO.shipped();
      expect(s.canTransitionTo(ORDER_STATUS.OUT_FOR_DELIVERY)).toBe(true);
      expect(s.canTransitionTo(ORDER_STATUS.DELIVERED)).toBe(true);
      expect(s.canTransitionTo(ORDER_STATUS.RETURNED)).toBe(true);
    });

    it('delivered → completed / returned', () => {
      const d = OrderStatusVO.delivered();
      expect(d.canTransitionTo(ORDER_STATUS.COMPLETED)).toBe(true);
      expect(d.canTransitionTo(ORDER_STATUS.RETURNED)).toBe(true);
    });

    it('final statuses cannot transition further', () => {
      expect(OrderStatusVO.completed().canTransitionTo(ORDER_STATUS.PENDING)).toBe(false);
      expect(OrderStatusVO.cancelled().canTransitionTo(ORDER_STATUS.PENDING)).toBe(false);
      expect(OrderStatusVO.refunded().canTransitionTo(ORDER_STATUS.PENDING)).toBe(false);
    });

    it('on_hold → pending/confirmed/cancelled', () => {
      const h = OrderStatusVO.onHold();
      expect(h.canTransitionTo(ORDER_STATUS.PENDING)).toBe(true);
      expect(h.canTransitionTo(ORDER_STATUS.CONFIRMED)).toBe(true);
      expect(h.canTransitionTo(ORDER_STATUS.CANCELLED)).toBe(true);
      expect(h.canTransitionTo(ORDER_STATUS.SHIPPED)).toBe(false);
    });
  });

  describe('reconstitute()', () => {
    it('bypasses validation on trusted data', () => {
      expect(OrderStatusVO.reconstitute('pending').value).toBe('pending');
    });
  });

  describe('equals()', () => {
    it('two same statuses are equal', () => {
      expect(OrderStatusVO.pending().equals(OrderStatusVO.pending())).toBe(true);
      expect(OrderStatusVO.pending().equals(OrderStatusVO.confirmed())).toBe(false);
    });
  });
});
