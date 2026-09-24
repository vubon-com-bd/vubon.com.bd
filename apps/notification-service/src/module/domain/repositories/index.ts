// ═══════════════════════════════════════════════════════
// Domain Repositories — Barrel Export
// ═══════════════════════════════════════════════════════

export type { NotificationRepository } from './notification.repository.interface';
export type { NotificationContentRepository } from './notification-content.repository.interface';
export type { NotificationRecipientRepository } from './notification-recipient.repository.interface';
export type { NotificationActionRepository } from './notification-action.repository.interface';
export type { NotificationDeliveryRepository } from './notification-delivery.repository.interface';
export type { NotificationAttemptRepository } from './notification-attempt.repository.interface';
export type { TemplateRepository } from './template.repository.interface';
export type { TemplateVariableRepository } from './template-variable.repository.interface';
export type { ScheduleRepository } from './schedule.repository.interface';
export type { BroadcastRepository } from './broadcast.repository.interface';
export type { BroadcastResultRepository } from './broadcast-result.repository.interface';
export type { DigestRepository } from './digest.repository.interface';
export type { DigestItemRepository } from './digest-item.repository.interface';
export type { PreferenceRepository } from './preference.repository.interface';
export type { PreferenceMatrixRepository } from './preference-matrix.repository.interface';
export type { DeviceRepository } from './device.repository.interface';
export type { DeviceTokenRepository } from './device-token.repository.interface';
export type { WebhookRepository } from './webhook.repository.interface';
