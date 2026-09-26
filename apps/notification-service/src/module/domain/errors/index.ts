// ═══════════════════════════════════════════════════════
// Domain Errors — Barrel Export
// ═══════════════════════════════════════════════════════

export {
  NotificationNotFoundError,
  InvalidChannelError,
} from './notification.errors';

export {
  TemplateNotFoundError,
  TemplateRenderError,
  MissingVariableError,
} from './template.errors';

export {
  ScheduleNotFoundError,
  ScheduleConflictError,
} from './schedule.errors';

export {
  BroadcastNotFoundError,
  BroadcastLimitExceededError,
} from './broadcast.errors';

export {
  DigestNotFoundError,
  DigestEmptyError,
} from './digest.errors';

export {
  PreferenceNotFoundError,
  UserOptedOutError,
} from './preference.errors';

export {
  DeviceNotFoundError,
  InvalidDeviceTokenError,
} from './device.errors';

export {
  WebhookNotFoundError,
  WebhookSignatureError,
} from './webhook.errors';

export {
  DeliveryFailedError,
  RetryExhaustedError,
} from './delivery.errors';

export {
  RateLimitExceededError,
  QuietHoursError,
} from './rate-limit.errors';

export {
  ProviderNotFoundError,
  ProviderTimeoutError,
  ProviderUnavailableError,
} from './provider.errors';
