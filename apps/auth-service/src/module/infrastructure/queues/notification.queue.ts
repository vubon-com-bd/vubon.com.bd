/**
 * NotificationQueue — Email/SMS/Push dispatch
 * @module auth-service/infrastructure/queues
 */
import { Queue } from 'bullmq';
import { QUEUE_NAME, QUEUE_LIMIT, QUEUE_PRIORITY } from '@vubon/shared-constants/infrastructure';

export const NOTIFICATION_QUEUE_NAME = QUEUE_NAME.NOTIFICATION;

export function createNotificationQueue(connection: { host: string; port: number }): Queue {
  return new Queue(NOTIFICATION_QUEUE_NAME, {
    connection,
    defaultJobOptions: {
      attempts: QUEUE_LIMIT.MAX_ATTEMPTS,
      backoff: { type: 'exponential', delay: QUEUE_LIMIT.BACKOFF_DELAY },
      removeOnComplete: QUEUE_LIMIT.REMOVE_ON_COMPLETE,
      removeOnFail: QUEUE_LIMIT.REMOVE_ON_FAIL,
      priority: QUEUE_PRIORITY.HIGH,
    },
  });
}
