import { jest } from '@jest/globals';
void jest;

import { CartVariantIdVO } from '../../../../../src/module/domain/value-objects/primitives/variant-id.vo.js';

describe('CartVariantIdVO', () => {
  const VALID_UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';
  const OTHER_UUID = '00000000-0000-0000-0000-000000000000';

  describe('create()', () => {
    it('creates VO from valid UUID', () => {
      expect(CartVariantIdVO.create(VALID_UUID).value).toBe(VALID_UUID);
    });
    it('trims whitespace', () => {
      expect(CartVariantIdVO.create(`  ${VALID_UUID}  `).value).toBe(VALID_UUID);
    });
    it('throws on empty string', () => {
      expect(() => CartVariantIdVO.create('')).toThrow();
    });
    it('throws on non-UUID', () => {
      expect(() => CartVariantIdVO.create('not-uuid')).toThrow();
    });
    it('throws on null/undefined', () => {
      expect(() => CartVariantIdVO.create(null as never)).toThrow();
      expect(() => CartVariantIdVO.create(undefined as never)).toThrow();
    });
  });

  describe('reconstitute()', () => {
    it('skips validation', () => {
      expect(CartVariantIdVO.reconstitute('any').value).toBe('any');
    });
  });

  describe('equals()', () => {
    it('true for same', () => {
      expect(CartVariantIdVO.create(VALID_UUID).equals(CartVariantIdVO.create(VALID_UUID))).toBe(true);
    });
    it('false for different', () => {
      expect(CartVariantIdVO.create(VALID_UUID).equals(CartVariantIdVO.create(OTHER_UUID))).toBe(false);
    });
  });
});
