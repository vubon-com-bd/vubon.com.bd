/**
 * NotificationPriorityVO — weight + TTL tests
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationPriorityVO } from '../../../../src/module/domain/value-objects/primitives/notification-priority.vo.js';
import {
  NOTIFICATION_PRIORITY,
  NOTIFICATION_PRIORITY_TTL,
  NOTIFICATION_PRIORITY_WEIGHT,
} from '@vubon/shared-constants/platform/notification';

describe('NotificationPriorityVO', () => {
  describe('create', () => {
    it('should create critical', () => {
      expect(NotificationPriorityVO.create('critical').value).toBe('critical');
    });

    it('should throw on invalid priority', () => {
      expect(() => NotificationPriorityVO.create('urgent')).toThrow();
    });
  });

  describe('weight', () => {
    it('should return correct weight for critical', () => {
      expect(NotificationPriorityVO.critical().weight()).toBe(
        NOTIFICATION_PRIORITY_WEIGHT[NOTIFICATION_PRIORITY.CRITICAL],
      );
    });

    it('should return correct weight for silent', () => {
      expect(NotificationPriorityVO.silent().weight()).toBe(
        NOTIFICATION_PRIORITY_WEIGHT[NOTIFICATION_PRIORITY.SILENT],
      );
    });

    it('should compare priorities', () => {
      expect(NotificationPriorityVO.critical().isHigherThan(NotificationPriorityVO.normal())).toBe(true);
      expect(NotificationPriorityVO.low().isHigherThan(NotificationPriorityVO.high())).toBe(false);
    });
  });

  describe('ttl', () => {
    it('should return TTL for critical', () => {
      expect(NotificationPriorityVO.critical().ttlSeconds()).toBe(
        NOTIFICATION_PRIORITY_TTL[NOTIFICATION_PRIORITY.CRITICAL],
      );
    });
  });

  describe('bypass quiet hours', () => {
    it('should bypass for critical', () => {
      expect(NotificationPriorityVO.critical().bypassesQuietHours()).toBe(true);
    });

    it('should not bypass for normal', () => {
      expect(NotificationPriorityVO.normal().bypassesQuietHours()).toBe(false);
    });

    it('should not bypass for silent', () => {
      expect(NotificationPriorityVO.silent().bypassesQuietHours()).toBe(false);
    });
  });
});
