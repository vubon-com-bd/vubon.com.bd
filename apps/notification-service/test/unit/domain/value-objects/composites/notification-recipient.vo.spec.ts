import { NotificationRecipientVO } from '@domain/composites/notification-recipient.vo.js';
import { NotificationChannelVO } from '@domain/primitives/notification-channel.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { PhoneNumberVO } from '@domain/primitives/phone-number.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { IDS } from '@domain-fixtures/ids.fixture.js';

const makeEmail = () =>
  NotificationRecipientVO.create({
    userId: UserIdVO.create(IDS.userId),
    channel: NotificationChannelVO.email(),
    email: EmailAddressVO.create('user@example.com'),
  });

describe('NotificationRecipientVO', () => {
  describe('create() — channel validation', () => {
    it('email channel requires email', () => {
      expect(() =>
        NotificationRecipientVO.create({
          userId: UserIdVO.create(IDS.userId),
          channel: NotificationChannelVO.email(),
        }),
      ).toThrow(ValidationError);
    });

    it('sms channel requires phone', () => {
      expect(() =>
        NotificationRecipientVO.create({
          userId: UserIdVO.create(IDS.userId),
          channel: NotificationChannelVO.sms(),
        }),
      ).toThrow(ValidationError);
    });

    it('whatsapp channel requires phone', () => {
      expect(() =>
        NotificationRecipientVO.create({
          userId: UserIdVO.create(IDS.userId),
          channel: NotificationChannelVO.create('whatsapp'),
        }),
      ).toThrow(ValidationError);
    });

    it('push channel requires deviceToken', () => {
      expect(() =>
        NotificationRecipientVO.create({
          userId: UserIdVO.create(IDS.userId),
          channel: NotificationChannelVO.push(),
        }),
      ).toThrow(ValidationError);
    });

    it('webhook channel requires webhookUrl', () => {
      expect(() =>
        NotificationRecipientVO.create({
          userId: UserIdVO.create(IDS.userId),
          channel: NotificationChannelVO.webhook(),
        }),
      ).toThrow(ValidationError);
    });

    it('accepts sms with phone', () => {
      const vo = NotificationRecipientVO.create({
        userId: UserIdVO.create(IDS.userId),
        channel: NotificationChannelVO.sms(),
        phone: PhoneNumberVO.create('+8801712345678'),
      });
      expect(vo.phone).toBeDefined();
    });

    it('accepts push with deviceToken', () => {
      const vo = NotificationRecipientVO.create({
        userId: UserIdVO.create(IDS.userId),
        channel: NotificationChannelVO.push(),
        deviceToken: DeviceTokenVO.create(IDS.deviceToken),
      });
      expect(vo.deviceToken).toBeDefined();
    });

    it('accepts webhook with url', () => {
      const vo = NotificationRecipientVO.create({
        userId: UserIdVO.create(IDS.userId),
        channel: NotificationChannelVO.webhook(),
        webhookUrl: WebhookUrlVO.create('https://example.com/hook'),
      });
      expect(vo.webhookUrl).toBeDefined();
    });

    it('in_app channel has no required destination', () => {
      const vo = NotificationRecipientVO.create({
        userId: UserIdVO.create(IDS.userId),
        channel: NotificationChannelVO.inApp(),
      });
      expect(vo.channel.value).toBe('in_app');
    });
  });

  describe('reconstitute', () => {
    it('skips validation', () => {
      const vo = NotificationRecipientVO.reconstitute({
        userId: UserIdVO.create(IDS.userId),
        channel: NotificationChannelVO.email(),
      });
      expect(vo.channel.value).toBe('email');
    });
  });

  describe('destination / maskedDestination', () => {
    it('email destination', () => {
      expect(makeEmail().destination).toBe('user@example.com');
    });

    it('email maskedDestination', () => {
      const masked = makeEmail().maskedDestination;
      expect(masked).toContain('@');
      expect(masked).toContain('***');
    });

    it('phone destination', () => {
      const vo = NotificationRecipientVO.create({
        userId: UserIdVO.create(IDS.userId),
        channel: NotificationChannelVO.sms(),
        phone: PhoneNumberVO.create('+8801712345678'),
      });
      expect(vo.destination).toBe('+8801712345678');
    });

    it('phone maskedDestination', () => {
      const vo = NotificationRecipientVO.create({
        userId: UserIdVO.create(IDS.userId),
        channel: NotificationChannelVO.sms(),
        phone: PhoneNumberVO.create('+8801712345678'),
      });
      expect(vo.maskedDestination).toContain('5678');
    });

    it('deviceToken destination + masked', () => {
      const vo = NotificationRecipientVO.create({
        userId: UserIdVO.create(IDS.userId),
        channel: NotificationChannelVO.push(),
        deviceToken: DeviceTokenVO.create(IDS.deviceToken),
      });
      expect(vo.destination).toBe(IDS.deviceToken);
      expect(vo.maskedDestination).toContain('...');
    });

    it('webhookUrl destination', () => {
      const vo = NotificationRecipientVO.create({
        userId: UserIdVO.create(IDS.userId),
        channel: NotificationChannelVO.webhook(),
        webhookUrl: WebhookUrlVO.create('https://example.com/hook'),
      });
      expect(vo.destination).toBe('https://example.com/hook');
    });

    it('empty destination when nothing set', () => {
      const vo = NotificationRecipientVO.create({
        userId: UserIdVO.create(IDS.userId),
        channel: NotificationChannelVO.inApp(),
      });
      expect(vo.destination).toBe('');
      expect(vo.maskedDestination).toBe('');
    });
  });

  describe('getters', () => {
    it('exposes userId/channel/email', () => {
      const vo = makeEmail();
      expect(vo.userId.value).toBe(IDS.userId);
      expect(vo.channel.value).toBe('email');
      expect(vo.email?.value).toBe('user@example.com');
    });

    it('returns undefined for unused fields', () => {
      const vo = makeEmail();
      expect(vo.phone).toBeUndefined();
      expect(vo.deviceToken).toBeUndefined();
      expect(vo.webhookUrl).toBeUndefined();
    });
  });
});
