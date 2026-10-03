/**
 * OrderQueue registration (BullMQ)
 * @module order-service/infrastructure/queues
 */
import { BullModule } from '@nestjs/bullmq';
import { ORDER_QUEUE_NAME, ORDER_QUEUE_LIMITS } from './queue.constants.js';

export const OrderQueueRegistration = BullModule.registerQueue({
  name: ORDER_QUEUE_NAME.ORDER_PROCESSING,
  defaultJobOptions: {
    attempts: ORDER_QUEUE_LIMITS.MAX_ATTEMPTS,
    backoff: { type: 'exponential', delay: ORDER_QUEUE_LIMITS.BACKOFF_MS },
    removeOnComplete: 1000,
    removeOnFail: 5000,
  },
});
