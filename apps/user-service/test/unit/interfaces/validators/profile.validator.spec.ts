import { ProfileValidator } from '@interfaces/validators/profile.validator';

describe('Interface ProfileValidator', () => {
  it('should pass valid bio', () => {
    expect(ProfileValidator.validateBio('Hello world').success).toBe(true);
  });

  it('should fail non-string bio', () => {
    expect(ProfileValidator.validateBio(123 as never).success).toBe(false);
  });

  it('should fail too-long bio', () => {
    expect(ProfileValidator.validateBio('a'.repeat(600)).success).toBe(false);
  });

  it('should pass valid URL', () => {
    expect(ProfileValidator.validateAvatarUrl('https://cdn.example.com/a.png').success).toBe(true);
  });

  it('should fail invalid URL', () => {
    expect(ProfileValidator.validateAvatarUrl('not-a-url').success).toBe(false);
  });

  it('should pass valid update', () => {
    expect(ProfileValidator.validateUpdate({ bio: 'Hi' }).success).toBe(true);
  });

  it('should fail empty update', () => {
    expect(ProfileValidator.validateUpdate({}).success).toBe(false);
  });
});
