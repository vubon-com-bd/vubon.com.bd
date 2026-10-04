import { BullModule } from '@nestjs/bullmq';
import { ORDER_QUEUE_NAME } from './queue.constants.js';

export const AnalyticsQueueRegistration = BullModule.registerQueue({
  name: ORDER_QUEUE_NAME.ANALYTICS,
  defaultJobOptions: {
    attempts: 2,
    removeOnComplete: 200,
    removeOnFail: 500,
  },
});
