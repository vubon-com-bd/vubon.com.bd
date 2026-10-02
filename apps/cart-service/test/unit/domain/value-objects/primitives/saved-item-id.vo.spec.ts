/**
 * SavedItemIdVO — Unit Tests
 */
import { SavedItemIdVO } from '../../../../../src/module/domain/value-objects/primitives/saved-item-id.vo.js';

describe('SavedItemIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  describe('create()', () => {
    it('creates VO from valid UUID', () => {
      const vo = SavedItemIdVO.create(VALID_UUID);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('trims whitespace', () => {
      const vo = SavedItemIdVO.create(`  ${VALID_UUID}  `);
      expect(vo.value).toBe(VALID_UUID);
    });

    it('throws on empty string', () => {
      expect(() => SavedItemIdVO.create('')).toThrow();
    });

    it('throws on non-UUID', () => {
      expect(() => SavedItemIdVO.create('not-uuid')).toThrow();
    });

    it('throws on null/undefined', () => {
      expect(() => SavedItemIdVO.create(null as never)).toThrow();
      expect(() => SavedItemIdVO.create(undefined as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      const vo = SavedItemIdVO.reconstitute('anything');
      expect(vo.value).toBe('anything');
    });
  });

  describe('equals()', () => {
    it('true for same values', () => {
      expect(SavedItemIdVO.create(VALID_UUID).equals(SavedItemIdVO.create(VALID_UUID))).toBe(true);
    });

    it('false for different values', () => {
      expect(SavedItemIdVO.create(VALID_UUID).equals(SavedItemIdVO.create(OTHER_UUID))).toBe(false);
    });
  });
});
