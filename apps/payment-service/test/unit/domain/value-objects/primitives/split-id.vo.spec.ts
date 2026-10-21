/**
 * SplitIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SplitIdVO } from '@domain/primitives/split-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, INVALID_IDS } from '@fixtures/ids.fixture';

describe('SplitIdVO', () => {
  describe('create()', () => {
    it('creates valid ID', () => {
      expect(SplitIdVO.create(TEST_IDS.SPLIT_ID).value).toBe(TEST_IDS.SPLIT_ID);
    });
    it('throws on empty', () => {
      expect(() => SplitIdVO.create(INVALID_IDS.EMPTY)).toThrow(ValidationError);
    });
    it('throws on invalid UUID', () => {
      expect(() => SplitIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(ValidationError);
    });
  });
  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(SplitIdVO.reconstitute('x').value).toBe('x');
    });
  });
});
