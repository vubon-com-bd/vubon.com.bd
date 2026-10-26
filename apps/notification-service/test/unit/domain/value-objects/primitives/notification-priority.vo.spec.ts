import { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import { InvalidNotificationPriorityError } from '@domain/errors/notification.errors.js';

describe('NotificationPriorityVO', () => {
  it.each(['critical', 'high', 'normal', 'low', 'silent'])('accepts "%s"', (s) => {
    expect(NotificationPriorityVO.create(s).value).toBe(s);
  });

  it('rejects invalid', () => {
    expect(() => NotificationPriorityVO.create('extreme')).toThrow(InvalidNotificationPriorityError);
  });

  it('rejects non-string', () => {
    expect(() => NotificationPriorityVO.create(5 as any)).toThrow(InvalidNotificationPriorityError);
  });

  describe('weight', () => {
    it('critical=5, high=4, normal=3, low=2, silent=1', () => {
      expect(NotificationPriorityVO.critical().weight).toBe(5);
      expect(NotificationPriorityVO.high().weight).toBe(4);
      expect(NotificationPriorityVO.normal().weight).toBe(3);
      expect(NotificationPriorityVO.low().weight).toBe(2);
      expect(NotificationPriorityVO.silent().weight).toBe(1);
    });
  });

  describe('ttlSeconds', () => {
    it('returns configured TTL for each priority', () => {
      expect(NotificationPriorityVO.critical().ttlSeconds).toBeGreaterThan(0);
      expect(NotificationPriorityVO.silent().ttlSeconds).toBeGreaterThan(0);
    });
  });

  describe('isUrgent', () => {
    it('true for critical and high', () => {
      expect(NotificationPriorityVO.critical().isUrgent()).toBe(true);
      expect(NotificationPriorityVO.high().isUrgent()).toBe(true);
    });
    it('false for normal/low/silent', () => {
      expect(NotificationPriorityVO.normal().isUrgent()).toBe(false);
      expect(NotificationPriorityVO.low().isUrgent()).toBe(false);
      expect(NotificationPriorityVO.silent().isUrgent()).toBe(false);
    });
  });

  describe('isSilent', () => {
    it('only silent priority', () => {
      expect(NotificationPriorityVO.silent().isSilent()).toBe(true);
      expect(NotificationPriorityVO.normal().isSilent()).toBe(false);
    });
  });

  describe('isHigherThan', () => {
    it('critical > high', () => {
      expect(NotificationPriorityVO.critical().isHigherThan(NotificationPriorityVO.high())).toBe(true);
    });
    it('normal is not higher than high', () => {
      expect(NotificationPriorityVO.normal().isHigherThan(NotificationPriorityVO.high())).toBe(false);
    });
  });
});
