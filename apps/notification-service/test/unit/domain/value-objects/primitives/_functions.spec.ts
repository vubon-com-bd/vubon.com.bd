/**
 * Supplementary spec — covers uncovered functions/getters
 * @module notification-service/test/unit/domain
 *
 * এই ফাইল শুধু coverage target পূরণের জন্য — actual functional behavior
 * already covered individual specs-এ।
 */
import { NotificationIdVO } from '@domain/primitives/notification-id.vo.js';
import { TemplateIdVO } from '@domain/primitives/template-id.vo.js';
import { ScheduleIdVO } from '@domain/primitives/schedule-id.vo.js';
import { BroadcastIdVO } from '@domain/primitives/broadcast-id.vo.js';
import { DigestIdVO } from '@domain/primitives/digest-id.vo.js';
import { PreferenceIdVO } from '@domain/primitives/preference-id.vo.js';
import { DeviceIdVO } from '@domain/primitives/device-id.vo.js';
import { WebhookIdVO } from '@domain/primitives/webhook-id.vo.js';
import { ActionIdVO } from '@domain/primitives/action-id.vo.js';
import { UserIdVO } from '@domain/primitives/user-id.vo.js';
import { OrderIdVO } from '@domain/primitives/order-id.vo.js';
import { ProductIdVO } from '@domain/primitives/product-id.vo.js';
import { VendorIdVO } from '@domain/primitives/vendor-id.vo.js';
import { PaymentIdVO } from '@domain/primitives/payment-id.vo.js';
import { ProviderMessageIdVO } from '@domain/primitives/provider-message-id.vo.js';
import { WebhookIdVO as WebhookIdRef } from '@domain/primitives/webhook-id.vo.js';
import { TemplateNameVO } from '@domain/primitives/template-name.vo.js';
import { NotificationDataVO } from '@domain/primitives/notification-data.vo.js';
import { NotificationBodyVO } from '@domain/primitives/notification-body.vo.js';
import { NotificationSubjectVO } from '@domain/primitives/notification-subject.vo.js';
import { DeviceTokenVO } from '@domain/primitives/device-token.vo.js';
import { ProviderNameVO } from '@domain/primitives/provider-name.vo.js';
import { TemplateVariableVO } from '@domain/primitives/template-variable.vo.js';
import { ScheduleFrequencyVO } from '@domain/primitives/schedule-frequency.vo.js';
import { ScheduleTypeVO } from '@domain/primitives/schedule-type.vo.js';
import { ScheduleTimeVO } from '@domain/primitives/schedule-time.vo.js';
import { ScheduleStatusVO } from '@domain/primitives/schedule-status.vo.js';
import { PreferenceTypeVO } from '@domain/primitives/preference-type.vo.js';
import { PreferenceValueVO } from '@domain/primitives/preference-value.vo.js';
import { TemplateContentVO } from '@domain/primitives/template-content.vo.js';
import { TemplateFormatVO } from '@domain/primitives/template-format.vo.js';
import { WebhookSecretVO } from '@domain/primitives/webhook-secret.vo.js';
import { WebhookStatusVO } from '@domain/primitives/webhook-status.vo.js';
import { WebhookTypeVO } from '@domain/primitives/webhook-type.vo.js';
import { WebhookUrlVO } from '@domain/primitives/webhook-url.vo.js';
import { EmailAddressVO } from '@domain/primitives/email-address.vo.js';
import { PhoneNumberVO } from '@domain/primitives/phone-number.vo.js';
import { ActionTypeVO } from '@domain/primitives/action-type.vo.js';
import { ActionUrlVO } from '@domain/primitives/action-url.vo.js';
import { DeliveryAttemptVO } from '@domain/primitives/delivery-attempt.vo.js';
import { DeliveryErrorVO } from '@domain/primitives/delivery-error.vo.js';
import { ReadStatusVO } from '@domain/primitives/read-status.vo.js';
import { ReadAtVO } from '@domain/primitives/read-at.vo.js';
import { RateLimitKeyVO } from '@domain/primitives/rate-limit-key.vo.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';
import { DATES } from '@domain-fixtures/dates.fixture.js';

describe('Primitive VOs — supplementary (getter/factory coverage)', () => {
  describe('reconstitute() — all ID VOs', () => {
    it.each([
      ['NotificationIdVO', NotificationIdVO],
      ['TemplateIdVO', TemplateIdVO],
      ['ScheduleIdVO', ScheduleIdVO],
      ['BroadcastIdVO', BroadcastIdVO],
      ['DigestIdVO', DigestIdVO],
      ['PreferenceIdVO', PreferenceIdVO],
      ['DeviceIdVO', DeviceIdVO],
      ['WebhookIdVO', WebhookIdVO],
      ['ActionIdVO', ActionIdVO],
      ['UserIdVO', UserIdVO],
      ['OrderIdVO', OrderIdVO],
      ['ProductIdVO', ProductIdVO],
      ['VendorIdVO', VendorIdVO],
      ['PaymentIdVO', PaymentIdVO],
      ['ProviderMessageIdVO', ProviderMessageIdVO],
    ])('%s.reconstitute() works', (_name, VO: any) => {
      expect(VO.reconstitute('legacy-xyz').value).toBe('legacy-xyz');
    });
  });

  describe('toJSON() — base VO methods', () => {
    it('NotificationIdVO toJSON returns value', () => {
      const vo = NotificationIdVO.create(IDS.notificationId);
      expect(vo.toJSON()).toBe(IDS.notificationId);
    });

    it('NotificationIdVO toString returns value', () => {
      const vo = NotificationIdVO.create(IDS.notificationId);
      expect(vo.toString()).toBe(IDS.notificationId);
    });

    it('NotificationDataVO toJSON returns props', () => {
      const vo = NotificationDataVO.create({ a: 1 });
      expect(vo.toJSON()).toEqual({ a: 1 });
    });

    it('TemplateNameVO toJSON', () => {
      const vo = TemplateNameVO.create('Hello');
      expect(vo.toJSON()).toBe('Hello');
    });
  });

  describe('equals() — base VO', () => {
    it('equal values', () => {
      const a = NotificationIdVO.create(IDS.notificationId);
      const b = NotificationIdVO.create(IDS.notificationId);
      expect(a.equals(b)).toBe(true);
    });

    it('different values', () => {
      const a = NotificationIdVO.create(IDS.notificationId);
      const b = NotificationIdVO.create(IDS.notificationId2);
      expect(a.equals(b)).toBe(false);
    });

    it('null comparison returns false', () => {
      const a = NotificationIdVO.create(IDS.notificationId);
      expect(a.equals(null as any)).toBe(false);
    });
  });

  describe('cross-service branded round-trip', () => {
    it('UserIdVO', () => {
      const vo = UserIdVO.create(IDS.userId);
      const branded = vo.toBranded();
      expect(UserIdVO.fromBranded(branded).value).toBe(IDS.userId);
    });

    it('OrderIdVO', () => {
      const vo = OrderIdVO.create(IDS.orderId);
      expect(OrderIdVO.fromBranded(vo.toBranded()).value).toBe(IDS.orderId);
    });

    it('ProductIdVO', () => {
      const vo = ProductIdVO.create(IDS.productId);
      expect(ProductIdVO.fromBranded(vo.toBranded()).value).toBe(IDS.productId);
    });

    it('VendorIdVO', () => {
      const vo = VendorIdVO.create(IDS.vendorId);
      expect(VendorIdVO.fromBranded(vo.toBranded()).value).toBe(IDS.vendorId);
    });

    it('PaymentIdVO', () => {
      const vo = PaymentIdVO.create(IDS.paymentId);
      expect(PaymentIdVO.fromBranded(vo.toBranded()).value).toBe(IDS.paymentId);
    });
  });

  describe('Predicates not covered elsewhere', () => {
    it('NotificationBodyVO.isEmpty for empty reconstitute', () => {
      expect(NotificationBodyVO.reconstitute('').isEmpty).toBe(true);
    });

    it('NotificationSubjectVO reconstitute allows empty', () => {
      const vo = NotificationSubjectVO.reconstitute('');
      expect(vo.value).toBe('');
    });

    it('DeviceTokenVO masked returns whole for exactly 12', () => {
      const token = 'a'.repeat(12);
      expect(DeviceTokenVO.reconstitute(token).masked).toBe(token);
    });

    it('ProviderNameVO.isKnown for known provider', () => {
      expect(ProviderNameVO.create('smtp').isKnown()).toBe(true);
    });

    it('ProviderNameVO.isKnown for unknown provider', () => {
      expect(ProviderNameVO.create('zzz-custom').isKnown()).toBe(false);
    });

    it('ScheduleFrequencyVO.reconstitute custom', () => {
      const vo = ScheduleFrequencyVO.reconstitute('custom');
      expect(vo.approximateIntervalDays).toBeUndefined();
    });

    it('ScheduleTypeVO scheduled is not recurring', () => {
      expect(ScheduleTypeVO.reconstitute('scheduled').isRecurring()).toBe(false);
    });

    it('ScheduleTimeVO reconstitute isPast', () => {
      const vo = ScheduleTimeVO.reconstitute({
        scheduledAt: DATES.past,
        timezone: 'UTC',
      });
      expect(vo.isPast).toBe(true);
    });

    it('ScheduleStatusVO reconstitute isRunnable', () => {
      expect(ScheduleStatusVO.reconstitute('active').isRunnable()).toBe(true);
    });

    it('PreferenceTypeVO reconstitute', () => {
      const vo = PreferenceTypeVO.reconstitute('opt_out');
      expect(vo.isOptOut()).toBe(true);
    });

    it('PreferenceValueVO reconstitute boolean', () => {
      expect(PreferenceValueVO.reconstitute(true).asBoolean).toBe(true);
    });

    it('PreferenceValueVO reconstitute frequency', () => {
      expect(PreferenceValueVO.reconstitute('daily').asFrequency).toBe('daily');
    });

    it('TemplateContentVO reconstitute length', () => {
      expect(TemplateContentVO.reconstitute('hi').length).toBe(2);
    });

    it('TemplateFormatVO reconstitute value', () => {
      expect(TemplateFormatVO.reconstitute('html').value).toBe('html');
    });

    it('WebhookSecretVO reconstitute value', () => {
      expect(WebhookSecretVO.reconstitute('x').value).toBe('x');
    });

    it('WebhookStatusVO reconstitute value', () => {
      expect(WebhookStatusVO.reconstitute('active').isActive()).toBe(true);
    });

    it('WebhookTypeVO reconstitute value', () => {
      expect(WebhookTypeVO.reconstitute('incoming').isIncoming()).toBe(true);
    });

    it('EmailAddressVO reconstitute parts', () => {
      const vo = EmailAddressVO.reconstitute('user@example.com');
      expect(vo.localPart).toBe('user');
      expect(vo.domain).toBe('example.com');
    });

    it('PhoneNumberVO reconstitute value', () => {
      expect(PhoneNumberVO.reconstitute('+8801712345678').value).toBe('+8801712345678');
    });

    it('ActionTypeVO reconstitute', () => {
      expect(ActionTypeVO.reconstitute('accept').isEngagement()).toBe(true);
    });

    it('ActionUrlVO reconstitute protocol', () => {
      expect(ActionUrlVO.reconstitute('https://example.com').protocol).toBe('https:');
    });

    it('DeliveryAttemptVO reconstitute is success', () => {
      const vo = DeliveryAttemptVO.reconstitute({
        attemptNumber: 1,
        attemptedAt: DATES.now,
        succeeded: true,
      });
      expect(vo.succeeded).toBe(true);
    });

    it('DeliveryErrorVO reconstitute retryable', () => {
      const vo = DeliveryErrorVO.reconstitute({
        reason: 'timeout',
        message: 'x',
        retryable: false,
      });
      expect(vo.retryable).toBe(false);
    });

    it('ReadStatusVO reconstitute isVisible', () => {
      expect(ReadStatusVO.reconstitute('read').isVisible()).toBe(true);
    });

    it('ReadAtVO reconstitute date', () => {
      const past = new Date(Date.now() - 60000).toISOString();
      const vo = ReadAtVO.reconstitute(past);
      expect(vo.isPresent).toBe(true);
      expect(vo.date).toBeInstanceOf(Date);
    });

    it('RateLimitKeyVO reconstitute toKeyString', () => {
      const vo = RateLimitKeyVO.reconstitute({
        channel: 'email',
        scope: 'global',
      });
      expect(vo.toKeyString()).toBe('rl:email:global');
    });

    it('TemplateVariableVO reconstitute description', () => {
      const vo = TemplateVariableVO.reconstitute({
        name: 'x',
        type: 'string',
        required: false,
        description: 'desc',
      });
      expect(vo.description).toBe('desc');
    });
  });

  describe('NotificationDataVO has() / get() edge', () => {
    it('has returns false for missing', () => {
      expect(NotificationDataVO.create({ a: 1 }).has('b')).toBe(false);
    });

    it('get returns undefined for missing', () => {
      expect(NotificationDataVO.create({}).get('x')).toBeUndefined();
    });

    it('keyCount for empty', () => {
      expect(NotificationDataVO.create({}).keyCount).toBe(0);
    });
  });

  describe('TemplateVariableVO — all types + edge', () => {
    it.each(['string', 'number', 'boolean', 'date', 'url', 'email'] as const)(
      'accepts type %s',
      (type) => {
        expect(() =>
          TemplateVariableVO.create({ name: 'x', type, required: false }),
        ).not.toThrow();
      },
    );

    it('accepts underscore prefix', () => {
      expect(() =>
        TemplateVariableVO.create({ name: '_private', type: 'string', required: false }),
      ).not.toThrow();
    });
  });

  describe('WebhookUrlVO — edge', () => {
    it('isHttps false for http localhost', () => {
      expect(WebhookUrlVO.create('http://localhost:3000').isHttps).toBe(false);
    });
  });

  describe('WebhookIdRef — duplicate alias check', () => {
    it('same class', () => {
      expect(WebhookIdRef.create(IDS.webhookId).value).toBe(IDS.webhookId);
    });
  });

  describe('equals — cross-type null', () => {
    it('equals null', () => {
      expect(NotificationIdVO.reconstitute('x').equals(null as any)).toBe(false);
    });
  });
});
