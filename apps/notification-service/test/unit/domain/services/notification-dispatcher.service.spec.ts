/**
 * NotificationDispatcherService — channel → provider selection
 */
import { describe, it, expect } from '@jest/globals';
import { NotificationDispatcherService } from '../../../../src/module/domain/services/notification-dispatcher.service.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';

describe('NotificationDispatcherService', () => {
  describe('select — email', () => {
    it('should pick SendGrid by default', () => {
      const result = NotificationDispatcherService.select({
        channel: NotificationChannelVO.email(),
        enabled: { email: true },
      });
      expect(result.providerName).toBe('sendgrid');
      expect(result.requiresExternalCall).toBe(true);
    });

    it('should honor preferred provider', () => {
      const result = NotificationDispatcherService.select({
        channel: NotificationChannelVO.email(),
        preferredProvider: 'ses',
        enabled: { email: true },
      });
      expect(result.providerName).toBe('ses');
    });

    it('should throw when email disabled', () => {
      expect(() =>
        NotificationDispatcherService.select({
          channel: NotificationChannelVO.email(),
          enabled: { email: false },
        }),
      ).toThrow();
    });
  });

  describe('select — sms', () => {
    it('should pick SSLWireless for BD phone', () => {
      const result = NotificationDispatcherService.select({
        channel: NotificationChannelVO.sms(),
        phone: { value: '+8801712345678', isBangladeshi: () => true } as never,
        enabled: { sms: true },
      });
      expect(result.providerName).toBe('sslwireless');
      expect(result.reason).toBe('bd_local_phone');
    });

    it('should pick Twilio for international phone', () => {
      const result = NotificationDispatcherService.select({
        channel: NotificationChannelVO.sms(),
        phone: { value: '+14155551234', isBangladeshi: () => false } as never,
        enabled: { sms: true },
      });
      expect(result.providerName).toBe('twilio');
      expect(result.reason).toBe('international_phone');
    });
  });

  describe('select — push', () => {
    it('should pick APNs for iOS platform', () => {
      const result = NotificationDispatcherService.select({
        channel: NotificationChannelVO.push(),
        pushPlatform: { usesApns: () => true } as never,
        enabled: { push: true },
      });
      expect(result.providerName).toBe('apns');
    });

    it('should pick FCM for Android/default', () => {
      const result = NotificationDispatcherService.select({
        channel: NotificationChannelVO.push(),
        pushPlatform: { usesApns: () => false } as never,
        enabled: { push: true },
      });
      expect(result.providerName).toBe('fcm');
    });
  });

  describe('select — in-app', () => {
    it('should not require external call', () => {
      const result = NotificationDispatcherService.select({
        channel: NotificationChannelVO.inApp(),
        enabled: { inApp: true },
      });
      expect(result.providerName).toBeNull();
      expect(result.requiresExternalCall).toBe(false);
    });
  });

  describe('select — webhook', () => {
    it('should require external call when enabled', () => {
      const result = NotificationDispatcherService.select({
        channel: NotificationChannelVO.webhook(),
        enabled: { webhook: true },
      });
      expect(result.requiresExternalCall).toBe(true);
    });

    it('should throw when webhook disabled', () => {
      expect(() =>
        NotificationDispatcherService.select({
          channel: NotificationChannelVO.webhook(),
          enabled: { webhook: false },
        }),
      ).toThrow();
    });
  });
});
