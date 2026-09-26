import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { NotificationController } from '../../interfaces/controllers/rest/notification.controller';

// Application services
import { NotificationService } from '../../application/services/impl/notification.service';
import { NotificationContentService } from '../../application/services/impl/notification-content.service';
import { NotificationRecipientService } from '../../application/services/impl/notification-recipient.service';
import { NotificationActionService } from '../../application/services/impl/notification-action.service';
import { NotificationDeliveryService } from '../../application/services/impl/notification-delivery.service';
import { NotificationAttemptService } from '../../application/services/impl/notification-attempt.service';

// Infrastructure — repositories
import { NotificationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification.prisma.repository';
import { NotificationContentPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification-content.prisma.repository';
import { NotificationRecipientPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification-recipient.prisma.repository';
import { NotificationActionPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification-action.prisma.repository';
import { NotificationDeliveryPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification-delivery.prisma.repository';
import { NotificationAttemptPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification-attempt.prisma.repository';
import { NotificationCacheRepository } from '../../infrastructure/persistence/cache/repositories/notification.cache.repository';

// Command handlers
import {
  SendNotificationHandler,
  SendBulkHandler,
  ResendNotificationHandler,
  CancelNotificationHandler,
} from '../../application/commands/notification';

// Query handlers
import {
  GetNotificationHandler,
  ListNotificationsHandler,
  GetUnreadCountHandler,
  GetNotificationStatsHandler,
} from '../../application/queries/notification';

// Sagas
import {
  NotificationDeliverySaga,
  NotificationRetrySaga,
  QuietHoursSaga,
} from '../../application/sagas';

// Health
import { NotificationHealthIndicator } from './health';

@Module({
  imports: [CqrsModule],
  controllers: [NotificationController],
  providers: [
    // Repositories
    NotificationPrismaRepository,
    NotificationContentPrismaRepository,
    NotificationRecipientPrismaRepository,
    NotificationActionPrismaRepository,
    NotificationDeliveryPrismaRepository,
    NotificationAttemptPrismaRepository,
    NotificationCacheRepository,

    // Services
    NotificationService,
    NotificationContentService,
    NotificationRecipientService,
    NotificationActionService,
    NotificationDeliveryService,
    NotificationAttemptService,

    // Command handlers
    SendNotificationHandler,
    SendBulkHandler,
    ResendNotificationHandler,
    CancelNotificationHandler,

    // Query handlers
    GetNotificationHandler,
    ListNotificationsHandler,
    GetUnreadCountHandler,
    GetNotificationStatsHandler,

    // Sagas
    NotificationDeliverySaga,
    NotificationRetrySaga,
    QuietHoursSaga,

    // Health
    NotificationHealthIndicator,
  ],
  exports: [
    NotificationService,
    NotificationDeliveryService,
    NotificationPrismaRepository,
    NotificationDeliveryPrismaRepository,
    NotificationHealthIndicator,
  ],
})
export class NotificationModule {}
