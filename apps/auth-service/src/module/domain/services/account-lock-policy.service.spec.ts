/**
 * AccountLockPolicyService — Unit Tests
 * @module auth-service/domain/services
 */
import { AccountLockPolicyService } from './account-lock-policy.service';

describe('AccountLockPolicyService', () => {
  // ═══════════════════════════════════════════════════════════
  // decide
  // ═══════════════════════════════════════════════════════════

  describe('decide()', () => {
    it('should NOT lock for 0-2 failed attempts', () => {
      [0, 1, 2].forEach((n) => {
        const d = AccountLockPolicyService.decide(n);
        expect(d.shouldLock).toBe(false);
        expect(d.reason).toBeNull();
      });
    });

    it('should lock 5 min at 3 failed attempts', () => {
      const d = AccountLockPolicyService.decide(3);
      expect(d.shouldLock).toBe(true);
      expect(d.isPermanent).toBe(false);
      expect(d.reason).toBe('too_many_attempts');
      expect(d.duration?.minutes).toBe(5);
    });

    it('should lock 30 min at 5 failed attempts', () => {
      const d = AccountLockPolicyService.decide(5);
      expect(d.shouldLock).toBe(true);
      expect(d.duration?.minutes).toBe(30);
    });

    it('should lock 24h at 10 failed attempts', () => {
      const d = AccountLockPolicyService.decide(10);
      expect(d.shouldLock).toBe(true);
      expect(d.duration?.hours).toBe(24);
    });

    it('should permanent lock at 20+ attempts (2x last threshold)', () => {
      const d = AccountLockPolicyService.decide(20);
      expect(d.shouldLock).toBe(true);
      expect(d.isPermanent).toBe(true);
    });

    it('should lock 30 min at 6-9 attempts', () => {
      [6, 7, 8, 9].forEach((n) => {
        const d = AccountLockPolicyService.decide(n);
        expect(d.duration?.minutes).toBe(30);
      });
    });

    it('should lock 24h at 11-19 attempts', () => {
      [11, 15, 19].forEach((n) => {
        const d = AccountLockPolicyService.decide(n);
        expect(d.duration?.hours).toBe(24);
      });
    });
  });

  // ═══════════════════════════════════════════════════════════
  // isSuspicious
  // ═══════════════════════════════════════════════════════════

  describe('isSuspicious()', () => {
    it('should flag >= 20 attempts from same IP', () => {
      expect(
        AccountLockPolicyService.isSuspicious({
          attemptsFromSameIp: 20,
          distinctEmailsFromIp: 1,
          windowMs: 60 * 60 * 1000,
        }),
      ).toBe(true);
    });

    it('should NOT flag < 20 attempts from same IP', () => {
      expect(
        AccountLockPolicyService.isSuspicious({
          attemptsFromSameIp: 19,
          distinctEmailsFromIp: 1,
          windowMs: 60 * 60 * 1000,
        }),
      ).toBe(false);
    });

    it('should flag credential stuffing: 5+ emails in short window', () => {
      expect(
        AccountLockPolicyService.isSuspicious({
          attemptsFromSameIp: 10,
          distinctEmailsFromIp: 5,
          windowMs: 5 * 60 * 1000,
        }),
      ).toBe(true);
    });

    it('should NOT flag 5 emails in long window', () => {
      expect(
        AccountLockPolicyService.isSuspicious({
          attemptsFromSameIp: 10,
          distinctEmailsFromIp: 5,
          windowMs: 30 * 60 * 1000,
        }),
      ).toBe(false);
    });

    it('should NOT flag normal activity', () => {
      expect(
        AccountLockPolicyService.isSuspicious({
          attemptsFromSameIp: 5,
          distinctEmailsFromIp: 1,
          windowMs: 5 * 60 * 1000,
        }),
      ).toBe(false);
    });
  });
});
