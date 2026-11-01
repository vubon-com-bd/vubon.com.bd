/**
 * CardBrandVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CardBrandVO } from '@domain/primitives/card-brand.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('CardBrandVO', () => {
  describe('create()', () => {
    it('accepts all brands', () => {
      for (const b of ['visa', 'mastercard', 'amex', 'discover', 'diners', 'jcb', 'unionpay', 'unknown']) {
        expect(CardBrandVO.create(b).value).toBe(b);
      }
    });
    it('normalizes case', () => {
      expect(CardBrandVO.create('VISA').value).toBe('visa');
    });
    it('throws on invalid', () => {
      expect(() => CardBrandVO.create('unknown_brand')).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('preserves value', () => {
      expect(CardBrandVO.reconstitute('visa').value).toBe('visa');
    });
  });

  describe('fromPan()', () => {
    it('detects visa (4xxx)', () => {
      expect(CardBrandVO.fromPan('4242424242424242').value).toBe('visa');
    });
    it('detects mastercard (5xxx)', () => {
      expect(CardBrandVO.fromPan('5555555555554444').value).toBe('mastercard');
    });
    it('detects mastercard (2xxx)', () => {
      expect(CardBrandVO.fromPan('2221000000000009').value).toBe('mastercard');
    });
    it('detects amex (34/37)', () => {
      expect(CardBrandVO.fromPan('378282246310005').value).toBe('amex');
      expect(CardBrandVO.fromPan('371449635398431').value).toBe('amex');
    });
    it('detects discover (6011)', () => {
      expect(CardBrandVO.fromPan('6011111111111117').value).toBe('discover');
    });
    it('detects jcb (35)', () => {
      expect(CardBrandVO.fromPan('3530111333300000').value).toBe('jcb');
    });
    it('detects unionpay (62)', () => {
      expect(CardBrandVO.fromPan('6200000000000005').value).toBe('unionpay');
    });
    it('returns unknown for unsupported', () => {
      expect(CardBrandVO.fromPan('9999999999999999').value).toBe('unknown');
    });
  });

  describe('isKnown()', () => {
    it('true for non-unknown', () => {
      expect(CardBrandVO.create('visa').isKnown()).toBe(true);
    });
    it('false for unknown', () => {
      expect(CardBrandVO.create('unknown').isKnown()).toBe(false);
    });
  });

  describe('requiresCvv()', () => {
    it('true for visa', () => {
      expect(CardBrandVO.create('visa').requiresCvv()).toBe(true);
    });
    it('false for unknown', () => {
      expect(CardBrandVO.create('unknown').requiresCvv()).toBe(false);
    });
    it('false for unionpay', () => {
      expect(CardBrandVO.create('unionpay').requiresCvv()).toBe(false);
    });
  });
});
