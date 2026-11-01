/**
 * Queues + Workers Module
 * @module identity-service/infrastructure
 */
import { Module } from '@nestjs/common';
import { QueueModule } from '@vubon/shared-kernel/infrastructure/messaging/queue';
import { PersistenceModule } from './persistence/persistence.module.js';
import {
  AuthQueue,
  SessionQueue,
  TokenQueue,
  NotificationQueue,
  AnalyticsQueue,
} from './queues/index.js';
import {
  SessionCleanupWorker,
  TokenCleanupWorker,
  AccountLockWorker,
  LoginAttemptWorker,
  DeviceSyncWorker,
  AnalyticsProcessorWorker,
} from './workers/index.js';

const QUEUES = [
  AuthQueue,
  SessionQueue,
  TokenQueue,
  NotificationQueue,
  AnalyticsQueue,
];

const WORKERS = [
  SessionCleanupWorker,
  TokenCleanupWorker,
  AccountLockWorker,
  LoginAttemptWorker,
  DeviceSyncWorker,
  AnalyticsProcessorWorker,
];

@Module({
  imports: [QueueModule, PersistenceModule.forRoot()],
  providers: [...QUEUES, ...WORKERS],
  exports: QUEUES,
})
export class QueuesWorkersModule {}
