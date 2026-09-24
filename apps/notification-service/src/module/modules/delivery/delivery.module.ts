import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Services
import { NotificationDeliveryService } from '../../application/services/impl/notification-delivery.service';
import { NotificationAttemptService } from '../../application/services/impl/notification-attempt.service';
import { RetrySchedulerService } from '../../infrastructure/services/internal';
import { BounceHandlerService } from '../../infrastructure/services/internal';

// Repositories
import { NotificationDeliveryPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification-delivery.prisma.repository';
import { NotificationAttemptPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification-attempt.prisma.repository';

// Workers
import { NotificationSenderWorker } from '../../infrastructure/workers/notification-sender.worker';
import { RetryProcessorWorker } from '../../infrastructure/workers/retry-processor.worker';

// Queues
import { NotificationQueue } from '../../infrastructure/queues/notification.queue';
import { RetryQueue } from '../../infrastructure/queues/retry.queue';

// Query handlers
import {
  GetDeliveryHandler,
  GetDeliveryByNotificationHandler,
  ListFailedDeliveriesHandler,
} from '../../application/queries/delivery';

// Command handlers
import {
  ResendNotificationHandler,
  CancelNotificationHandler,
} from '../../application/commands/notification';

@Module({
  imports: [CqrsModule],
  providers: [
    // Repositories
    NotificationDeliveryPrismaRepository,
    NotificationAttemptPrismaRepository,

    // Services
    NotificationDeliveryService,
    NotificationAttemptService,
    RetrySchedulerService,
    BounceHandlerService,

    // Queues + Workers
    NotificationQueue,
    RetryQueue,
    NotificationSenderWorker,
    RetryProcessorWorker,

    // Command handlers
    ResendNotificationHandler,
    CancelNotificationHandler,

    // Query handlers
    GetDeliveryHandler,
    GetDeliveryByNotificationHandler,
    ListFailedDeliveriesHandler,
  ],
  exports: [
    NotificationDeliveryService,
    NotificationAttemptService,
    NotificationDeliveryPrismaRepository,
    NotificationAttemptPrismaRepository,
    NotificationQueue,
    RetryQueue,
  ],
})
export class DeliveryModule {}
