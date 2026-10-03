import { OrderStatusTransitionService } from '../../../../src/module/domain/services/order-status-transition.service.js';
import { ORDER_STATUS } from '@vubon/shared-constants/business/order';

describe('OrderStatusTransitionService', () => {
  describe('canTransition()', () => {
    it('pending → confirmed', () => {
      expect(OrderStatusTransitionService.canTransition('pending', 'confirmed')).toBe(true);
    });
    it('pending → delivered (invalid)', () => {
      expect(OrderStatusTransitionService.canTransition('pending', 'delivered')).toBe(false);
    });
    it('confirmed → processing', () => {
      expect(OrderStatusTransitionService.canTransition('confirmed', 'processing')).toBe(true);
    });
    it('same status → false', () => {
      expect(OrderStatusTransitionService.canTransition('pending', 'pending')).toBe(false);
    });
    it('unknown status → false', () => {
      expect(OrderStatusTransitionService.canTransition('bogus', 'pending')).toBe(false);
    });
  });

  describe('isFinal()', () => {
    it('terminal statuses', () => {
      expect(OrderStatusTransitionService.isFinal('delivered')).toBe(true);
      expect(OrderStatusTransitionService.isFinal('completed')).toBe(true);
      expect(OrderStatusTransitionService.isFinal('cancelled')).toBe(true);
      expect(OrderStatusTransitionService.isFinal('returned')).toBe(true);
      expect(OrderStatusTransitionService.isFinal('refunded')).toBe(true);
    });
    it('active statuses', () => {
      expect(OrderStatusTransitionService.isFinal('pending')).toBe(false);
      expect(OrderStatusTransitionService.isFinal('shipped')).toBe(false);
    });
  });

  describe('isActive()', () => {
    it('pending/confirmed/processing/packed/shipped active', () => {
      expect(OrderStatusTransitionService.isActive('pending')).toBe(true);
      expect(OrderStatusTransitionService.isActive('shipped')).toBe(true);
    });
    it('final + failed + on_hold → false', () => {
      expect(OrderStatusTransitionService.isActive('delivered')).toBe(false);
      expect(OrderStatusTransitionService.isActive('failed')).toBe(false);
      expect(OrderStatusTransitionService.isActive('on_hold')).toBe(false);
    });
  });

  describe('nextStatuses()', () => {
    it('pending → 4 options', () => {
      const next = OrderStatusTransitionService.nextStatuses('pending');
      expect(next).toContain('confirmed');
      expect(next).toContain('cancelled');
      expect(next).toContain('failed');
      expect(next).toContain('on_hold');
    });
    it('final → empty', () => {
      expect(OrderStatusTransitionService.nextStatuses('delivered').length).toBeGreaterThan(0);
      expect(OrderStatusTransitionService.nextStatuses('refunded').length).toBe(0);
    });
  });

  describe('previousStatuses()', () => {
    it('confirmed ← pending/on_hold', () => {
      const prev = OrderStatusTransitionService.previousStatuses('confirmed');
      expect(prev).toContain('pending');
      expect(prev).toContain('on_hold');
    });
  });

  describe('helper predicates', () => {
    it('canCancel()', () => {
      expect(OrderStatusTransitionService.canCancel('pending')).toBe(true);
      expect(OrderStatusTransitionService.canCancel('shipped')).toBe(false);
    });
    it('canShip()', () => {
      expect(OrderStatusTransitionService.canShip('packed')).toBe(true);
      expect(OrderStatusTransitionService.canShip('pending')).toBe(false);
    });
    it('canDeliver()', () => {
      expect(OrderStatusTransitionService.canDeliver('shipped')).toBe(true);
      expect(OrderStatusTransitionService.canDeliver('out_for_delivery')).toBe(true);
      expect(OrderStatusTransitionService.canDeliver('pending')).toBe(false);
    });
    it('canReturn()', () => {
      expect(OrderStatusTransitionService.canReturn('shipped')).toBe(true);
      expect(OrderStatusTransitionService.canReturn('delivered')).toBe(true);
    });
    it('canRefund()', () => {
      expect(OrderStatusTransitionService.canRefund('cancelled')).toBe(true);
      expect(OrderStatusTransitionService.canRefund('returned')).toBe(true);
      expect(OrderStatusTransitionService.canRefund('pending')).toBe(false);
    });
  });

  describe('findPath()', () => {
    it('pending → shipped: 4 steps', () => {
      const path = OrderStatusTransitionService.findPath('pending', 'shipped');
      expect(path).toEqual(['pending', 'confirmed', 'processing', 'packed', 'shipped']);
    });

    it('same status → [status]', () => {
      const path = OrderStatusTransitionService.findPath('pending', 'pending');
      expect(path).toEqual(['pending']);
    });

    it('impossible → null', () => {
      const path = OrderStatusTransitionService.findPath('refunded', 'pending');
      expect(path).toBeNull();
    });
  });

  describe('TRANSITIONS invariant', () => {
    it('uses ORDER_STATUS constants', () => {
      const next = OrderStatusTransitionService.nextStatuses(ORDER_STATUS.PENDING);
      expect(next).toContain(ORDER_STATUS.CONFIRMED);
    });
  });
});
