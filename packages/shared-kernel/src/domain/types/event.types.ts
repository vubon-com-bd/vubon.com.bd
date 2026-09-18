/**
 * Event Types
 * @module shared-kernel/domain/types
 *
 * Values আসে shared-types/common/primitives থেকে (type only)।
 */
import type { Timestamp } from '@vubon/shared-types/common';

export type EventStatus = 'pending' | 'published' | 'failed' | 'processed';

export interface EventRecord<TEvent = unknown> {
  readonly id: string;
  readonly event: TEvent;
  readonly status: EventStatus;
  readonly publishedAt?: Timestamp;
  readonly processedAt?: Timestamp;
  readonly error?: string;
  readonly retryCount: number;
}

export interface EventSubscription {
  readonly id: string;
  readonly eventType: string;
  readonly handlerName: string;
  readonly createdAt: Timestamp;
}

export interface EventPublishResult {
  readonly eventId: string;
  readonly success: boolean;
  readonly error?: string;
  readonly publishedAt: Timestamp;
}
