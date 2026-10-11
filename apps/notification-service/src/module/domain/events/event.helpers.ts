/**
 * Event helpers — ID generation, timestamp, aggregate type constants
 * @module notification-service/domain/events
 */
import { randomUUID } from 'node:crypto';
import type { Timestamp } from '@vubon/shared-types/common';

export function newEventId(): string {
  return randomUUID();
}

/** Current timestamp as epoch milliseconds (branded). */
export function now(): Timestamp {
  return Date.now() as Timestamp;
}

// ═══ Aggregate type identifiers ═══
export const NOTIFICATION_AGGREGATE_TYPE = 'Notification';
export const DELIVERY_AGGREGATE_TYPE = 'NotificationDelivery';
export const TEMPLATE_AGGREGATE_TYPE = 'NotificationTemplate';
export const SCHEDULE_AGGREGATE_TYPE = 'NotificationSchedule';
export const BROADCAST_AGGREGATE_TYPE = 'NotificationBroadcast';
export const DIGEST_AGGREGATE_TYPE = 'NotificationDigest';
export const PREFERENCE_AGGREGATE_TYPE = 'NotificationPreference';
export const DEVICE_AGGREGATE_TYPE = 'NotificationDevice';
export const WEBHOOK_AGGREGATE_TYPE = 'NotificationWebhook';
