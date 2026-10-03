import { BullModule } from '@nestjs/bullmq';
import { ORDER_QUEUE_NAME } from './queue.constants.js';

export const NotificationQueueRegistration = BullModule.registerQueue({
  name: ORDER_QUEUE_NAME.NOTIFICATION,
  defaultJobOptions: {
    attempts: 5,
    backoff: { type: 'exponential', delay: 3000 },
    removeOnComplete: 500,
    removeOnFail: 1000,
  },
});
