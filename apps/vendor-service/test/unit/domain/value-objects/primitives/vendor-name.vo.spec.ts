import { VendorNameVO } from '../../../../../src/module/domain/value-objects/primitives/vendor-name.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('VendorNameVO', () => {
  describe('create()', () => {
    it('creates with valid name', () => {
      expect(VendorNameVO.create('Acme Store').value).toBe('Acme Store');
    });

    it('normalizes whitespace', () => {
      expect(VendorNameVO.create('  Acme   Store  ').value).toBe('Acme Store');
    });

    it('allows numbers, dots, commas, ampersand', () => {
      expect(VendorNameVO.create('Acme & Co. 2024').value).toBe('Acme & Co. 2024');
    });

    it('throws on too short name', () => {
      expect(() => VendorNameVO.create('A')).toThrow(ValidationError);
    });

    it('throws on too long name', () => {
      expect(() => VendorNameVO.create('A'.repeat(300))).toThrow(ValidationError);
    });

    it('throws on invalid characters', () => {
      expect(() => VendorNameVO.create('Acme<script>')).toThrow(ValidationError);
    });

    it('throws on non-string', () => {
      expect(() => VendorNameVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('fromLegalName()', () => {
    it('creates from legal name', () => {
      expect(VendorNameVO.fromLegalName('Acme Ltd.').value).toBe('Acme Ltd.');
    });
  });

  describe('reconstitute()', () => {
    it('creates without validation', () => {
      expect(VendorNameVO.reconstitute('X').value).toBe('X');
    });
  });
});
