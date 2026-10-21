/**
 * PaymentIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, INVALID_IDS } from '@fixtures/ids.fixture';

describe('PaymentIdVO', () => {
  describe('create()', () => {
    it('creates a valid PaymentIdVO from UUID', () => {
      const vo = PaymentIdVO.create(TEST_IDS.PAYMENT_ID);
      expect(vo.value).toBe(TEST_IDS.PAYMENT_ID);
    });

    it('trims whitespace', () => {
      const vo = PaymentIdVO.create(`  ${TEST_IDS.PAYMENT_ID}  `);
      expect(vo.value).toBe(TEST_IDS.PAYMENT_ID);
    });

    it('throws on empty string', () => {
      expect(() => PaymentIdVO.create(INVALID_IDS.EMPTY)).toThrow(ValidationError);
    });

    it('throws on whitespace-only', () => {
      expect(() => PaymentIdVO.create(INVALID_IDS.WHITESPACE)).toThrow(ValidationError);
    });

    it('throws on non-UUID', () => {
      expect(() => PaymentIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(ValidationError);
      expect(() => PaymentIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(/UUID/);
    });

    it('throws on null input', () => {
      expect(() => PaymentIdVO.create(INVALID_IDS.NULL)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = PaymentIdVO.reconstitute('anything-goes');
      expect(vo.value).toBe('anything-goes');
    });

    it('preserves value', () => {
      const vo = PaymentIdVO.reconstitute(TEST_IDS.PAYMENT_ID);
      expect(vo.value).toBe(TEST_IDS.PAYMENT_ID);
    });
  });

  describe('equality', () => {
    it('equal for same value', () => {
      const a = PaymentIdVO.create(TEST_IDS.PAYMENT_ID);
      const b = PaymentIdVO.create(TEST_IDS.PAYMENT_ID);
      expect(a.equals(b)).toBe(true);
    });

    it('not equal for different values', () => {
      const a = PaymentIdVO.create(TEST_IDS.PAYMENT_ID);
      const b = PaymentIdVO.create(TEST_IDS.PAYMENT_ID_2);
      expect(a.equals(b)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('returns the value', () => {
      const vo = PaymentIdVO.create(TEST_IDS.PAYMENT_ID);
      expect(vo.toString()).toBe(TEST_IDS.PAYMENT_ID);
    });
  });
});
