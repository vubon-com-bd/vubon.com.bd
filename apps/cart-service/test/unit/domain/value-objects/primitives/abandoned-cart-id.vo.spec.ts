/**
 * AbandonedCartIdVO — Unit Tests
 */
import { AbandonedCartIdVO } from '../../../../../src/module/domain/value-objects/primitives/abandoned-cart-id.vo.js';

describe('AbandonedCartIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  describe('create()', () => {
    it('creates VO from valid UUID', () => {
      const vo = AbandonedCartIdVO.create(VALID_UUID);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('trims whitespace', () => {
      const vo = AbandonedCartIdVO.create(`   ${VALID_UUID}   `);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('throws on empty string', () => {
      expect(() => AbandonedCartIdVO.create('')).toThrow();
    });

    it('throws on non-UUID', () => {
      expect(() => AbandonedCartIdVO.create('not-uuid')).toThrow();
    });

    it('throws on null/undefined', () => {
      expect(() => AbandonedCartIdVO.create(null as never)).toThrow();
      expect(() => AbandonedCartIdVO.create(undefined as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = AbandonedCartIdVO.reconstitute('anything');
      expect(vo.value).toBe('anything');
    });
  });

  describe('equals()', () => {
    it('true for same values', () => {
      expect(
        AbandonedCartIdVO.create(VALID_UUID).equals(AbandonedCartIdVO.create(VALID_UUID)),
      ).toBe(true);
    });

    it('false for different values', () => {
      expect(
        AbandonedCartIdVO.create(VALID_UUID).equals(AbandonedCartIdVO.create(OTHER_UUID)),
      ).toBe(false);
    });
  });
});
