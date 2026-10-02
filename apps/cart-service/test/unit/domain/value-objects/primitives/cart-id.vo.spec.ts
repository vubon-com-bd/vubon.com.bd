/**
 * CartIdVO — Unit Tests
 */
import { CartIdVO } from '../../../../../src/module/domain/value-objects/primitives/cart-id.vo.js';

describe('CartIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  describe('create()', () => {
    it('creates a valid VO from a UUID string', () => {
      const vo = CartIdVO.create(VALID_UUID);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('trims surrounding whitespace', () => {
      const vo = CartIdVO.create(`   ${VALID_UUID}   `);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('throws on empty string', () => {
      expect(() => CartIdVO.create('')).toThrow();
    });

    it('throws on whitespace-only string', () => {
      expect(() => CartIdVO.create('   ')).toThrow();
    });

    it('throws on non-UUID input', () => {
      expect(() => CartIdVO.create('not-a-uuid')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => CartIdVO.create(null as never)).toThrow();
      expect(() => CartIdVO.create(undefined as never)).toThrow();
      expect(() => CartIdVO.create(123 as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('accepts any string without validation', () => {
      const vo = CartIdVO.reconstitute('any-raw-string');
      expect(vo.value).toBe('any-raw-string');
    });
  });

  describe('equals()', () => {
    it('returns true for equal values', () => {
      const a = CartIdVO.create(VALID_UUID);
      const b = CartIdVO.create(VALID_UUID);
      expect(a.equals(b)).toBe(true);
    });

    it('returns false for different values', () => {
      const a = CartIdVO.create(VALID_UUID);
      const b = CartIdVO.create(OTHER_UUID);
      expect(a.equals(b)).toBe(false);
    });
  });

  describe('toString()', () => {
    it('returns the raw value', () => {
      const vo = CartIdVO.create(VALID_UUID);
      expect(vo.toString()).toBe(VALID_UUID);
    });
  });

  describe('toJSON()', () => {
    it('returns the raw value', () => {
      const vo = CartIdVO.create(VALID_UUID);
      expect(vo.toJSON()).toBe(VALID_UUID);
    });
  });
});
