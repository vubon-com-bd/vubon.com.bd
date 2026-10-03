/**
 * UserValidator Unit Test (Application layer)
 */
import { UserValidator } from '@application/validators/user.validator';

describe('UserValidator', () => {
  describe('validateCreate', () => {
    const validInput = {
      email: 'user@example.com',
      password: 'Test123!@#',
      type: 'individual',
      acceptTerms: true,
    };

    it('should pass valid input', () => {
      const result = UserValidator.validateCreate(validInput);
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });

    it('should fail on invalid email', () => {
      const result = UserValidator.validateCreate({
        ...validInput,
        email: 'not-an-email',
      });
      expect(result.success).toBe(false);
      expect(result.errors?.length).toBeGreaterThan(0);
    });

    it('should fail on weak password', () => {
      const result = UserValidator.validateCreate({
        ...validInput,
        password: '123',
      });
      expect(result.success).toBe(false);
    });

    it('should fail when acceptTerms is false', () => {
      const result = UserValidator.validateCreate({
        ...validInput,
        acceptTerms: false,
      });
      expect(result.success).toBe(false);
    });

    it('should fail on invalid user type', () => {
      const result = UserValidator.validateCreate({
        ...validInput,
        type: 'invalid-type',
      });
      expect(result.success).toBe(false);
    });

    it('should fail on empty input', () => {
      const result = UserValidator.validateCreate({});
      expect(result.success).toBe(false);
    });
  });

  describe('validateUpdate', () => {
    it('should pass valid partial update', () => {
      const result = UserValidator.validateUpdate({ username: 'john_doe' });
      expect(result.success).toBe(true);
    });

    it('should fail on empty update object', () => {
      const result = UserValidator.validateUpdate({});
      expect(result.success).toBe(false);
    });

    it('should fail on unknown fields', () => {
      const result = UserValidator.validateUpdate({
        unknownField: 'x',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('assertValidCreate', () => {
    it('should return data for valid input', () => {
      const data = UserValidator.assertValidCreate({
        email: 'user@example.com',
        password: 'Test123!@#',
        type: 'individual',
        acceptTerms: true,
      });
      expect(data.email).toBe('user@example.com');
    });

    it('should throw for invalid input', () => {
      expect(() =>
        UserValidator.assertValidCreate({ email: 'bad' })
      ).toThrow();
    });
  });
});
