import {
  NotificationNotFoundError,
  NotificationAlreadySentError,
  InvalidNotificationStatusError,
  NotificationCannotBeSentError,
  NotificationExpiredError,
} from '@domain/errors/notification.errors.js';
import { TemplateNotFoundError, TemplateMissingVariablesError } from '@domain/errors/template.errors.js';
import { ScheduleNotFoundError, ScheduleInPastError } from '@domain/errors/schedule.errors.js';
import { BroadcastNotFoundError, BroadcastRequiresApprovalError } from '@domain/errors/broadcast.errors.js';
import { DigestNotFoundError, DigestEmptyError } from '@domain/errors/digest.errors.js';
import { PreferenceNotFoundError, PreferencesImmutableError } from '@domain/errors/preference.errors.js';
import { DeviceNotFoundError, DeviceLimitExceededError } from '@domain/errors/device.errors.js';
import { WebhookNotFoundError, WebhookInactiveError } from '@domain/errors/webhook.errors.js';
import { DeliveryNotFoundError, DeliveryMaxRetriesExceededError } from '@domain/errors/delivery.errors.js';
import { RateLimitExceededError } from '@domain/errors/rate-limit.errors.js';
import { ProviderUnavailableError } from '@domain/errors/provider.errors.js';
import { IDS } from '@domain-fixtures/ids.fixture.js';

describe('Notification errors', () => {
  it('NotificationNotFoundError', () => {
    const e = new NotificationNotFoundError(IDS.notificationId);
    expect(e.name).toBe('NotificationNotFoundError');
    expect(e.message).toContain(IDS.notificationId);
  });

  it('NotificationAlreadySentError', () => {
    const e = new NotificationAlreadySentError(IDS.notificationId);
    expect(e.name).toBe('NotificationAlreadySentError');
  });

  it('InvalidNotificationStatusError', () => {
    const e = new InvalidNotificationStatusError('bogus', ['draft', 'pending']);
    expect(e.message).toContain('bogus');
  });

  it('NotificationCannotBeSentError', () => {
    const e = new NotificationCannotBeSentError(IDS.notificationId, 'terminal');
    expect(e.name).toBe('NotificationCannotBeSentError');
  });

  it('NotificationExpiredError', () => {
    const e = new NotificationExpiredError(IDS.notificationId, '2025-01-01');
    expect(e.name).toBe('NotificationExpiredError');
  });
});

describe('Template errors', () => {
  it('TemplateNotFoundError', () => {
    const e = new TemplateNotFoundError(IDS.templateId);
    expect(e.name).toBe('TemplateNotFoundError');
  });

  it('TemplateMissingVariablesError', () => {
    const e = new TemplateMissingVariablesError(IDS.templateId, ['a', 'b']);
    expect(e.message).toContain('a, b');
  });
});

describe('Schedule errors', () => {
  it('ScheduleNotFoundError', () => {
    const e = new ScheduleNotFoundError(IDS.scheduleId);
    expect(e.name).toBe('ScheduleNotFoundError');
  });

  it('ScheduleInPastError', () => {
    const e = new ScheduleInPastError('2020-01-01');
    expect(e.name).toBe('ScheduleInPastError');
  });
});

describe('Broadcast errors', () => {
  it('BroadcastNotFoundError', () => {
    expect(new BroadcastNotFoundError(IDS.broadcastId).name).toBe('BroadcastNotFoundError');
  });

  it('BroadcastRequiresApprovalError', () => {
    expect(new BroadcastRequiresApprovalError(IDS.broadcastId).name).toBe('BroadcastRequiresApprovalError');
  });
});

describe('Digest errors', () => {
  it('DigestNotFoundError', () => {
    expect(new DigestNotFoundError(IDS.digestId).name).toBe('DigestNotFoundError');
  });

  it('DigestEmptyError', () => {
    expect(new DigestEmptyError(IDS.digestId).name).toBe('DigestEmptyError');
  });
});

describe('Preference errors', () => {
  it('PreferenceNotFoundError', () => {
    expect(new PreferenceNotFoundError(IDS.userId).name).toBe('PreferenceNotFoundError');
  });

  it('PreferencesImmutableError', () => {
    expect(new PreferencesImmutableError(IDS.userId).name).toBe('PreferencesImmutableError');
  });
});

describe('Device errors', () => {
  it('DeviceNotFoundError', () => {
    expect(new DeviceNotFoundError(IDS.deviceId).name).toBe('DeviceNotFoundError');
  });

  it('DeviceLimitExceededError', () => {
    expect(new DeviceLimitExceededError(IDS.userId, 10).name).toBe('DeviceLimitExceededError');
  });
});

describe('Webhook errors', () => {
  it('WebhookNotFoundError', () => {
    expect(new WebhookNotFoundError(IDS.webhookId).name).toBe('WebhookNotFoundError');
  });

  it('WebhookInactiveError', () => {
    expect(new WebhookInactiveError(IDS.webhookId).name).toBe('WebhookInactiveError');
  });
});

describe('Delivery errors', () => {
  it('DeliveryNotFoundError', () => {
    expect(new DeliveryNotFoundError('d-1').name).toBe('DeliveryNotFoundError');
  });

  it('DeliveryMaxRetriesExceededError', () => {
    expect(new DeliveryMaxRetriesExceededError('d-1', 5).name).toBe('DeliveryMaxRetriesExceededError');
  });
});

describe('Rate limit + Provider errors', () => {
  it('RateLimitExceededError', () => {
    expect(new RateLimitExceededError('user-1', 100, '1h').name).toBe('RateLimitExceededError');
  });

  it('ProviderUnavailableError', () => {
    expect(new ProviderUnavailableError('sendgrid', 'timeout').name).toBe('ProviderUnavailableError');
  });
});

describe('Error inheritance', () => {
  it('extends DomainError with code + httpStatus + toJSON', () => {
    const e = new NotificationNotFoundError(IDS.notificationId);
    expect(e.code).toBeDefined();
    expect(e.httpStatus).toBe(404);
    const json = e.toJSON();
    expect(json.name).toBe('NotificationNotFoundError');
    expect(json.code).toBeDefined();
  });

  it('error has prototype chain', () => {
    const e = new NotificationNotFoundError(IDS.notificationId);
    expect(e instanceof Error).toBe(true);
  });
});
