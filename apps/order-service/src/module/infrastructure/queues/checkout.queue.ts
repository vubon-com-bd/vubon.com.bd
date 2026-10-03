import { BullModule } from '@nestjs/bullmq';
import { ORDER_QUEUE_NAME, ORDER_QUEUE_LIMITS } from './queue.constants.js';

export const CheckoutQueueRegistration = BullModule.registerQueue({
  name: ORDER_QUEUE_NAME.CLEANUP,
  defaultJobOptions: {
    attempts: ORDER_QUEUE_LIMITS.MAX_ATTEMPTS,
    backoff: { type: 'exponential', delay: ORDER_QUEUE_LIMITS.BACKOFF_MS },
    removeOnComplete: 500,
    removeOnFail: 1000,
  },
});
