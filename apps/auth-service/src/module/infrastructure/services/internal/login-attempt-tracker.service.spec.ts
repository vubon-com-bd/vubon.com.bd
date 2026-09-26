/**
 * LoginAttemptTrackerService — Unit Tests
 * @module auth-service/infrastructure/services/internal
 */
import { LoginAttemptTrackerService } from './login-attempt-tracker.service';

describe('LoginAttemptTrackerService', () => {
  let service: LoginAttemptTrackerService;

  beforeEach(() => {
    service = new LoginAttemptTrackerService();
  });

  it('should have name', () => {
    expect(service.name).toBe('LoginAttemptTrackerService');
  });

  describe('decide()', () => {
    it('should not lock for <3 attempts', () => {
      expect(service.decide(2).shouldLock).toBe(false);
    });

    it('should lock at 3 attempts', () => {
      const d = service.decide(3);
      expect(d.shouldLock).toBe(true);
      expect(d.duration?.minutes).toBe(5);
    });

    it('should permanent lock at >=20 attempts', () => {
      const d = service.decide(20);
      expect(d.isPermanent).toBe(true);
    });
  });

  describe('isSuspicious()', () => {
    it('should flag 20+ attempts from same IP', () => {
      expect(
        service.isSuspicious({
          attemptsFromSameIp: 20,
          distinctEmailsFromIp: 1,
          windowMs: 60_000,
        }),
      ).toBe(true);
    });

    it('should flag credential stuffing', () => {
      expect(
        service.isSuspicious({
          attemptsFromSameIp: 10,
          distinctEmailsFromIp: 5,
          windowMs: 5 * 60 * 1000,
        }),
      ).toBe(true);
    });

    it('should not flag normal activity', () => {
      expect(
        service.isSuspicious({
          attemptsFromSameIp: 5,
          distinctEmailsFromIp: 1,
          windowMs: 60_000,
        }),
      ).toBe(false);
    });
  });
});
