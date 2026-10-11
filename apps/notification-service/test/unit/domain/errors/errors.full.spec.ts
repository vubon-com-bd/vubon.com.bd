/**
 * Every error class + every constructor branch
 */
import { describe, it, expect } from '@jest/globals';
import {
  NotificationNotFoundError,
  NotificationAlreadySentError,
  InvalidNotificationTypeError,
  InvalidNotificationChannelError,
  InvalidNotificationStatusError,
  InvalidNotificationPriorityError,
  InvalidNotificationCategoryError,
  InvalidNotificationStatusTransitionError,
  NotificationCannotBeCancelledError,
  NotificationExpiredError,
} from '../../../../src/module/domain/errors/notification.errors.js';
import {
  TemplateNotFoundError,
  TemplateSlugExistsError,
  InvalidTemplateTypeError,
  InvalidTemplateStatusError,
  InvalidTemplateCategoryError,
  TemplateBodyTooLargeError,
  TemplateVariablesMismatchError,
  TemplateDeprecatedError,
} from '../../../../src/module/domain/errors/template.errors.js';
import {
  ScheduleNotFoundError,
  ScheduleInPastError,
  ScheduleTooFarInFutureError,
  InvalidScheduleTypeError,
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
  PreferenceNotFoundError,
  InvalidPreferenceTypeError,
  InvalidPreferenceFrequencyError,
  QuietHoursInvalidError,
  DeviceNotFoundError,
  InvalidDeviceTypeError,
  InvalidDeviceStatusError,
  MaxDevicesReachedError,
} from '../../../../src/module/domain/errors/preference.errors.js';
import {
  WebhookNotFoundError,
  InvalidWebhookMethodError,
  InvalidWebhookStatusError,
  InvalidWebhookEventError,
  WebhookUrlInvalidError,
  WebhookDeliveryFailedError,
  MaxActiveWebhooksReachedError,
} from '../../../../src/module/domain/errors/webhook.errors.js';
import {
  InvalidDeliveryStatusError,
  InvalidDeliveryFailureReasonError,
  InvalidReadStatusError,
  DeliveryFailedError,
  RetryExhaustedError,
  InvalidEmailProviderError,
  InvalidSmsProviderError,
  InvalidPushProviderError,
  InvalidPushPlatformError,
  InvalidInAppTypeError,
  ProviderError,
} from '../../../../src/module/domain/errors/delivery.errors.js';

describe('Notification errors', () => {
  it('NotificationNotFoundError', () => {
    const e = new NotificationNotFoundError('n-1');
    expect(e.name).toBe('NotificationNotFoundError');
    expect(e.message).toContain('n-1');
  });
  it('NotificationAlreadySentError', () => {
    const e = new NotificationAlreadySentError('n-1');
    expect(e.message).toMatch(/already/i);
  });
  it('InvalidNotificationTypeError', () => {
    const e = new InvalidNotificationTypeError('bad', ['transactional']);
    expect(e.message).toMatch(/bad/);
    expect(e.message).toMatch(/transactional/);
  });
  it('InvalidNotificationChannelError', () => {
    expect(new InvalidNotificationChannelError('x', ['email']).message).toMatch(/email/);
  });
  it('InvalidNotificationStatusError', () => {
    expect(new InvalidNotificationStatusError('x', ['pending']).message).toMatch(/pending/);
  });
  it('InvalidNotificationPriorityError', () => {
    expect(new InvalidNotificationPriorityError('x', ['normal']).message).toMatch(/normal/);
  });
  it('InvalidNotificationCategoryError', () => {
    expect(new InvalidNotificationCategoryError('x', ['order']).message).toMatch(/order/);
  });
  it('InvalidNotificationStatusTransitionError', () => {
    expect(
      new InvalidNotificationStatusTransitionError('pending', 'sent', 'n-1').message,
    ).toMatch(/pending/);
  });
  it('NotificationCannotBeCancelledError', () => {
    expect(new NotificationCannotBeCancelledError('n-1', 'sent').message).toMatch(/sent/);
  });
  it('NotificationExpiredError', () => {
    expect(new NotificationExpiredError('n-1', '2020-01-01').message).toMatch(/2020/);
  });
});

describe('Template errors', () => {
  it('TemplateNotFoundError', () => {
    expect(new TemplateNotFoundError('t-1').message).toContain('t-1');
  });
  it('TemplateSlugExistsError', () => {
    expect(new TemplateSlugExistsError('slug-1').message).toMatch(/slug-1/);
  });
  it('InvalidTemplateTypeError', () => {
    expect(new InvalidTemplateTypeError('x', ['email']).message).toMatch(/email/);
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
  it('TemplateVariablesMismatchError', () => {
    expect(
      new TemplateVariablesMismatchError('t-1', ['x', 'y']).message,
    ).toMatch(/x, y/);
  });
  it('TemplateDeprecatedError', () => {
    expect(new TemplateDeprecatedError('t-1').message).toMatch(/t-1/);
  });
});

describe('Schedule errors', () => {
  it('ScheduleNotFoundError', () => {
    expect(new ScheduleNotFoundError('s-1').message).toContain('s-1');
  });
  it('ScheduleInPastError', () => {
    expect(new ScheduleInPastError('2020').message).toMatch(/past/);
  });
  it('ScheduleTooFarInFutureError', () => {
    expect(new ScheduleTooFarInFutureError('2100', 365).message).toMatch(/365/);
  });
  it('InvalidScheduleTypeError', () => {
    expect(new InvalidScheduleTypeError('x', ['immediate']).message).toMatch(/immediate/);
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
    expect(new BroadcastNotFoundError('b-1').message).toContain('b-1');
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
    expect(new BroadcastRecipientLimitExceededError(1000, 100).message).toMatch(/100/);
  });
  it('DigestNotFoundError', () => {
    expect(new DigestNotFoundError('d-1').message).toContain('d-1');
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

describe('Preference errors', () => {
  it('PreferenceNotFoundError', () => {
    expect(new PreferenceNotFoundError('u-1').message).toContain('u-1');
  });
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
    expect(new DeviceNotFoundError('d-1').message).toContain('d-1');
  });
  it('InvalidDeviceTypeError', () => {
    expect(new InvalidDeviceTypeError('x', ['android']).message).toMatch(/android/);
  });
  it('InvalidDeviceStatusError', () => {
    expect(new InvalidDeviceStatusError('x', ['active']).message).toMatch(/active/);
  });
  it('MaxDevicesReachedError', () => {
    expect(new MaxDevicesReachedError('u-1', 10).message).toMatch(/10/);
  });
});

describe('Webhook errors', () => {
  it('WebhookNotFoundError', () => {
    expect(new WebhookNotFoundError('w-1').message).toContain('w-1');
  });
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
    expect(new WebhookUrlInvalidError('bad-url').message).toMatch(/bad-url/);
  });
  it('WebhookDeliveryFailedError', () => {
    expect(new WebhookDeliveryFailedError('w-1', 3, 'timeout').message).toMatch(/timeout/);
  });
  it('MaxActiveWebhooksReachedError', () => {
    expect(new MaxActiveWebhooksReachedError(50).message).toMatch(/50/);
  });
});

describe('Delivery errors', () => {
  it('InvalidDeliveryStatusError', () => {
    expect(new InvalidDeliveryStatusError('x', ['queued']).message).toMatch(/queued/);
  });
  it('InvalidDeliveryFailureReasonError', () => {
    expect(
      new InvalidDeliveryFailureReasonError('x', ['timeout']).message,
    ).toMatch(/timeout/);
  });
  it('InvalidReadStatusError', () => {
    expect(new InvalidReadStatusError('x', ['unread']).message).toMatch(/unread/);
  });
  it('DeliveryFailedError', () => {
    expect(new DeliveryFailedError('network').message).toMatch(/network/);
  });
  it('RetryExhaustedError', () => {
    expect(new RetryExhaustedError(3).message).toMatch(/3/);
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
    expect(new ProviderError('sendgrid', 'server error', 'E001').message).toMatch(/E001/);
  });
});
