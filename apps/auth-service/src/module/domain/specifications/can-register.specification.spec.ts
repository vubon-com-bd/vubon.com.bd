/**
 * CanRegisterSpecification — Unit Tests
 * @module auth-service/domain/specifications
 */
import { CanRegisterSpecification } from './can-register.specification';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';
import { UserPhoneVO } from '../value-objects/primitives/user-phone.vo';

const cleanInput = {
  email: UserEmailVO.of('new@example.com'),
  phone: UserPhoneVO.of('+8801712345678'),
  emailAlreadyExists: false,
  phoneAlreadyExists: false,
  registrationOpen: true,
  ipBlacklisted: false,
};

describe('CanRegisterSpecification', () => {
  describe('isSatisfiedBy()', () => {
    it('should return true for clean input', () => {
      expect(CanRegisterSpecification.isSatisfiedBy(cleanInput)).toBe(true);
    });

    it('should return false when registration closed', () => {
      expect(
        CanRegisterSpecification.isSatisfiedBy({
          ...cleanInput,
          registrationOpen: false,
        }),
      ).toBe(false);
    });

    it('should return false when email already exists', () => {
      expect(
        CanRegisterSpecification.isSatisfiedBy({
          ...cleanInput,
          emailAlreadyExists: true,
        }),
      ).toBe(false);
    });

    it('should return false when phone already exists', () => {
      expect(
        CanRegisterSpecification.isSatisfiedBy({
          ...cleanInput,
          phoneAlreadyExists: true,
        }),
      ).toBe(false);
    });

    it('should return false when IP is blacklisted', () => {
      expect(
        CanRegisterSpecification.isSatisfiedBy({
          ...cleanInput,
          ipBlacklisted: true,
        }),
      ).toBe(false);
    });
  });

  describe('explain()', () => {
    it('should return empty for clean input', () => {
      expect(CanRegisterSpecification.explain(cleanInput)).toEqual([]);
    });

    it('should list registration_closed', () => {
      const reasons = CanRegisterSpecification.explain({
        ...cleanInput,
        registrationOpen: false,
      });
      expect(reasons).toContain('registration_closed');
    });

    it('should list email_taken', () => {
      const reasons = CanRegisterSpecification.explain({
        ...cleanInput,
        emailAlreadyExists: true,
      });
      expect(reasons).toContain('email_taken');
    });

    it('should list phone_taken', () => {
      const reasons = CanRegisterSpecification.explain({
        ...cleanInput,
        phoneAlreadyExists: true,
      });
      expect(reasons).toContain('phone_taken');
    });

    it('should list ip_blacklisted', () => {
      const reasons = CanRegisterSpecification.explain({
        ...cleanInput,
        ipBlacklisted: true,
      });
      expect(reasons).toContain('ip_blacklisted');
    });

    it('should list multiple reasons', () => {
      const reasons = CanRegisterSpecification.explain({
        ...cleanInput,
        emailAlreadyExists: true,
        ipBlacklisted: true,
      });
      expect(reasons).toHaveLength(2);
    });
  });
});
