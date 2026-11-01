/**
 * RecurringIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RecurringIdVO } from '@domain/primitives/recurring-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, INVALID_IDS } from '@fixtures/ids.fixture';

describe('RecurringIdVO', () => {
  describe('create()', () => {
    it('creates valid ID', () => {
      expect(RecurringIdVO.create(TEST_IDS.RECURRING_ID).value).toBe(TEST_IDS.RECURRING_ID);
    });
    it('throws on empty', () => {
      expect(() => RecurringIdVO.create(INVALID_IDS.EMPTY)).toThrow(ValidationError);
    });
    it('throws on invalid UUID', () => {
      expect(() => RecurringIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(ValidationError);
    });
  });
  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(RecurringIdVO.reconstitute('x').value).toBe('x');
    });
  });
});
