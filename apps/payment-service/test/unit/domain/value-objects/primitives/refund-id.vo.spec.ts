/**
 * RefundIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { RefundIdVO } from '@domain/primitives/refund-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, INVALID_IDS } from '@fixtures/ids.fixture';

describe('RefundIdVO', () => {
  describe('create()', () => {
    it('creates valid ID', () => {
      expect(RefundIdVO.create(TEST_IDS.REFUND_ID).value).toBe(TEST_IDS.REFUND_ID);
    });
    it('trims whitespace', () => {
      expect(RefundIdVO.create(`  ${TEST_IDS.REFUND_ID}  `).value).toBe(TEST_IDS.REFUND_ID);
    });
    it('throws on empty', () => {
      expect(() => RefundIdVO.create(INVALID_IDS.EMPTY)).toThrow(ValidationError);
    });
    it('throws on invalid UUID', () => {
      expect(() => RefundIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(RefundIdVO.reconstitute('x').value).toBe('x');
    });
  });

  describe('equality', () => {
    it('equal for same', () => {
      expect(
        RefundIdVO.create(TEST_IDS.REFUND_ID).equals(RefundIdVO.create(TEST_IDS.REFUND_ID)),
      ).toBe(true);
    });
    it('not equal for diff', () => {
      expect(
        RefundIdVO.create(TEST_IDS.REFUND_ID).equals(RefundIdVO.create(TEST_IDS.REFUND_ID_2)),
      ).toBe(false);
    });
  });
});
