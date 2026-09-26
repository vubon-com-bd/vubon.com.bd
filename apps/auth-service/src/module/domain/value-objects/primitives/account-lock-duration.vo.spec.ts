/**
 * AccountLockDurationVO — Unit Tests
 * @module auth-service/domain/value-objects/primitives
 */
import { AccountLockDurationVO } from './account-lock-duration.vo';

describe('AccountLockDurationVO', () => {
  describe('ofMs()', () => {
    it('should accept positive ms', () => {
      const vo = AccountLockDurationVO.ofMs(60_000);
      expect(vo.value).toBe(60_000);
    });

    it('should reject zero', () => {
      expect(() => AccountLockDurationVO.ofMs(0)).toThrow('positive');
    });

    it('should reject negative', () => {
      expect(() => AccountLockDurationVO.ofMs(-1000)).toThrow('positive');
    });

    it('should reject >365 days', () => {
      const maxPlus = 366 * 24 * 60 * 60 * 1000;
      expect(() => AccountLockDurationVO.ofMs(maxPlus)).toThrow('exceeds max');
    });

    it('should accept exactly 365 days', () => {
      const exactly365 = 365 * 24 * 60 * 60 * 1000;
      expect(() => AccountLockDurationVO.ofMs(exactly365)).not.toThrow();
    });

    it('should reject non-finite', () => {
      expect(() => AccountLockDurationVO.ofMs(NaN)).toThrow();
      expect(() => AccountLockDurationVO.ofMs(Infinity)).toThrow();
    });
  });

  describe('ofMinutes()', () => {
    it('should convert minutes to ms', () => {
      const vo = AccountLockDurationVO.ofMinutes(5);
      expect(vo.value).toBe(5 * 60 * 1000);
    });
  });

  describe('ofHours()', () => {
    it('should convert hours to ms', () => {
      const vo = AccountLockDurationVO.ofHours(2);
      expect(vo.value).toBe(2 * 60 * 60 * 1000);
    });
  });

  describe('ofDays()', () => {
    it('should convert days to ms', () => {
      const vo = AccountLockDurationVO.ofDays(1);
      expect(vo.value).toBe(24 * 60 * 60 * 1000);
    });
  });

  describe('minutes/hours/days getters', () => {
    it('should compute minutes correctly', () => {
      const vo = AccountLockDurationVO.ofMs(5 * 60 * 1000);
      expect(vo.minutes).toBe(5);
    });

    it('should compute hours correctly', () => {
      const vo = AccountLockDurationVO.ofMs(2 * 60 * 60 * 1000);
      expect(vo.hours).toBe(2);
    });

    it('should compute days correctly', () => {
      const vo = AccountLockDurationVO.ofMs(3 * 24 * 60 * 60 * 1000);
      expect(vo.days).toBe(3);
    });
  });

  describe('isPermanent()', () => {
    it('should return true for 365-day duration', () => {
      const vo = AccountLockDurationVO.ofDays(365);
      expect(vo.isPermanent()).toBe(true);
    });

    it('should return false for shorter duration', () => {
      const vo = AccountLockDurationVO.ofDays(30);
      expect(vo.isPermanent()).toBe(false);
    });
  });

  describe('canAutoUnlock()', () => {
    it('should return true for ≤24h', () => {
      expect(AccountLockDurationVO.ofHours(24).canAutoUnlock()).toBe(true);
      expect(AccountLockDurationVO.ofHours(12).canAutoUnlock()).toBe(true);
      expect(AccountLockDurationVO.ofMinutes(5).canAutoUnlock()).toBe(true);
    });

    it('should return false for >24h', () => {
      expect(AccountLockDurationVO.ofHours(25).canAutoUnlock()).toBe(false);
      expect(AccountLockDurationVO.ofDays(7).canAutoUnlock()).toBe(false);
    });

    it('should return true for exactly 24h', () => {
      expect(AccountLockDurationVO.ofHours(24).canAutoUnlock()).toBe(true);
    });
  });
});
