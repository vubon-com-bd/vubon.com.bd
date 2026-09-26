/**
 * PasswordValidatorService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 */
import { PasswordValidatorService } from './password-validator.service';
import { WeakPasswordError } from '../../../domain/errors/password.errors';

describe('PasswordValidatorService', () => {
  let service: PasswordValidatorService;

  beforeEach(() => {
    service = new PasswordValidatorService();
  });

  it('should have name', () => {
    expect(service.name).toBe('PasswordValidatorService');
  });

  describe('validate()', () => {
    it('should accept strong password', () => {
      expect(() => service.validate('Str0ng!Pass#2024')).not.toThrow();
    });

    it('should reject too short password', () => {
      expect(() => service.validate('Ab1!')).toThrow(WeakPasswordError);
    });

    it('should reject password without lowercase', () => {
      expect(() => service.validate('ABC1234!')).toThrow(WeakPasswordError);
    });

    it('should reject password without uppercase', () => {
      expect(() => service.validate('abc1234!')).toThrow(WeakPasswordError);
    });

    it('should reject password without digit', () => {
      expect(() => service.validate('Abcdefgh!')).toThrow(WeakPasswordError);
    });

    it('should reject password without special char', () => {
      expect(() => service.validate('Abcdefg1')).toThrow(WeakPasswordError);
    });

    it('should reject common weak passwords', () => {
      expect(() => service.validate('password')).toThrow(WeakPasswordError);
      expect(() => service.validate('12345678')).toThrow(WeakPasswordError);
      expect(() => service.validate('qwerty123')).toThrow(WeakPasswordError);
    });

    it('should reject password containing email local-part', () => {
      expect(() =>
        service.validate('JohnDoe123!', { email: 'johndoe@example.com' }),
      ).toThrow(WeakPasswordError);
    });

    it('should accept when email local-part too short', () => {
      expect(() =>
        service.validate('Abc12345!', { email: 'ab@example.com' }),
      ).not.toThrow();
    });

    it('should not require email context', () => {
      expect(() => service.validate('Str0ng!Pass#2024')).not.toThrow();
    });
  });
});
