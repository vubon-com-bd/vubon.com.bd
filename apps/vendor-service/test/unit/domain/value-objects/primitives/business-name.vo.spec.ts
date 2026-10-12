import { BusinessNameVO } from '../../../../../src/module/domain/value-objects/primitives/business-name.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('BusinessNameVO', () => {
  describe('create()', () => {
    it('creates valid business name', () => {
      expect(BusinessNameVO.create('Acme Trading Ltd').value).toBe('Acme Trading Ltd');
    });

    it('normalizes whitespace', () => {
      expect(BusinessNameVO.create('  Acme   Trading  ').value).toBe('Acme Trading');
    });

    it('allows numbers and symbols', () => {
      expect(BusinessNameVO.create('Acme & Co. (2024)').value).toBe('Acme & Co. (2024)');
    });

    it('throws on too short', () => {
      expect(() => BusinessNameVO.create('A')).toThrow(ValidationError);
    });

    it('throws on too long', () => {
      expect(() => BusinessNameVO.create('A'.repeat(300))).toThrow(ValidationError);
    });

    it('throws on invalid chars', () => {
      expect(() => BusinessNameVO.create('Acme <script>')).toThrow(ValidationError);
    });

    it('throws on non-string', () => {
      expect(() => BusinessNameVO.create(123 as unknown as string)).toThrow(ValidationError);
    });
  });

  describe('reconstitute()', () => {
    it('creates without validation', () => {
      expect(BusinessNameVO.reconstitute('X').value).toBe('X');
    });
  });
});
