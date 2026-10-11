/**
 * All error classes full coverage
 */
import { describe, it, expect } from '@jest/globals';
import {
  NotificationAlreadySentError,
  InvalidNotificationPriorityError,
  InvalidNotificationCategoryError,
  NotificationCannotBeCancelledError,
  NotificationExpiredError,
} from '../../../../src/module/domain/errors/notification.errors.js';
import {
  TemplateSlugExistsError,
  InvalidTemplateStatusError,
  InvalidTemplateCategoryError,
  TemplateBodyTooLargeError,
  TemplateDeprecatedError,
} from '../../../../src/module/domain/errors/template.errors.js';
import {
  ScheduleTooFarInFutureError,
  InvalidScheduleStatusError,
  InvalidScheduleRecurrenceError,
  ScheduleAlreadyTriggeredError,
  ScheduleCannotBePausedError,
  BroadcastNotFoundError,
  InvalidBroadcastTypeError,
  InvalidBroadcastStatusError,
  InvalidBroadcastTargetError,
  BroadcastRecipientLimitExceededError,
  DigestNotFoundError,
  InvalidDigestFrequencyError,
  InvalidDigestTypeError,
  InvalidDigestStatusError,
} from '../../../../src/module/domain/errors/schedule.errors.js';
import {
  InvalidPreferenceTypeError,
  InvalidPreferenceFrequencyError,
  QuietHoursInvalidError,
  DeviceNotFoundError,
  InvalidDeviceTypeError,
  InvalidDeviceStatusError,
} from '../../../../src/module/domain/errors/preference.errors.js';
import {
  InvalidWebhookMethodError,
  InvalidWebhookStatusError,
  InvalidWebhookEventError,
  WebhookUrlInvalidError,
  MaxActiveWebhooksReachedError,
} from '../../../../src/module/domain/errors/webhook.errors.js';
import {
  InvalidDeliveryStatusError,
  InvalidDeliveryFailureReasonError,
  InvalidReadStatusError,
  InvalidEmailProviderError,
  InvalidSmsProviderError,
  InvalidPushProviderError,
  InvalidPushPlatformError,
  InvalidInAppTypeError,
  ProviderError,
} from '../../../../src/module/domain/errors/delivery.errors.js';

describe('Notification errors extra', () => {
  it('NotificationAlreadySentError', () => {
    expect(new NotificationAlreadySentError('n-1').name).toBe('NotificationAlreadySentError');
  });
  it('InvalidNotificationPriorityError', () => {
    expect(new InvalidNotificationPriorityError('x', ['normal']).message).toMatch(/normal/);
  });
  it('InvalidNotificationCategoryError', () => {
    expect(new InvalidNotificationCategoryError('x', ['order']).message).toMatch(/order/);
  });
  it('NotificationCannotBeCancelledError', () => {
    expect(new NotificationCannotBeCancelledError('n-1', 'sent').message).toMatch(/sent/);
  });
  it('NotificationExpiredError', () => {
    expect(new NotificationExpiredError('n-1', '2020-01-01').message).toMatch(/2020/);
  });
});

describe('Template errors extra', () => {
  it('TemplateSlugExistsError', () => {
    expect(new TemplateSlugExistsError('slug').message).toMatch(/slug/);
  });
  it('InvalidTemplateStatusError', () => {
    expect(new InvalidTemplateStatusError('x', ['active']).message).toMatch(/active/);
  });
  it('InvalidTemplateCategoryError', () => {
    expect(new InvalidTemplateCategoryError('x', ['order']).message).toMatch(/order/);
  });
  it('TemplateBodyTooLargeError', () => {
    expect(new TemplateBodyTooLargeError(1000, 500).message).toMatch(/500/);
  });
  it('TemplateDeprecatedError', () => {
    expect(new TemplateDeprecatedError('t-1').message).toMatch(/t-1/);
  });
});

describe('Schedule errors extra', () => {
  it('ScheduleTooFarInFutureError', () => {
    expect(new ScheduleTooFarInFutureError('2027', 365).message).toMatch(/365/);
  });
  it('InvalidScheduleStatusError', () => {
    expect(new InvalidScheduleStatusError('x', ['active']).message).toMatch(/active/);
  });
  it('InvalidScheduleRecurrenceError', () => {
    expect(new InvalidScheduleRecurrenceError('x', ['daily']).message).toMatch(/daily/);
  });
  it('ScheduleAlreadyTriggeredError', () => {
    expect(new ScheduleAlreadyTriggeredError('s-1').message).toMatch(/triggered/);
  });
  it('ScheduleCannotBePausedError', () => {
    expect(new ScheduleCannotBePausedError('s-1', 'completed').message).toMatch(/completed/);
  });
  it('BroadcastNotFoundError', () => {
    expect(new BroadcastNotFoundError('b-1').message).toMatch(/b-1/);
  });
  it('InvalidBroadcastTypeError', () => {
    expect(new InvalidBroadcastTypeError('x', ['all_users']).message).toMatch(/all_users/);
  });
  it('InvalidBroadcastStatusError', () => {
    expect(new InvalidBroadcastStatusError('x', ['draft']).message).toMatch(/draft/);
  });
  it('InvalidBroadcastTargetError', () => {
    expect(new InvalidBroadcastTargetError('x', ['all']).message).toMatch(/all/);
  });
  it('BroadcastRecipientLimitExceededError', () => {
    expect(new BroadcastRecipientLimitExceededError(2_000_000, 1_000_000).message).toMatch(/1000000/);
  });
  it('DigestNotFoundError', () => {
    expect(new DigestNotFoundError('d-1').message).toMatch(/d-1/);
  });
  it('InvalidDigestFrequencyError', () => {
    expect(new InvalidDigestFrequencyError('x', ['daily']).message).toMatch(/daily/);
  });
  it('InvalidDigestTypeError', () => {
    expect(new InvalidDigestTypeError('x', ['summary']).message).toMatch(/summary/);
  });
  it('InvalidDigestStatusError', () => {
    expect(new InvalidDigestStatusError('x', ['pending']).message).toMatch(/pending/);
  });
});

describe('Preference errors extra', () => {
  it('InvalidPreferenceTypeError', () => {
    expect(new InvalidPreferenceTypeError('x', ['opt_in']).message).toMatch(/opt_in/);
  });
  it('InvalidPreferenceFrequencyError', () => {
    expect(new InvalidPreferenceFrequencyError('x', ['instant']).message).toMatch(/instant/);
  });
  it('QuietHoursInvalidError', () => {
    expect(new QuietHoursInvalidError(22, 8).message).toMatch(/22/);
  });
  it('DeviceNotFoundError', () => {
    expect(new DeviceNotFoundError('d-1').message).toMatch(/d-1/);
  });
  it('InvalidDeviceTypeError', () => {
    expect(new InvalidDeviceTypeError('x', ['android']).message).toMatch(/android/);
  });
  it('InvalidDeviceStatusError', () => {
    expect(new InvalidDeviceStatusError('x', ['active']).message).toMatch(/active/);
  });
});

describe('Webhook errors extra', () => {
  it('InvalidWebhookMethodError', () => {
    expect(new InvalidWebhookMethodError('x', ['POST']).message).toMatch(/POST/);
  });
  it('InvalidWebhookStatusError', () => {
    expect(new InvalidWebhookStatusError('x', ['active']).message).toMatch(/active/);
  });
  it('InvalidWebhookEventError', () => {
    expect(new InvalidWebhookEventError('x', ['order.created']).message).toMatch(/order/);
  });
  it('WebhookUrlInvalidError', () => {
    expect(new WebhookUrlInvalidError('bad').message).toMatch(/bad/);
  });
  it('MaxActiveWebhooksReachedError', () => {
    expect(new MaxActiveWebhooksReachedError(50).message).toMatch(/50/);
  });
});

describe('Delivery errors extra', () => {
  it('InvalidDeliveryStatusError', () => {
    expect(new InvalidDeliveryStatusError('x', ['queued']).message).toMatch(/queued/);
  });
  it('InvalidDeliveryFailureReasonError', () => {
    expect(new InvalidDeliveryFailureReasonError('x', ['timeout']).message).toMatch(/timeout/);
  });
  it('InvalidReadStatusError', () => {
    expect(new InvalidReadStatusError('x', ['unread']).message).toMatch(/unread/);
  });
  it('InvalidEmailProviderError', () => {
    expect(new InvalidEmailProviderError('x', ['smtp']).message).toMatch(/smtp/);
  });
  it('InvalidSmsProviderError', () => {
    expect(new InvalidSmsProviderError('x', ['twilio']).message).toMatch(/twilio/);
  });
  it('InvalidPushProviderError', () => {
    expect(new InvalidPushProviderError('x', ['fcm']).message).toMatch(/fcm/);
  });
  it('InvalidPushPlatformError', () => {
    expect(new InvalidPushPlatformError('x', ['android']).message).toMatch(/android/);
  });
  it('InvalidInAppTypeError', () => {
    expect(new InvalidInAppTypeError('x', ['toast']).message).toMatch(/toast/);
  });
  it('ProviderError', () => {
    expect(new ProviderError('sendgrid', 'err', 'E001').message).toMatch(/E001/);
  });
});
