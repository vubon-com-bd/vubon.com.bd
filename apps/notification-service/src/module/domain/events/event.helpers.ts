/* istanbul ignore file -- pure event declarations */
/**
 * Notification Event Helpers
 * @module notification-service/domain/events
 *
 * DRY utilities for building typed domain events।
 */
import type { Timestamp } from '@vubon/shared-types/common';

// ─── Aggregate Type Constants ─────────────
export const NOTIFICATION_AGGREGATE_TYPE = {
  NOTIFICATION: 'Notification',
  TEMPLATE: 'Template',
  SCHEDULE: 'Schedule',
  BROADCAST: 'Broadcast',
  DIGEST: 'Digest',
  PREFERENCE: 'Preference',
  DEVICE: 'Device',
  WEBHOOK: 'Webhook',
} as const;

// ─── ID Generator (no external deps) ──────
export function newEventId(): string {
  const ts = Date.now().toString(36);
  const rnd = Math.random().toString(36).slice(2, 10);
  return `evt_${ts}_${rnd}`;
}

// ─── Timestamp Helper ─────────────────────
export function nowTimestamp(): Timestamp {
  return new Date().toISOString() as unknown as Timestamp;
}

// ─── ISO Timestamp ────────────────────────
export function nowIso(): string {
  return new Date().toISOString();
}
