/**
 * OrderCancelVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderCancelVO } from '@domain/composites/order-cancel.vo.js';
import { CancelReasonVO } from '@domain/primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '@domain/primitives/cancel-status.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { fixtureCancelId, fixtureOrderId } from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof OrderCancelVO.create>[0]> = {}) {
  return {
    id: fixtureCancelId,
    orderId: fixtureOrderId,
    reason: CancelReasonVO.create('customer_request'),
    status: CancelStatusVO.requested(),
    requestedBy: 'user-123',
    requestedAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('OrderCancelVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = OrderCancelVO.create(makeProps());
      expect(vo.requestedBy).toBe('user-123');
      expect(vo.status.isRequested()).toBe(true);
    });

    it('creates with optional notes', () => {
      const vo = OrderCancelVO.create(makeProps({ notes: 'Requested by customer' }));
      expect(vo.hasNotes()).toBe(true);
    });

    it('throws for empty requestedBy', () => {
      expect(() => OrderCancelVO.create(makeProps({ requestedBy: '' }))).toThrow(
        ValidationError,
      );
    });

    it('throws when approved without approvedBy', () => {
      expect(() =>
        OrderCancelVO.create(makeProps({ status: CancelStatusVO.approved() })),
      ).toThrow(ValidationError);
    });

    it('accepts approved with approvedBy', () => {
      const vo = OrderCancelVO.create(
        makeProps({
          status: CancelStatusVO.approved(),
          approvedBy: 'admin-1',
        }),
      );
      expect(vo.status.isApproved()).toBe(true);
    });

    it('throws for notes > 500 chars', () => {
      expect(() =>
        OrderCancelVO.create(makeProps({ notes: 'a'.repeat(501) })),
      ).toThrow(ValidationError);
    });
  });

  describe('business methods', () => {
    it('isPending true for requested', () => {
      const vo = OrderCancelVO.create(makeProps());
      expect(vo.isPending()).toBe(true);
    });

    it('isTerminal false for requested', () => {
      const vo = OrderCancelVO.create(makeProps());
      expect(vo.isTerminal()).toBe(false);
    });

    it('isTerminal true for rejected', () => {
      const vo = OrderCancelVO.create(
        makeProps({ status: CancelStatusVO.create('rejected') }),
      );
      expect(vo.isTerminal()).toBe(true);
    });

    it('hasNotes false without notes', () => {
      const vo = OrderCancelVO.create(makeProps());
      expect(vo.hasNotes()).toBe(false);
    });
  });
});
