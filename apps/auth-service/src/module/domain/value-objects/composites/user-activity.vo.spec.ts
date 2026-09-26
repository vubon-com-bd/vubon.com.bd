/**
 * UserActivityVO — Unit Tests
 * @module auth-service/domain/value-objects/composites
 */
import { UserActivityVO } from './user-activity.vo';
import { UserIdVO } from '../primitives/user-id.vo';

describe('UserActivityVO', () => {
  const userId = UserIdVO.of('user-1');

  describe('empty()', () => {
    it('should create empty activity', () => {
      const vo = UserActivityVO.empty(userId);
      expect(vo.loginCount).toBe(0);
    });
  });

  describe('of()', () => {
    it('should accept valid activity', () => {
      const now = Date.now();
      const vo = UserActivityVO.of({
        userId,
        loginCount: 42,
        lastLoginAt: now - 1000,
        lastActiveAt: now,
      });
      expect(vo.loginCount).toBe(42);
    });

    it('should reject negative loginCount', () => {
      expect(() => UserActivityVO.of({
        userId, loginCount: -1,
      })).toThrow('cannot be negative');
    });
  });

  describe('isDormant()', () => {
    it('should return true for no lastActiveAt', () => {
      const vo = UserActivityVO.empty(userId);
      expect(vo.isDormant(Date.now())).toBe(true);
    });

    it('should return true for old lastActiveAt', () => {
      const now = Date.now();
      const vo = UserActivityVO.of({
        userId, loginCount: 1,
        lastActiveAt: now - 100 * 24 * 60 * 60 * 1000, // 100 days ago
      });
      expect(vo.isDormant(now)).toBe(true);
    });

    it('should return false for recent activity', () => {
      const now = Date.now();
      const vo = UserActivityVO.of({
        userId, loginCount: 1,
        lastActiveAt: now - 30 * 24 * 60 * 60 * 1000, // 30 days ago
      });
      expect(vo.isDormant(now)).toBe(false);
    });
  });

  describe('wasActiveRecently()', () => {
    it('should return true for recent activity (24h)', () => {
      const now = Date.now();
      const vo = UserActivityVO.of({
        userId, loginCount: 1,
        lastActiveAt: now - 60 * 60 * 1000, // 1 hour ago
      });
      expect(vo.wasActiveRecently(now)).toBe(true);
    });

    it('should return false for old activity', () => {
      const now = Date.now();
      const vo = UserActivityVO.of({
        userId, loginCount: 1,
        lastActiveAt: now - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      });
      expect(vo.wasActiveRecently(now)).toBe(false);
    });
  });
});
