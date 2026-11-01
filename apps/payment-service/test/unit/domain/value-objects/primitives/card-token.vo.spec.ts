/**
 * CardTokenVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CardTokenVO } from '@domain/primitives/card-token.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '@fixtures/ids.fixture';

describe('CardTokenVO', () => {
  describe('create()', () => {
    it('creates valid token', () => {
      expect(CardTokenVO.create(TEST_IDS.CARD_TOKEN).value).toBe(TEST_IDS.CARD_TOKEN);
    });
    it('accepts alphanumeric + -_', () => {
      expect(CardTokenVO.create('tok_abc-123_xyz').value).toBe('tok_abc-123_xyz');
    });
    it('trims whitespace', () => {
      expect(CardTokenVO.create('  tok_abc123  ').value).toBe('tok_abc123');
    });
    it('throws on empty', () => {
      expect(() => CardTokenVO.create('')).toThrow(ValidationError);
    });
    it('throws on too short', () => {
      expect(() => CardTokenVO.create('abc')).toThrow(ValidationError);
    });
    it('throws on > 128 chars', () => {
      expect(() => CardTokenVO.create('a'.repeat(129))).toThrow(ValidationError);
    });
    it('throws on invalid chars', () => {
      expect(() => CardTokenVO.create('tok abc123')).toThrow(ValidationError);
      expect(() => CardTokenVO.create('tok@abc123')).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(CardTokenVO.reconstitute('x').value).toBe('x');
    });
  });

  describe('mask()', () => {
    it('masks long tokens', () => {
      const masked = CardTokenVO.create('tok_visa_test_1234').mask();
      expect(masked).toContain('...');
      expect(masked).toMatch(/^tok_\.\.\./);
    });
    it('returns **** for short tokens', () => {
      expect(CardTokenVO.reconstitute('short').mask()).toBe('****');
    });
  });
});
