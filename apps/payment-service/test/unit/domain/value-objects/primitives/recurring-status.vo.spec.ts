/**
 * RecurringStatusVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RecurringStatusVO } from '@domain/primitives/recurring-status.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('RecurringStatusVO', () => {
  describe('create()', () => {
    it('accepts all statuses', () => {
      for (const s of ['scheduled', 'active', 'paused', 'completed', 'cancelled', 'failed']) {
        expect(RecurringStatusVO.create(s).value).toBe(s);
      }
    });
    it('normalizes case', () => {
      expect(RecurringStatusVO.create('SCHEDULED').value).toBe('scheduled');
    });
    it('throws on invalid', () => {
      expect(() => RecurringStatusVO.create('unknown')).toThrow(ValidationError);
    });
  });

  describe('factory helpers', () => {
    it('scheduled()', () => expect(RecurringStatusVO.scheduled().value).toBe('scheduled'));
    it('active()', () => expect(RecurringStatusVO.active().value).toBe('active'));
    it('paused()', () => expect(RecurringStatusVO.paused().value).toBe('paused'));
    it('completed()', () => expect(RecurringStatusVO.completed().value).toBe('completed'));
    it('cancelled()', () => expect(RecurringStatusVO.cancelled().value).toBe('cancelled'));
    it('failed()', () => expect(RecurringStatusVO.failed().value).toBe('failed'));
  });

  describe('predicates', () => {
    it('isScheduled', () => expect(RecurringStatusVO.scheduled().isScheduled()).toBe(true));
    it('isActive', () => expect(RecurringStatusVO.active().isActive()).toBe(true));
    it('isPaused', () => expect(RecurringStatusVO.paused().isPaused()).toBe(true));
    it('isCompleted', () => expect(RecurringStatusVO.completed().isCompleted()).toBe(true));
    it('isCancelled', () => expect(RecurringStatusVO.cancelled().isCancelled()).toBe(true));
    it('isFailed', () => expect(RecurringStatusVO.failed().isFailed()).toBe(true));
    it('isRunning = active', () => {
      expect(RecurringStatusVO.active().isRunning()).toBe(true);
      expect(RecurringStatusVO.scheduled().isRunning()).toBe(false);
    });
  });

  describe('isFinal', () => {
    it('true for completed/cancelled', () => {
      expect(RecurringStatusVO.completed().isFinal()).toBe(true);
      expect(RecurringStatusVO.cancelled().isFinal()).toBe(true);
    });
    it('false for others', () => {
      expect(RecurringStatusVO.active().isFinal()).toBe(false);
      expect(RecurringStatusVO.scheduled().isFinal()).toBe(false);
      expect(RecurringStatusVO.failed().isFinal()).toBe(false);
    });
  });

  describe('canTransitionTo()', () => {
    it('scheduled → active ok', () => {
      expect(RecurringStatusVO.scheduled().canTransitionTo('active')).toBe(true);
    });
    it('active → paused ok', () => {
      expect(RecurringStatusVO.active().canTransitionTo('paused')).toBe(true);
    });
    it('paused → active ok', () => {
      expect(RecurringStatusVO.paused().canTransitionTo('active')).toBe(true);
    });
    it('active → completed ok', () => {
      expect(RecurringStatusVO.active().canTransitionTo('completed')).toBe(true);
    });
    it('failed → scheduled ok (retry)', () => {
      expect(RecurringStatusVO.failed().canTransitionTo('scheduled')).toBe(true);
    });
    it('completed → anything NOT ok', () => {
      expect(RecurringStatusVO.completed().canTransitionTo('active')).toBe(false);
    });
    it('cancelled → anything NOT ok', () => {
      expect(RecurringStatusVO.cancelled().canTransitionTo('active')).toBe(false);
    });
  });
});
