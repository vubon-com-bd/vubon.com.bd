/**
 * CartShippingIdVO — Unit Tests
 */
import { CartShippingIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-shipping-id.vo.js';

describe('CartShippingIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  describe('create()', () => {
    it('creates VO from valid UUID', () => {
      expect(CartShippingIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
    });

    it('trims whitespace', () => {
      expect(CartShippingIdVO.create(`  ${VALID_UUID}  `).value).toBe(VALID_UUID);
    });

    it('throws on empty string', () => {
      expect(() => CartShippingIdVO.create('')).toThrow();
    });

    it('throws on non-UUID', () => {
      expect(() => CartShippingIdVO.create('not-uuid')).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(CartShippingIdVO.reconstitute('any').value).toBe('any');
    });
  });

  describe('equals()', () => {
    it('true for same values', () => {
      expect(
        CartShippingIdVO.create(VALID_UUID).equals(CartShippingIdVO.create(VALID_UUID)),
      ).toBe(true);
    });

    it('false for different values', () => {
      expect(
        CartShippingIdVO.create(VALID_UUID).equals(CartShippingIdVO.create(OTHER_UUID)),
      ).toBe(false);
    });
  });
});
