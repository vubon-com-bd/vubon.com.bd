import { BullModule } from '@nestjs/bullmq';
import { ORDER_QUEUE_NAME } from './queue.constants.js';

export const DeliveryQueueRegistration = BullModule.registerQueue({
  name: ORDER_QUEUE_NAME.DELIVERY,
  defaultJobOptions: {
    attempts: 3,
    backoff: { type: 'exponential', delay: 10000 },
    removeOnComplete: 1000,
    removeOnFail: 5000,
  },
});
