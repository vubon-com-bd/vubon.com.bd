/**
 * SessionIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SessionIdVO } from '@domain/value-objects/primitives/session-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/index';

describe('SessionIdVO', () => {
  describe('create()', () => {
    it('should create valid SessionIdVO', () => {
      const vo = SessionIdVO.create(TEST_IDS.SESSION_ID);
      expect(vo.value).toBe(TEST_IDS.SESSION_ID);
    });

    it('should trim whitespace', () => {
      const vo = SessionIdVO.create(`  ${TEST_IDS.SESSION_ID}  `);
      expect(vo.value).toBe(TEST_IDS.SESSION_ID);
    });

    it('should throw on empty string', () => {
      expect(() => SessionIdVO.create('')).toThrow(ValidationError);
    });

    it('should throw on invalid UUID', () => {
      expect(() => SessionIdVO.create('bad')).toThrow(/valid UUID/);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = SessionIdVO.reconstitute('any');
      expect(vo.value).toBe('any');
    });
  });

  describe('equality', () => {
    it('should be equal for same value', () => {
      const a = SessionIdVO.create(TEST_IDS.SESSION_ID);
      const b = SessionIdVO.create(TEST_IDS.SESSION_ID);
      expect(a.equals(b)).toBe(true);
    });
  });
});
