/**
 * ProfileValidator Unit Test
 *
 * NOTE:
 *  - validateUpdate returns UpdateProfileRequestDTO
 *  - validateBio / validateAvatarUrl return { userId: '', bio/avatarUrl }
 *    (userId filled in by handler)
 */
import { ProfileValidator } from '@application/validators/profile.validator';

describe('ProfileValidator', () => {
  describe('validateUpdate', () => {
    it('should pass valid bio', () => {
      const result = ProfileValidator.validateUpdate({ bio: 'Hello world' });
      expect(result.success).toBe(true);
    });

    it('should pass valid avatarUrl', () => {
      const result = ProfileValidator.validateUpdate({
        avatarUrl: 'https://cdn.example.com/a.png',
      });
      expect(result.success).toBe(true);
    });

    it('should fail on empty object', () => {
      const result = ProfileValidator.validateUpdate({});
      expect(result.success).toBe(false);
    });

    it('should fail on too-long bio', () => {
      const result = ProfileValidator.validateUpdate({
        bio: 'a'.repeat(600),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('validateBio', () => {
    it('should pass valid string and return object with bio', () => {
      const result = ProfileValidator.validateBio('Hello world');
      expect(result.success).toBe(true);
      expect(result.data?.bio).toBe('Hello world');
      expect(result.data?.userId).toBe('');
    });

    it('should fail on non-string', () => {
      const result = ProfileValidator.validateBio(123 as unknown as string);
      expect(result.success).toBe(false);
    });

    it('should fail on too-long bio', () => {
      const result = ProfileValidator.validateBio('a'.repeat(600));
      expect(result.success).toBe(false);
    });
  });

  describe('validateAvatarUrl', () => {
    it('should pass valid URL and return object with avatarUrl', () => {
      const result = ProfileValidator.validateAvatarUrl('https://cdn.example.com/a.png');
      expect(result.success).toBe(true);
      expect(result.data?.avatarUrl).toBe('https://cdn.example.com/a.png');
    });

    it('should fail on invalid URL', () => {
      const result = ProfileValidator.validateAvatarUrl('not-a-url');
      expect(result.success).toBe(false);
    });

    it('should fail on non-string', () => {
      const result = ProfileValidator.validateAvatarUrl(123 as unknown as string);
      expect(result.success).toBe(false);
    });
  });

  describe('assertValidUpdate', () => {
    it('should return data for valid input', () => {
      const data = ProfileValidator.assertValidUpdate({ bio: 'Hi there' });
      expect(data.bio).toBe('Hi there');
    });

    it('should throw for invalid input', () => {
      expect(() => ProfileValidator.assertValidUpdate({})).toThrow();
    });
  });
});
