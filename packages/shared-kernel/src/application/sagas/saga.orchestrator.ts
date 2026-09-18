/**
 * Saga Orchestrator
 * @module shared-kernel/application/sagas
 *
 * References BaseSaga।
 */
import type { BaseSaga } from './base.saga';

export interface SagaOrchestrator {
  register(name: string, saga: BaseSaga): void;
  start(name: string, input: unknown): Promise<void>;
  getStatus(name: string): Promise<string>;
}
