/**
 * UserActivityEntity — Unit Tests
 * @module auth-service/domain/entities
 */
import { UserActivityEntity } from './user-activity.entity';

const NOW = '2024-01-01T00:00:00.000Z';

const buildActivity = (overrides: Partial<Parameters<typeof UserActivityEntity.create>[0]> = {}) =>
  UserActivityEntity.create({
    id: 'act-1',
    userId: 'user-1' as never,
    type: 'login',
    ipAddress: '192.168.1.1',
    userAgent: 'Mozilla/5.0',
    createdAt: NOW,
    updatedAt: NOW,
    ...overrides,
  });

describe('UserActivityEntity', () => {
  describe('create()', () => {
    it('should create valid activity', () => {
      const a = buildActivity();
      expect(a.type).toBe('login');
      expect(a.userId).toBe('user-1');
    });

    it('should accept all activity types', () => {
      const types = ['login', 'logout', 'register', 'password_change', 'email_change',
        'profile_update', 'mfa_enabled', 'mfa_disabled', 'session_revoked', 'failed_login'];
      types.forEach((t) => {
        const a = buildActivity({ type: t as never });
        expect(a.type).toBe(t);
      });
    });

    it('should accept optional ip', () => {
      const a = buildActivity({ ipAddress: undefined });
      expect(a.ipAddress).toBeUndefined();
    });

    it('should accept optional userAgent', () => {
      const a = buildActivity({ userAgent: undefined });
      expect(a.userAgent).toBeUndefined();
    });

    it('should accept optional metadata', () => {
      const a = buildActivity({ metadata: { key: 'value' } });
      expect(a.metadata).toEqual({ key: 'value' });
    });
  });

  describe('isSecurityRelevant()', () => {
    it('should return true for failed_login', () => {
      const a = buildActivity({ type: 'failed_login' });
      expect(a.isSecurityRelevant()).toBe(true);
    });

    it('should return true for password_change', () => {
      const a = buildActivity({ type: 'password_change' });
      expect(a.isSecurityRelevant()).toBe(true);
    });

    it('should return false for login', () => {
      const a = buildActivity({ type: 'login' });
      expect(a.isSecurityRelevant()).toBe(false);
    });

    it('should return false for logout', () => {
      const a = buildActivity({ type: 'logout' });
      expect(a.isSecurityRelevant()).toBe(false);
    });
  });

  describe('getters', () => {
    it('should expose ipAddress', () => {
      expect(buildActivity().ipAddress).toBe('192.168.1.1');
    });

    it('should expose userAgent', () => {
      expect(buildActivity().userAgent).toBe('Mozilla/5.0');
    });

    it('should expose metadata', () => {
      const meta = { action: 'test' };
      expect(buildActivity({ metadata: meta }).metadata).toEqual(meta);
    });
  });
});
