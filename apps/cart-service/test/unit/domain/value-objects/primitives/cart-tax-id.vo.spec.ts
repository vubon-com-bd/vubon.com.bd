/**
 * CartTaxIdVO — Unit Tests
 */
import { CartTaxIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-tax-id.vo.js';

describe('CartTaxIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  describe('create()', () => {
    it('creates VO from valid UUID', () => {
      expect(CartTaxIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
    });

    it('trims whitespace', () => {
      expect(CartTaxIdVO.create(`  ${VALID_UUID}  `).value).toBe(VALID_UUID);
    });

    it('throws on empty string', () => {
      expect(() => CartTaxIdVO.create('')).toThrow();
    });

    it('throws on non-UUID', () => {
      expect(() => CartTaxIdVO.create('not-uuid')).toThrow();
    });

    it('throws on null', () => {
      expect(() => CartTaxIdVO.create(null as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(CartTaxIdVO.reconstitute('any').value).toBe('any');
    });
  });

  describe('equals()', () => {
    it('true for same values', () => {
      expect(CartTaxIdVO.create(VALID_UUID).equals(CartTaxIdVO.create(VALID_UUID))).toBe(true);
    });

    it('false for different values', () => {
      expect(CartTaxIdVO.create(VALID_UUID).equals(CartTaxIdVO.create(OTHER_UUID))).toBe(false);
    });
  });
});
