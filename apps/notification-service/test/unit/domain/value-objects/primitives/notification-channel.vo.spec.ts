import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { InvalidNotificationChannelError } from '@domain/errors/notification.errors.js';

describe('NotificationChannelVO', () => {
  it.each(['email', 'sms', 'push', 'in_app', 'webhook', 'whatsapp', 'telegram', 'messenger', 'slack', 'voice'])(
    'accepts "%s"',
    (s) => {
      expect(NotificationChannelVO.create(s).value).toBe(s);
    },
  );

  it('normalizes lowercase', () => {
    expect(NotificationChannelVO.create('EMAIL').value).toBe('email');
  });

  it('rejects invalid', () => {
    expect(() => NotificationChannelVO.create('pigeon')).toThrow(InvalidNotificationChannelError);
  });

  it('rejects non-string', () => {
    expect(() => NotificationChannelVO.create(undefined as any)).toThrow(InvalidNotificationChannelError);
  });

  describe('factory', () => {
    it('email/sms/push/inApp/webhook', () => {
      expect(NotificationChannelVO.email().value).toBe('email');
      expect(NotificationChannelVO.sms().value).toBe('sms');
      expect(NotificationChannelVO.push().value).toBe('push');
      expect(NotificationChannelVO.inApp().value).toBe('in_app');
      expect(NotificationChannelVO.webhook().value).toBe('webhook');
    });
  });

  describe('isInstant', () => {
    it('true for push and in_app', () => {
      expect(NotificationChannelVO.push().isInstant()).toBe(true);
      expect(NotificationChannelVO.inApp().isInstant()).toBe(true);
    });
    it('false for email/sms/webhook', () => {
      expect(NotificationChannelVO.email().isInstant()).toBe(false);
      expect(NotificationChannelVO.sms().isInstant()).toBe(false);
      expect(NotificationChannelVO.webhook().isInstant()).toBe(false);
    });
  });

  describe('isExternal', () => {
    it('true for email/sms/webhook', () => {
      expect(NotificationChannelVO.email().isExternal()).toBe(true);
      expect(NotificationChannelVO.sms().isExternal()).toBe(true);
      expect(NotificationChannelVO.webhook().isExternal()).toBe(true);
    });
    it('false for push/in_app', () => {
      expect(NotificationChannelVO.push().isExternal()).toBe(false);
      expect(NotificationChannelVO.inApp().isExternal()).toBe(false);
    });
  });
});
