/**
 * Event Bus Client Configuration
 * @module shared-kernel/infrastructure/messaging/event-bus
 *
 * Values আসে shared-config/infrastructure/queue থেকে।
 */
import { QUEUE_CONFIG } from '@vubon/shared-config/infrastructure';

export const EVENT_BUS_CLIENT_CONFIG = Object.freeze({
  queueName: 'domain-events',
  driver: QUEUE_CONFIG.driver,
  concurrency: QUEUE_CONFIG.workerConcurrency,
  maxRetries: QUEUE_CONFIG.defaultAttempts,
  backoffMs: QUEUE_CONFIG.defaultBackoffMs,
  autoStartWorkers: QUEUE_CONFIG.autoStartWorkers,
});

export type EventBusClientConfig = typeof EVENT_BUS_CLIENT_CONFIG;
