/**
 * BullMQ Type Re-exports
 * @module shared-kernel/infrastructure/messaging/queue
 */
import type { Queue, Worker, Job, QueueOptions, WorkerOptions } from 'bullmq';

export type QueueType = Queue;
export type WorkerType = Worker;
export type JobType = Job;
export type QueueOptionsType = QueueOptions;
export type WorkerOptionsType = WorkerOptions;

export interface QueueConnectionOptions {
  readonly host?: string;
  readonly port?: number;
  readonly url?: string;
}
