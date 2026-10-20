/**
 * OrderHistoryVO — Unit Tests
 */
import { describe, it, expect } from '@jest/globals';
import { OrderHistoryVO } from '@domain/composites/order-history.vo.js';
import { HistoryTypeVO } from '@domain/primitives/history-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { fixtureHistoryId, fixtureOrderId } from '@fixtures/domain/primitive-fixtures.js';

function makeProps(overrides: Partial<Parameters<typeof OrderHistoryVO.create>[0]> = {}) {
  return {
    id: fixtureHistoryId,
    orderId: fixtureOrderId,
    type: HistoryTypeVO.create('created'),
    message: 'Order was created',
    occurredAt: new Date().toISOString(),
    ...overrides,
  };
}

describe('OrderHistoryVO', () => {
  describe('create', () => {
    it('creates with valid props', () => {
      const vo = OrderHistoryVO.create(makeProps());
      expect(vo.message).toBe('Order was created');
      expect(vo.type.isSystemGenerated()).toBe(true);
    });

    it('creates with performedBy', () => {
      const vo = OrderHistoryVO.create(makeProps({ performedBy: 'user-123' }));
      expect(vo.hasPerformer()).toBe(true);
    });

    it('creates with metadata', () => {
      const vo = OrderHistoryVO.create(
        makeProps({ metadata: { previousStatus: 'pending' } }),
      );
      expect(vo.metadata).toEqual({ previousStatus: 'pending' });
    });

    it('throws for empty message', () => {
      expect(() => OrderHistoryVO.create(makeProps({ message: '' }))).toThrow(ValidationError);
    });

    it('throws for message > 2000 chars', () => {
      expect(() =>
        OrderHistoryVO.create(makeProps({ message: 'a'.repeat(2001) })),
      ).toThrow(ValidationError);
    });
  });

  describe('business methods', () => {
    it('isSystemGenerated true for created', () => {
      const vo = OrderHistoryVO.create(makeProps());
      expect(vo.isSystemGenerated()).toBe(true);
    });

    it('isSystemGenerated false for note_added', () => {
      const vo = OrderHistoryVO.create(
        makeProps({ type: HistoryTypeVO.create('note_added') }),
      );
      expect(vo.isSystemGenerated()).toBe(false);
    });

    it('hasPerformer false without performer', () => {
      const vo = OrderHistoryVO.create(makeProps());
      expect(vo.hasPerformer()).toBe(false);
    });
  });
});
