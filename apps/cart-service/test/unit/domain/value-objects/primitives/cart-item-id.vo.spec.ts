/**
 * CartItemIdVO — Unit Tests
 */
import { CartItemIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-item-id.vo.js';

describe('CartItemIdVO', () => {
  const VALID_UUID = '123e4567-e89b-12d3-a456-426614174000';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  describe('create()', () => {
    it('creates VO from valid UUID', () => {
      const vo = CartItemIdVO.create(VALID_UUID);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('trims whitespace', () => {
      const vo = CartItemIdVO.create(`  ${VALID_UUID}  `);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('throws on empty string', () => {
      expect(() => CartItemIdVO.create('')).toThrow();
    });

    it('throws on non-UUID', () => {
      expect(() => CartItemIdVO.create('xyz')).toThrow();
    });

    it('throws on null/undefined', () => {
      expect(() => CartItemIdVO.create(null as never)).toThrow();
      expect(() => CartItemIdVO.create(undefined as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = CartItemIdVO.reconstitute('anything');
      expect(vo.value).toBe('anything');
    });
  });

  describe('equals()', () => {
    it('true for same values', () => {
      expect(CartItemIdVO.create(VALID_UUID).equals(CartItemIdVO.create(VALID_UUID))).toBe(true);
    });

    it('false for different values', () => {
      expect(CartItemIdVO.create(VALID_UUID).equals(CartItemIdVO.create(OTHER_UUID))).toBe(false);
    });
  });
});
