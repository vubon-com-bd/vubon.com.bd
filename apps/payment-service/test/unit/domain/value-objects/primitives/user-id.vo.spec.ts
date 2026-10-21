/**
 * UserIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { UserIdVO } from '@domain/primitives/user-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, INVALID_IDS } from '@fixtures/ids.fixture';

describe('UserIdVO', () => {
  describe('create()', () => {
    it('creates valid ID', () => {
      expect(UserIdVO.create(TEST_IDS.USER_ID).value).toBe(TEST_IDS.USER_ID);
    });
    it('trims whitespace', () => {
      expect(UserIdVO.create(`  ${TEST_IDS.USER_ID}  `).value).toBe(TEST_IDS.USER_ID);
    });
    it('throws on empty', () => {
      expect(() => UserIdVO.create(INVALID_IDS.EMPTY)).toThrow(ValidationError);
    });
    it('throws on invalid UUID', () => {
      expect(() => UserIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(ValidationError);
    });
  });
  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(UserIdVO.reconstitute('x').value).toBe('x');
    });
  });
  describe('equality', () => {
    it('equal same', () => {
      expect(UserIdVO.create(TEST_IDS.USER_ID).equals(UserIdVO.create(TEST_IDS.USER_ID))).toBe(true);
    });
    it('not equal diff', () => {
      expect(UserIdVO.create(TEST_IDS.USER_ID).equals(UserIdVO.create(TEST_IDS.USER_ID_2))).toBe(false);
    });
  });
});
