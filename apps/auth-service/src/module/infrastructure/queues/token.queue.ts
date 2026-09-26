/**
 * TokenQueue — Token lifecycle jobs
 * @module auth-service/infrastructure/queues
 */
import { Queue } from 'bullmq';
import { QUEUE_NAME, QUEUE_LIMIT } from '@vubon/shared-constants/infrastructure';

export const TOKEN_QUEUE_NAME = QUEUE_NAME.TOKEN;

export function createTokenQueue(connection: { host: string; port: number }): Queue {
  return new Queue(TOKEN_QUEUE_NAME, {
    connection,
    defaultJobOptions: {
      attempts: QUEUE_LIMIT.MAX_ATTEMPTS,
      backoff: { type: 'exponential', delay: QUEUE_LIMIT.BACKOFF_DELAY },
      removeOnComplete: QUEUE_LIMIT.REMOVE_ON_COMPLETE,
      removeOnFail: QUEUE_LIMIT.REMOVE_ON_FAIL,
    },
  });
}
