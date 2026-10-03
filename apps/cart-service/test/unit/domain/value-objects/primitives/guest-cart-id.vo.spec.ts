/**
 * GuestCartIdVO — Unit Tests
 */
import { GuestCartIdVO } from '../../../../../src/module/domain/value-objects/primitives/guest-cart-id.vo.js';

describe('GuestCartIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  describe('create()', () => {
    it('creates VO from valid UUID', () => {
      const vo = GuestCartIdVO.create(VALID_UUID);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('trims whitespace', () => {
      const vo = GuestCartIdVO.create(`  ${VALID_UUID}  `);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('throws on empty string', () => {
      expect(() => GuestCartIdVO.create('')).toThrow();
    });

    it('throws on non-UUID', () => {
      expect(() => GuestCartIdVO.create('not-uuid')).toThrow();
    });

    it('throws on non-string input', () => {
      expect(() => GuestCartIdVO.create(null as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = GuestCartIdVO.reconstitute('any');
      expect(vo.value).toBe('any');
    });
  });

  describe('equals()', () => {
    it('true for same values', () => {
      expect(GuestCartIdVO.create(VALID_UUID).equals(GuestCartIdVO.create(VALID_UUID))).toBe(true);
    });

    it('false for different values', () => {
      expect(GuestCartIdVO.create(VALID_UUID).equals(GuestCartIdVO.create(OTHER_UUID))).toBe(false);
    });
  });
});
