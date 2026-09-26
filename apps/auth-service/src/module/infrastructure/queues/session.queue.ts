/**
 * SessionQueue — Session lifecycle jobs
 * @module auth-service/infrastructure/queues
 */
import { Queue } from 'bullmq';
import { QUEUE_NAME, QUEUE_LIMIT } from '@vubon/shared-constants/infrastructure';

export const SESSION_QUEUE_NAME = QUEUE_NAME.SESSION;

export function createSessionQueue(connection: { host: string; port: number }): Queue {
  return new Queue(SESSION_QUEUE_NAME, {
    connection,
    defaultJobOptions: {
      attempts: QUEUE_LIMIT.MAX_ATTEMPTS,
      backoff: { type: 'exponential', delay: QUEUE_LIMIT.BACKOFF_DELAY },
      removeOnComplete: QUEUE_LIMIT.REMOVE_ON_COMPLETE,
      removeOnFail: QUEUE_LIMIT.REMOVE_ON_FAIL,
    },
  });
}
