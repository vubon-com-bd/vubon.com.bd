/**
 * Queue Types
 * @module shared-types/infrastructure
 *
 * Values আসে shared-constants/infrastructure/queue.constants থেকে।
 */

import type {
  QUEUE_NAME,
  QUEUE_PRIORITY,
  QUEUE_STATUS,
} from '@vubon/shared-constants/infrastructure';

export type QueueName = (typeof QUEUE_NAME)[keyof typeof QUEUE_NAME];
export type QueuePriority = (typeof QUEUE_PRIORITY)[keyof typeof QUEUE_PRIORITY];
export type QueueStatus = (typeof QUEUE_STATUS)[keyof typeof QUEUE_STATUS];

export interface QueueJob<TPayload = unknown> {
  readonly id: string;
  readonly name: string;
  readonly queue: QueueName;
  readonly payload: TPayload;
  readonly priority: QueuePriority;
  readonly status: QueueStatus;
  readonly attempts: number;
  readonly maxAttempts: number;
  readonly createdAt: string;
  readonly processedAt?: string;
  readonly completedAt?: string;
  readonly failedAt?: string;
  readonly error?: string;
}

export interface QueueOptions {
  readonly priority?: QueuePriority;
  readonly delayMs?: number;
  readonly attempts?: number;
  readonly backoffMs?: number;
  readonly jobId?: string;
  readonly removeOnComplete?: boolean;
  readonly removeOnFail?: boolean;
}

export interface QueueJobResult<T = unknown> {
  readonly jobId: string;
  readonly success: boolean;
  readonly result?: T;
  readonly error?: string;
  readonly durationMs: number;
}

export interface QueueMetrics {
  readonly queue: QueueName;
  readonly waiting: number;
  readonly active: number;
  readonly completed: number;
  readonly failed: number;
  readonly delayed: number;
  readonly paused: boolean;
}
