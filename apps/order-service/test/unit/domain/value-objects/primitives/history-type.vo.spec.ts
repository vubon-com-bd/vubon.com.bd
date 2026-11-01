/**
 * HistoryTypeVO — Full coverage
 */
import { describe, it, expect } from '@jest/globals';
import { HistoryTypeVO } from '@domain/primitives/history-type.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('HistoryTypeVO', () => {
  describe('create', () => {
    it.each([
      'created', 'updated', 'status_changed', 'item_added', 'item_updated',
      'item_removed', 'payment_received', 'payment_failed', 'shipped',
      'delivered', 'cancelled', 'returned', 'refunded', 'note_added',
      'fulfillment_started', 'fulfillment_completed',
    ])('accepts "%s"', (t) => expect(HistoryTypeVO.create(t).value).toBe(t));
    it('normalizes case', () => {
      expect(HistoryTypeVO.create('CREATED').value).toBe('created');
    });
    it('throws for invalid', () => {
      expect(() => HistoryTypeVO.create('x')).toThrow(ValidationError);
    });
    it('throws for non-string', () => {
      expect(() => HistoryTypeVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      expect(HistoryTypeVO.reconstitute('legacy').value).toBe('legacy');
    });
  });

  describe('isSystemGenerated', () => {
    it('true for created/status_changed/payment_received/payment_failed', () => {
      expect(HistoryTypeVO.create('created').isSystemGenerated()).toBe(true);
      expect(HistoryTypeVO.create('status_changed').isSystemGenerated()).toBe(true);
      expect(HistoryTypeVO.create('payment_received').isSystemGenerated()).toBe(true);
      expect(HistoryTypeVO.create('payment_failed').isSystemGenerated()).toBe(true);
    });
    it('false for user-generated types', () => {
      expect(HistoryTypeVO.create('note_added').isSystemGenerated()).toBe(false);
      expect(HistoryTypeVO.create('updated').isSystemGenerated()).toBe(false);
    });
  });
});
