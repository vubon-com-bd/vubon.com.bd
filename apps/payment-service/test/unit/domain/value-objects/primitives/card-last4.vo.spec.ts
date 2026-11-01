/**
 * CardLast4VO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CardLast4VO } from '@domain/primitives/card-last4.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CardLast4VO', () => {
  describe('create()', () => {
    it('creates valid last4', () => {
      expect(CardLast4VO.create('4242').value).toBe('4242');
    });
    it('trims whitespace', () => {
      expect(CardLast4VO.create('  4242  ').value).toBe('4242');
    });
    it('throws on empty', () => {
      expect(() => CardLast4VO.create('')).toThrow(ValidationError);
    });
    it('throws on 3 digits', () => {
      expect(() => CardLast4VO.create('424')).toThrow(ValidationError);
    });
    it('throws on 5 digits', () => {
      expect(() => CardLast4VO.create('42424')).toThrow(ValidationError);
    });
    it('throws on non-numeric', () => {
      expect(() => CardLast4VO.create('abcd')).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(CardLast4VO.reconstitute('x').value).toBe('x');
    });
  });

  describe('masked()', () => {
    it('returns masked form', () => {
      expect(CardLast4VO.create('4242').masked()).toBe('**** **** **** 4242');
    });
  });
});
