/**
 * OrderStatusTransitionService — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderStatusTransitionService } from '@domain/services/order-status-transition.service.js';

describe('OrderStatusTransitionService', () => {
  describe('canTransition', () => {
    it('pending → confirmed true', () => {
      expect(OrderStatusTransitionService.canTransition('pending', 'confirmed')).toBe(true);
    });

    it('pending → cancelled true', () => {
      expect(OrderStatusTransitionService.canTransition('pending', 'cancelled')).toBe(true);
    });

    it('pending → shipped false', () => {
      expect(OrderStatusTransitionService.canTransition('pending', 'shipped')).toBe(false);
    });

    it('cancelled → anything false', () => {
      expect(OrderStatusTransitionService.canTransition('cancelled', 'pending')).toBe(false);
      expect(OrderStatusTransitionService.canTransition('cancelled', 'confirmed')).toBe(false);
    });

    it('invalid status false', () => {
      expect(OrderStatusTransitionService.canTransition('invalid', 'pending')).toBe(false);
    });
  });

  describe('evaluate', () => {
    it('returns allowed result', () => {
      const r = OrderStatusTransitionService.evaluate('pending', 'confirmed');
      expect(r.allowed).toBe(true);
      expect(r.from).toBe('pending');
      expect(r.to).toBe('confirmed');
      expect(r.reason).toBeUndefined();
    });

    it('returns not allowed with reason', () => {
      const r = OrderStatusTransitionService.evaluate('pending', 'shipped');
      expect(r.allowed).toBe(false);
      expect(r.reason).toContain('not permitted');
    });

    it('returns not allowed for invalid status', () => {
      const r = OrderStatusTransitionService.evaluate('invalid', 'pending');
      expect(r.allowed).toBe(false);
      expect(r.reason).toBeDefined();
    });
  });

  describe('nextStatuses', () => {
    it('returns possible next statuses for pending', () => {
      const next = OrderStatusTransitionService.nextStatuses('pending');
      expect(next).toContain('confirmed');
      expect(next).toContain('cancelled');
      expect(next).not.toContain('shipped');
    });

    it('returns empty array for invalid status', () => {
      expect(OrderStatusTransitionService.nextStatuses('invalid')).toEqual([]);
    });

    it('returns empty array for terminal cancelled', () => {
      expect(OrderStatusTransitionService.nextStatuses('cancelled')).toEqual([]);
    });
  });

  describe('isTerminal', () => {
    it('true for cancelled/completed/refunded', () => {
      expect(OrderStatusTransitionService.isTerminal('cancelled')).toBe(true);
      expect(OrderStatusTransitionService.isTerminal('completed')).toBe(true);
      expect(OrderStatusTransitionService.isTerminal('refunded')).toBe(true);
    });

    it('false for pending', () => {
      expect(OrderStatusTransitionService.isTerminal('pending')).toBe(false);
    });

    it('false for invalid', () => {
      expect(OrderStatusTransitionService.isTerminal('invalid')).toBe(false);
    });
  });
});
