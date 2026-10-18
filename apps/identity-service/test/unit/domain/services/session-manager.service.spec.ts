/**
 * SessionManagerService unit tests
 */
import { describe, it, expect } from '@jest/globals';
import { SessionManagerService } from '@domain/services/session-manager.service.js';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

describe('SessionManagerService', () => {
  describe('absoluteExpirySeconds()', () => {
    it('should return longer for rememberMe', () => {
      const normal = SessionManagerService.absoluteExpirySeconds(false);
      const remembered = SessionManagerService.absoluteExpirySeconds(true);
      expect(remembered).toBeGreaterThan(normal);
    });

    it('should default to normal', () => {
      expect(SessionManagerService.absoluteExpirySeconds()).toBe(
        SessionManagerService.absoluteExpirySeconds(false),
      );
    });
  });

  describe('buildExpiry()', () => {
    it('should create SessionExpiryVO', () => {
      const e = SessionManagerService.buildExpiry(false);
      expect(e.idleTimeoutSeconds).toBe(SessionManagerService.idleTimeoutSeconds());
      expect(e.isExpired(Date.now())).toBe(false);
    });

    it('remembered should have later expiry', () => {
      const a = SessionManagerService.buildExpiry(false);
      const b = SessionManagerService.buildExpiry(true);
      expect(b.absoluteExpiresAt).toBeGreaterThan(a.absoluteExpiresAt);
    });
  });

  describe('enforceConcurrentLimit()', () => {
    it('should pass when below limit', () => {
      expect(() => SessionManagerService.enforceConcurrentLimit(0)).not.toThrow();
      expect(() => SessionManagerService.enforceConcurrentLimit(3)).not.toThrow();
    });

    it('should throw when at limit', () => {
      const max = SessionManagerService.maxSessionsPerUser();
      expect(() => SessionManagerService.enforceConcurrentLimit(max)).toThrow(BusinessRuleError);
    });

    it('should throw when concurrent not allowed + existing', () => {
      // Concurrent login is allowed in config — skip if true
      if (!SessionManagerService.concurrentLoginAllowed()) {
        expect(() => SessionManagerService.enforceConcurrentLimit(1)).toThrow(BusinessRuleError);
      } else {
        expect(() => SessionManagerService.enforceConcurrentLimit(1)).not.toThrow();
      }
    });
  });

  describe('shouldRefresh()', () => {
    it('should return true within threshold', () => {
      const soon = Math.floor(Date.now() / 1000) + 60; // 1 min
      expect(SessionManagerService.shouldRefresh(soon)).toBe(true);
    });

    it('should return false outside threshold', () => {
      const later = Math.floor(Date.now() / 1000) + 10000;
      expect(SessionManagerService.shouldRefresh(later)).toBe(false);
    });
  });

  describe('selectForEviction()', () => {
    it('should return oldest first', () => {
      const sessions = [
        { id: 'a', createdAt: '2024-01-01T00:00:00Z' },
        { id: 'b', createdAt: '2024-06-01T00:00:00Z' },
        { id: 'c', createdAt: '2024-03-01T00:00:00Z' },
      ];
      expect(SessionManagerService.selectForEviction(sessions, 2)).toEqual(['a', 'c']);
    });

    it('should return empty if neededFree <= 0', () => {
      expect(SessionManagerService.selectForEviction([], 0)).toEqual([]);
      expect(SessionManagerService.selectForEviction([], -1)).toEqual([]);
    });
  });
});
