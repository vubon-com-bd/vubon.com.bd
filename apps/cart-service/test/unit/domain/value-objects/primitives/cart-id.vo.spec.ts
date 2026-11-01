/**
 * CartIdVO unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { CartIdVO } from '@domain/value-objects/primitives/cart-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { TEST_IDS } from '../../../../fixtures/index';

describe('CartIdVO', () => {
  describe('create()', () => {
    it('should create a valid CartIdVO from UUID', () => {
      const vo = CartIdVO.create(TEST_IDS.CART_ID);
      expect(vo.value).toBe(TEST_IDS.CART_ID);
    });

    it('should trim whitespace', () => {
      const vo = CartIdVO.create(`  ${TEST_IDS.CART_ID}  `);
      expect(vo.value).toBe(TEST_IDS.CART_ID);
    });

    it('should throw on empty string', () => {
      expect(() => CartIdVO.create('')).toThrow(ValidationError);
    });

    it('should throw on invalid UUID', () => {
      expect(() => CartIdVO.create('not-a-uuid')).toThrow(ValidationError);
      expect(() => CartIdVO.create('not-a-uuid')).toThrow(/valid UUID/);
    });

    it('should throw on non-string input', () => {
      expect(() => CartIdVO.create(null as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('should skip validation', () => {
      const vo = CartIdVO.reconstitute('anything-goes');
      expect(vo.value).toBe('anything-goes');
    });
  });

  describe('equality', () => {
    it('should be equal for same value', () => {
      const a = CartIdVO.create(TEST_IDS.CART_ID);
      const b = CartIdVO.create(TEST_IDS.CART_ID);
      expect(a.equals(b)).toBe(true);
    });

    it('should not be equal for different values', () => {
      const a = CartIdVO.create(TEST_IDS.CART_ID);
      const b = CartIdVO.create(TEST_IDS.CART_ID_2);
      expect(a.equals(b)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('should return the value', () => {
      const vo = CartIdVO.create(TEST_IDS.CART_ID);
      expect(vo.toString()).toBe(TEST_IDS.CART_ID);
    });
  });
});
