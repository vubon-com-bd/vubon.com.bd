/**
 * CartProductIdVO — Unit Tests (sample for reference IDs)
 */
import { CartProductIdVO } from '../../../../../src/module/domain/value-objects/primitives/product-id.vo.js';

describe('CartProductIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  describe('create()', () => {
    it('creates VO from valid UUID', () => {
      expect(CartProductIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
    });

    it('trims whitespace', () => {
      expect(CartProductIdVO.create(`  ${VALID_UUID}  `).value).toBe(VALID_UUID);
    });

    it('throws on empty string', () => {
      expect(() => CartProductIdVO.create('')).toThrow();
    });

    it('throws on non-UUID', () => {
      expect(() => CartProductIdVO.create('not-uuid')).toThrow();
    });

    it('throws on null/undefined', () => {
      expect(() => CartProductIdVO.create(null as never)).toThrow();
      expect(() => CartProductIdVO.create(undefined as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(CartProductIdVO.reconstitute('any').value).toBe('any');
    });
  });

  describe('equals()', () => {
    it('true for same values', () => {
      expect(
        CartProductIdVO.create(VALID_UUID).equals(CartProductIdVO.create(VALID_UUID)),
      ).toBe(true);
    });

    it('false for different values', () => {
      expect(
        CartProductIdVO.create(VALID_UUID).equals(CartProductIdVO.create(OTHER_UUID)),
      ).toBe(false);
    });
  });
});
