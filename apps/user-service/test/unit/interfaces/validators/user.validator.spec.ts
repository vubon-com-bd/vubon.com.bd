/**
 * Interface UserValidator Unit Test
 */
import { UserValidator } from '@interfaces/validators/user.validator';

describe('Interface UserValidator', () => {
  it('should pass valid create input', () => {
    const r = UserValidator.validateCreate({
      email: 'user@example.com',
      password: 'Test123!@#',
      type: 'individual',
      acceptTerms: true,
    });
    expect(r.success).toBe(true);
  });

  it('should fail invalid email', () => {
    const r = UserValidator.validateCreate({
      email: 'bad',
      password: 'Test123!@#',
      type: 'individual',
      acceptTerms: true,
    });
    expect(r.success).toBe(false);
  });

  it('should pass valid update input', () => {
    const r = UserValidator.validateUpdate({ username: 'john_doe' });
    expect(r.success).toBe(true);
  });

  it('should fail empty update', () => {
    const r = UserValidator.validateUpdate({});
    expect(r.success).toBe(false);
  });
});
