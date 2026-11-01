/**
 * VerificationIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { VerificationIdVO } from '@domain/primitives/verification-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, INVALID_IDS } from '@fixtures/ids.fixture';

describe('VerificationIdVO', () => {
  describe('create()', () => {
    it('creates valid ID', () => {
      expect(VerificationIdVO.create(TEST_IDS.VERIFICATION_ID).value).toBe(TEST_IDS.VERIFICATION_ID);
    });
    it('throws on empty', () => {
      expect(() => VerificationIdVO.create(INVALID_IDS.EMPTY)).toThrow(ValidationError);
    });
    it('throws on invalid UUID', () => {
      expect(() => VerificationIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(ValidationError);
    });
  });
  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(VerificationIdVO.reconstitute('x').value).toBe('x');
    });
  });
});
