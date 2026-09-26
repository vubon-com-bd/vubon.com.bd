/**
 * UserProfileVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { UserProfileVO } from './user-profile.vo';
import { UserIdVO } from '../primitives/user-id.vo';
import { UserNameVO } from '../primitives/user-name.vo';

describe('UserProfileVO', () => {
  const base = {
    userId: UserIdVO.of('user-1'),
    displayName: UserNameVO.of('John Doe'),
  };

  describe('of()', () => {
    it('should create with minimal fields', () => {
      const vo = UserProfileVO.of(base);
      expect(vo.userId.value).toBe('user-1');
      expect(vo.displayName.value).toBe('John Doe');
    });

    it('should accept bio', () => {
      const vo = UserProfileVO.of({ ...base, bio: 'Hello world' });
      expect(vo.bio).toBe('Hello world');
    });

    it('should reject bio > 500 chars', () => {
      expect(() => UserProfileVO.of({ ...base, bio: 'x'.repeat(501) })).toThrow('Bio exceeds');
    });

    it('should accept avatarUrl', () => {
      const vo = UserProfileVO.of({ ...base, avatarUrl: 'https://img.com/a.jpg' });
      expect(vo.avatarUrl).toBe('https://img.com/a.jpg');
    });

    it('should reject avatarUrl > 2048 chars', () => {
      expect(() => UserProfileVO.of({ ...base, avatarUrl: 'a'.repeat(2049) })).toThrow('too long');
    });

    it('should default locale to bn-BD', () => {
      const vo = UserProfileVO.of(base);
      expect(vo.locale).toBe('bn-BD');
    });

    it('should accept custom locale', () => {
      const vo = UserProfileVO.of({ ...base, locale: 'en-US' });
      expect(vo.locale).toBe('en-US');
    });
  });

  describe('hasAvatar()', () => {
    it('should return true when avatarUrl set', () => {
      const vo = UserProfileVO.of({ ...base, avatarUrl: 'https://x.com/a.jpg' });
      expect(vo.hasAvatar()).toBe(true);
    });

    it('should return false when avatarUrl absent', () => {
      expect(UserProfileVO.of(base).hasAvatar()).toBe(false);
    });

    it('should return false for empty string', () => {
      const vo = UserProfileVO.of({ ...base, avatarUrl: '' });
      expect(vo.hasAvatar()).toBe(false);
    });
  });
});
