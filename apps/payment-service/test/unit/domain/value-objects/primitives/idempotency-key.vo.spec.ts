/**
 * IdempotencyKeyVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { IdempotencyKeyVO } from '@domain/primitives/idempotency-key.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/ids.fixture';

describe('IdempotencyKeyVO', () => {
  describe('create()', () => {
    it('creates valid key', () => {
      expect(IdempotencyKeyVO.create(TEST_IDS.IDEMPOTENCY_KEY).value).toBe(TEST_IDS.IDEMPOTENCY_KEY);
    });
    it('trims whitespace', () => {
      expect(IdempotencyKeyVO.create('  idem-key-12345678  ').value).toBe('idem-key-12345678');
    });
    it('accepts printable ASCII', () => {
      expect(IdempotencyKeyVO.create('key!@#$%^&*()_+').value).toBe('key!@#$%^&*()_+');
    });
    it('throws on too short', () => {
      expect(() => IdempotencyKeyVO.create('abc')).toThrow(ValidationError);
    });
    it('throws on > 128 chars', () => {
      expect(() => IdempotencyKeyVO.create('a'.repeat(129))).toThrow(ValidationError);
    });
    it('throws on non-printable', () => {
      expect(() => IdempotencyKeyVO.create('key with\ttab')).toThrow(ValidationError);
    });
    it('throws on non-string', () => {
      expect(() => IdempotencyKeyVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(IdempotencyKeyVO.reconstitute('x').value).toBe('x');
    });
  });

  describe('equalsKey()', () => {
    it('true for same string', () => {
      expect(IdempotencyKeyVO.create(TEST_IDS.IDEMPOTENCY_KEY).equalsKey(TEST_IDS.IDEMPOTENCY_KEY)).toBe(true);
    });
    it('false for different', () => {
      expect(IdempotencyKeyVO.create(TEST_IDS.IDEMPOTENCY_KEY).equalsKey('different')).toBe(false);
    });
  });
});
