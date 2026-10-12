import { VendorIdVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-id.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const UUID = '7c9e6679-7425-40de-944b-e07fc1f90ae7';

describe('VendorIdVO', () => {
  describe('create()', () => {
    it('creates from valid UUID', () => {
      expect(VendorIdVO.create(UUID).value).toBe(UUID);
    });

    it('trims whitespace', () => {
      expect(VendorIdVO.create(`  ${UUID}  `).value).toBe(UUID);
    });

    it('accepts uppercase UUID', () => {
      expect(VendorIdVO.create(UUID.toUpperCase()).value).toBe(UUID.toUpperCase());
    });

    it('throws on empty', () => {
      expect(() => VendorIdVO.create('')).toThrow(ValidationError);
    });

    it('throws on invalid UUID', () => {
      expect(() => VendorIdVO.create('not-a-uuid')).toThrow(ValidationError);
    });

    it('throws on non-string', () => {
      expect(() => VendorIdVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('creates without validation', () => {
      const vo = VendorIdVO.reconstitute('any-string');
      expect(vo.value).toBe('any-string');
    });
  });

  describe('equals()', () => {
    it('true for same id', () => {
      expect(VendorIdVO.create(UUID).equals(VendorIdVO.create(UUID))).toBe(true);
    });

    it('false for different id', () => {
      const other = '8c9e6679-7425-40de-944b-e07fc1f90ae7';
      expect(VendorIdVO.create(UUID).equals(VendorIdVO.create(other))).toBe(false);
    });
  });
});
