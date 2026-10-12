import { BusinessRegistrationVO } from '../../../../../src/module/domain/value-objects/primitives/business-registration.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

describe('BusinessRegistrationVO', () => {
  describe('create()', () => {
    it('accepts alphanumeric with hyphens', () => {
      expect(BusinessRegistrationVO.create('REG-2024-001').value).toBe('REG-2024-001');
    });

    it('uppercases input', () => {
      expect(BusinessRegistrationVO.create('reg-2024').value).toBe('REG-2024');
    });

    it('accepts slashes', () => {
      expect(BusinessRegistrationVO.create('REG/2024/001').value).toBe('REG/2024/001');
    });

    it('throws on too short', () => {
      expect(() => BusinessRegistrationVO.create('A')).toThrow(ValidationError);
    });

    it('throws on too long', () => {
      expect(() => BusinessRegistrationVO.create('A'.repeat(60))).toThrow(ValidationError);
    });

    it('throws on lowercase special chars', () => {
      expect(() => BusinessRegistrationVO.create('REG@2024')).toThrow(ValidationError);
    });
  });

  describe('isNumericOnly()', () => {
    it('true for digits only', () => {
      expect(BusinessRegistrationVO.create('12345678').isNumericOnly()).toBe(true);
    });

    it('false for alphanumeric', () => {
      expect(BusinessRegistrationVO.create('REG-2024').isNumericOnly()).toBe(false);
    });
  });
});
