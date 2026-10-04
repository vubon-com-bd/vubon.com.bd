/**
 * CartMergerIdVO — Unit Tests
 */
import { CartMergerIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-merger-id.vo.js';

describe('CartMergerIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  describe('create()', () => {
    it('creates VO from valid UUID', () => {
      const vo = CartMergerIdVO.create(VALID_UUID);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('trims whitespace', () => {
      const vo = CartMergerIdVO.create(`  ${VALID_UUID}  `);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('throws on empty string', () => {
      expect(() => CartMergerIdVO.create('')).toThrow();
    });

    it('throws on non-UUID', () => {
      expect(() => CartMergerIdVO.create('not-uuid')).toThrow();
    });

    it('throws on null/undefined', () => {
      expect(() => CartMergerIdVO.create(null as never)).toThrow();
      expect(() => CartMergerIdVO.create(undefined as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = CartMergerIdVO.reconstitute('any');
      expect(vo.value).toBe('any');
    });
  });

  describe('equals()', () => {
    it('true for same values', () => {
      expect(CartMergerIdVO.create(VALID_UUID).equals(CartMergerIdVO.create(VALID_UUID))).toBe(
        true,
      );
    });

    it('false for different values', () => {
      expect(CartMergerIdVO.create(VALID_UUID).equals(CartMergerIdVO.create(OTHER_UUID))).toBe(
        false,
      );
    });
  });
});
