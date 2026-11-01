/**
 * Base Queue Abstraction
 * @module shared-kernel/infrastructure/messaging/queue
 *
 * Pure abstraction — কোনো external import নেই।
 */
export interface QueueJobPayload {
  readonly [key: string]: unknown;
}

export interface QueueJobOptions {
  readonly priority?: number;
  readonly delay?: number;
  readonly attempts?: number;
  readonly backoffMs?: number;
  readonly jobId?: string;
}

export interface QueueJobResult<T = unknown> {
  readonly jobId: string;
  readonly success: boolean;
  readonly data?: T;
  readonly error?: string;
}
