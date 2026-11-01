/**
 * PaymentMethodIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { PaymentMethodIdVO } from '@domain/primitives/payment-method-id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS, INVALID_IDS } from '@fixtures/ids.fixture';

describe('PaymentMethodIdVO', () => {
  describe('create()', () => {
    it('creates valid ID', () => {
      const vo = PaymentMethodIdVO.create(TEST_IDS.METHOD_ID);
      expect(vo.value).toBe(TEST_IDS.METHOD_ID);
    });
    it('trims whitespace', () => {
      const vo = PaymentMethodIdVO.create(`  ${TEST_IDS.METHOD_ID}  `);
      expect(vo.value).toBe(TEST_IDS.METHOD_ID);
    });
    it('throws on empty', () => {
      expect(() => PaymentMethodIdVO.create(INVALID_IDS.EMPTY)).toThrow(ValidationError);
    });
    it('throws on invalid UUID', () => {
      expect(() => PaymentMethodIdVO.create(INVALID_IDS.NOT_UUID)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(PaymentMethodIdVO.reconstitute('x').value).toBe('x');
    });
  });

  describe('equality', () => {
    it('equal for same ID', () => {
      const a = PaymentMethodIdVO.create(TEST_IDS.METHOD_ID);
      const b = PaymentMethodIdVO.create(TEST_IDS.METHOD_ID);
      expect(a.equals(b)).toBe(true);
    });
    it('not equal for diff IDs', () => {
      const a = PaymentMethodIdVO.create(TEST_IDS.METHOD_ID);
      const b = PaymentMethodIdVO.create(TEST_IDS.METHOD_ID_2);
      expect(a.equals(b)).toBe(false);
    });
  });
});
