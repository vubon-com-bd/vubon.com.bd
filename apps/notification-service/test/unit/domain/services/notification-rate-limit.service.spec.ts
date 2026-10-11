/**
 * NotificationRateLimitService — channel-aware quota checks
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationRateLimitService } from '../../../../src/module/domain/services/notification-rate-limit.service.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';
import { NOTIFICATION_CHANNEL_LIMIT } from '@vubon/shared-constants/platform/notification';

describe('NotificationRateLimitService', () => {
  describe('dailyLimitFor', () => {
    it('should return email daily limit', () => {
      expect(
        NotificationRateLimitService.dailyLimitFor(NotificationChannelVO.email()),
      ).toBe(NOTIFICATION_CHANNEL_LIMIT.EMAIL_PER_DAY);
    });

    it('should return sms daily limit', () => {
      expect(
        NotificationRateLimitService.dailyLimitFor(NotificationChannelVO.sms()),
      ).toBe(NOTIFICATION_CHANNEL_LIMIT.SMS_PER_DAY);
    });
  });

  describe('check', () => {
    it('should allow when under limit', () => {
      const result = NotificationRateLimitService.check({
        channel: NotificationChannelVO.email(),
        userDailyCount: 10,
        globalPerSecondCount: 0,
      });
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBeGreaterThan(0);
    });

    it('should deny when user daily limit reached', () => {
      const result = NotificationRateLimitService.check({
        channel: NotificationChannelVO.email(),
        userDailyCount: NOTIFICATION_CHANNEL_LIMIT.EMAIL_PER_DAY,
        globalPerSecondCount: 0,
      });
      expect(result.allowed).toBe(false);
      expect(result.limitType).toBe('user_daily');
    });

    it('should deny when global per-second limit reached', () => {
      const result = NotificationRateLimitService.check({
        channel: NotificationChannelVO.email(),
        userDailyCount: 0,
        globalPerSecondCount: 100_000,
      });
      expect(result.allowed).toBe(false);
      expect(result.limitType).toBe('global_per_second');
    });
  });

  describe('assertAllowed', () => {
    it('should throw when over limit', () => {
      expect(() =>
        NotificationRateLimitService.assertAllowed({
          channel: NotificationChannelVO.email(),
          userDailyCount: NOTIFICATION_CHANNEL_LIMIT.EMAIL_PER_DAY,
          globalPerSecondCount: 0,
        }),
      ).toThrow();
    });

    it('should not throw when under limit', () => {
      expect(() =>
        NotificationRateLimitService.assertAllowed({
          channel: NotificationChannelVO.email(),
          userDailyCount: 5,
          globalPerSecondCount: 0,
        }),
      ).not.toThrow();
    });
  });

  describe('shouldBypassUserLimit', () => {
    it('should bypass for critical', () => {
      expect(NotificationRateLimitService.shouldBypassUserLimit('critical')).toBe(true);
    });

    it('should not bypass for normal', () => {
      expect(NotificationRateLimitService.shouldBypassUserLimit('normal')).toBe(false);
    });
  });
});
