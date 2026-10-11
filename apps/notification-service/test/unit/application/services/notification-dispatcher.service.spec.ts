import { describe, it, expect } from '@jest/globals';
import { NotificationDispatcherService } from '../../../../src/module/domain/services/notification-dispatcher.service.js';
import { NotificationChannelVO } from '../../../../src/module/domain/value-objects/primitives/notification-channel.vo.js';

describe('NotificationDispatcherService', () => {
  it('email default provider', () => {
    const r = NotificationDispatcherService.select({ channel: NotificationChannelVO.email() });
    expect(r.providerName).toBe('sendgrid');
  });

  it('email preferred ses', () => {
    const r = NotificationDispatcherService.select({
      channel: NotificationChannelVO.email(), preferredProvider: 'ses',
    });
    expect(r.providerName).toBe('ses');
  });

  it('email disabled throws', () => {
    expect(() => NotificationDispatcherService.select({
      channel: NotificationChannelVO.email(), enabled: { email: false },
    })).toThrow();
  });

  it('sms BD phone', () => {
    const r = NotificationDispatcherService.select({
      channel: NotificationChannelVO.sms(),
      phone: { value: '+8801712345678', isBangladeshi: () => true } as never,
    });
    expect(r.providerName).toBe('sslwireless');
  });

  it('sms intl phone', () => {
    const r = NotificationDispatcherService.select({
      channel: NotificationChannelVO.sms(),
      phone: { value: '+14155551234', isBangladeshi: () => false } as never,
    });
    expect(r.providerName).toBe('twilio');
  });

  it('sms preferred provider', () => {
    const r = NotificationDispatcherService.select({
      channel: NotificationChannelVO.sms(), preferredProvider: 'vonage',
    });
    expect(r.providerName).toBe('vonage');
  });

  it('sms disabled throws', () => {
    expect(() => NotificationDispatcherService.select({
      channel: NotificationChannelVO.sms(), enabled: { sms: false },
    })).toThrow();
  });

  it('push APNs iOS', () => {
    const r = NotificationDispatcherService.select({
      channel: NotificationChannelVO.push(),
      pushPlatform: { usesApns: () => true } as never,
    });
    expect(r.providerName).toBe('apns');
  });

  it('push FCM default', () => {
    const r = NotificationDispatcherService.select({
      channel: NotificationChannelVO.push(),
      pushPlatform: { usesApns: () => false } as never,
    });
    expect(r.providerName).toBe('fcm');
  });

  it('push preferred', () => {
    const r = NotificationDispatcherService.select({
      channel: NotificationChannelVO.push(), preferredProvider: 'onesignal',
    });
    expect(r.providerName).toBe('onesignal');
  });

  it('push disabled throws', () => {
    expect(() => NotificationDispatcherService.select({
      channel: NotificationChannelVO.push(), enabled: { push: false },
    })).toThrow();
  });

  it('in-app internal', () => {
    const r = NotificationDispatcherService.select({ channel: NotificationChannelVO.inApp() });
    expect(r.providerName).toBeNull();
  });

  it('in-app disabled throws', () => {
    expect(() => NotificationDispatcherService.select({
      channel: NotificationChannelVO.inApp(), enabled: { inApp: false },
    })).toThrow();
  });

  it('webhook requires external', () => {
    const r = NotificationDispatcherService.select({
      channel: NotificationChannelVO.webhook(), enabled: { webhook: true },
    });
    expect(r.requiresExternalCall).toBe(true);
  });

  it('webhook disabled throws', () => {
    expect(() => NotificationDispatcherService.select({
      channel: NotificationChannelVO.webhook(), enabled: { webhook: false },
    })).toThrow();
  });

  it('whatsapp via twilio', () => {
    const r = NotificationDispatcherService.select({
      channel: NotificationChannelVO.whatsapp(), enabled: { sms: true },
    });
    expect(r.providerName).toBe('twilio');
  });

  it('whatsapp disabled throws', () => {
    expect(() => NotificationDispatcherService.select({
      channel: NotificationChannelVO.whatsapp(), enabled: { sms: false },
    })).toThrow();
  });
});
