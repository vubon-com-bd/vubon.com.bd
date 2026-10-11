import { describe, it, expect } from '@jest/globals';
import {
  NotificationNotFoundApplicationError,
  NotificationSendError,
  NotificationAlreadySentError,
  NotificationSuppressedError,
  NotificationRateLimitError,
  NotificationValidationError,
  NotificationChannelDisabledError,
} from '../../../../src/module/application/errors/notification.errors.js';
import {
  TemplateNotFoundApplicationError,
  TemplateSlugConflictError,
  TemplateRenderError,
  TemplateNotUsableError,
  TemplateValidationError,
} from '../../../../src/module/application/errors/template.errors.js';
import {
  ScheduleNotFoundApplicationError,
  ScheduleInPastError,
  ScheduleValidationError,
  BroadcastNotFoundApplicationError,
  BroadcastAlreadyRunningError,
  BroadcastRecipientLimitExceededError,
  DigestNotFoundApplicationError,
  DigestValidationError,
} from '../../../../src/module/application/errors/schedule.errors.js';
import {
  PreferenceNotFoundApplicationError,
  PreferenceValidationError,
  QuietHoursInvalidError,
  DeviceNotFoundApplicationError,
  MaxDevicesReachedError,
  DeviceValidationError,
} from '../../../../src/module/application/errors/preference.errors.js';
import {
  WebhookNotFoundApplicationError,
  WebhookDeliveryFailedError,
  MaxActiveWebhooksReachedError,
  WebhookValidationError,
  DeliveryNotFoundApplicationError,
  DeliveryRetryNotAllowedError,
  AnalyticsQueryError,
} from '../../../../src/module/application/errors/webhook.errors.js';

describe('Notification application errors', () => {
  it('NotificationNotFoundApplicationError', () => {
    const e = new NotificationNotFoundApplicationError('n-1');
    expect(e.message).toMatch(/n-1/);
  });
  it('NotificationSendError', () => {
    const e = new NotificationSendError('unknown channel', { k: 'v' });
    expect(e.message).toMatch(/unknown channel/);
  });
  it('NotificationAlreadySentError', () => {
    const e = new NotificationAlreadySentError('n-1');
    expect(e.message).toMatch(/already/);
  });
  it('NotificationSuppressedError', () => {
    const e = new NotificationSuppressedError('n-1', 'user disabled');
    expect(e.message).toMatch(/disabled/);
  });
  it('NotificationRateLimitError', () => {
    const e = new NotificationRateLimitError('email', 50, 'day');
    expect(e.message).toMatch(/50/);
  });
  it('NotificationValidationError', () => {
    const e = new NotificationValidationError('invalid', 'title');
    expect(e.message).toMatch(/invalid/);
  });
  it('NotificationChannelDisabledError', () => {
    const e = new NotificationChannelDisabledError('email');
    expect(e.message).toMatch(/email/);
  });
});

describe('Template application errors', () => {
  it('TemplateNotFoundApplicationError', () => {
    expect(new TemplateNotFoundApplicationError('t-1').message).toMatch(/t-1/);
  });
  it('TemplateSlugConflictError', () => {
    expect(new TemplateSlugConflictError('slug').message).toMatch(/slug/);
  });
  it('TemplateRenderError', () => {
    expect(new TemplateRenderError('t-1', 'render failed', ['x']).message).toMatch(/render/);
  });
  it('TemplateNotUsableError', () => {
    expect(new TemplateNotUsableError('t-1', 'deprecated').message).toMatch(/deprecated/);
  });
  it('TemplateValidationError', () => {
    expect(new TemplateValidationError('invalid', 'body').message).toMatch(/invalid/);
  });
});

describe('Schedule application errors', () => {
  it('ScheduleNotFoundApplicationError', () => {
    expect(new ScheduleNotFoundApplicationError('s-1').message).toMatch(/s-1/);
  });
  it('ScheduleInPastError', () => {
    expect(new ScheduleInPastError('2020').message).toMatch(/past/);
  });
  it('ScheduleValidationError', () => {
    expect(new ScheduleValidationError('bad', 'type').message).toMatch(/bad/);
  });
  it('BroadcastNotFoundApplicationError', () => {
    expect(new BroadcastNotFoundApplicationError('b-1').message).toMatch(/b-1/);
  });
  it('BroadcastAlreadyRunningError', () => {
    expect(new BroadcastAlreadyRunningError('b-1').message).toMatch(/running/);
  });
  it('BroadcastRecipientLimitExceededError', () => {
    expect(new BroadcastRecipientLimitExceededError(2_000_000, 1_000_000).message).toMatch(/1000000/);
  });
  it('DigestNotFoundApplicationError', () => {
    expect(new DigestNotFoundApplicationError('d-1').message).toMatch(/d-1/);
  });
  it('DigestValidationError', () => {
    expect(new DigestValidationError('bad', 'frequency').message).toMatch(/bad/);
  });
});

describe('Preference application errors', () => {
  it('PreferenceNotFoundApplicationError', () => {
    expect(new PreferenceNotFoundApplicationError('u-1').message).toMatch(/u-1/);
  });
  it('PreferenceValidationError', () => {
    expect(new PreferenceValidationError('bad', 'channel').message).toMatch(/bad/);
  });
  it('QuietHoursInvalidError', () => {
    expect(new QuietHoursInvalidError(22, 8).message).toMatch(/22/);
  });
  it('DeviceNotFoundApplicationError', () => {
    expect(new DeviceNotFoundApplicationError('d-1').message).toMatch(/d-1/);
  });
  it('MaxDevicesReachedError', () => {
    expect(new MaxDevicesReachedError('u-1', 10).message).toMatch(/10/);
  });
  it('DeviceValidationError', () => {
    expect(new DeviceValidationError('bad', 'token').message).toMatch(/bad/);
  });
});

describe('Webhook / delivery / analytics errors', () => {
  it('WebhookNotFoundApplicationError', () => {
    expect(new WebhookNotFoundApplicationError('w-1').message).toMatch(/w-1/);
  });
  it('WebhookDeliveryFailedError', () => {
    expect(new WebhookDeliveryFailedError('w-1', 3, 'timeout').message).toMatch(/timeout/);
  });
  it('MaxActiveWebhooksReachedError', () => {
    expect(new MaxActiveWebhooksReachedError(50).message).toMatch(/50/);
  });
  it('WebhookValidationError', () => {
    expect(new WebhookValidationError('bad', 'url').message).toMatch(/bad/);
  });
  it('DeliveryNotFoundApplicationError', () => {
    expect(new DeliveryNotFoundApplicationError('d-1').message).toMatch(/d-1/);
  });
  it('DeliveryRetryNotAllowedError', () => {
    expect(new DeliveryRetryNotAllowedError('n-1', 'attempts exhausted').message).toMatch(/exhausted/);
  });
  it('AnalyticsQueryError', () => {
    expect(new AnalyticsQueryError('bad range').message).toMatch(/bad range/);
  });
});
