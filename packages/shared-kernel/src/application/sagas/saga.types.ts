/**
 * Saga Types
 * @module shared-kernel/application/sagas
 *
 * Values আসে shared-types/common/primitives থেকে (type only)।
 */
import type { Timestamp } from '@vubon/shared-types/common';

export type SagaStatus =
  'pending' | 'running' | 'completed' | 'compensating' | 'compensated' | 'failed';

export interface SagaStep<TInput = unknown, TOutput = unknown> {
  readonly name: string;
  execute(input: TInput): Promise<TOutput>;
  compensate(input: TInput): Promise<void>;
}

export interface SagaState<TContext = unknown> {
  readonly id: string;
  readonly name: string;
  readonly status: SagaStatus;
  readonly context: TContext;
  readonly startedAt: Timestamp;
  readonly completedAt?: Timestamp;
  readonly failedAt?: Timestamp;
  readonly error?: string;
}
