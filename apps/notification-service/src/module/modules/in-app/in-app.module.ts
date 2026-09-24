import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { InAppController } from '../../interfaces/controllers/rest/in-app.controller';

// Services
import { NotificationService } from '../../application/services/impl/notification.service';

// Providers
import { WebSocketProvider } from '../../infrastructure/providers/in-app/websocket.provider';
import { SseProvider } from '../../infrastructure/providers/in-app/sse.provider';

// Repositories
import { NotificationPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification.prisma.repository';
import { NotificationCacheRepository } from '../../infrastructure/persistence/cache/repositories/notification.cache.repository';

// Workers + Queues
import { InAppSenderWorker } from '../../infrastructure/workers/in-app-sender.worker';
import { InAppQueue } from '../../infrastructure/queues/in-app.queue';

// Command handlers
import {
  CreateInAppHandler,
  MarkAsReadHandler,
  DismissHandler,
} from '../../application/commands/in-app';

// Query handlers
import {
  ListNotificationsHandler,
  GetUnreadCountHandler,
} from '../../application/queries/notification';

@Module({
  imports: [CqrsModule],
  controllers: [InAppController],
  providers: [
    // Repositories
    NotificationPrismaRepository,
    NotificationCacheRepository,

    // Services
    NotificationService,

    // Providers
    WebSocketProvider,
    SseProvider,

    // Queue + Worker
    InAppQueue,
    InAppSenderWorker,

    // Command handlers
    CreateInAppHandler,
    MarkAsReadHandler,
    DismissHandler,

    // Query handlers
    ListNotificationsHandler,
    GetUnreadCountHandler,
  ],
  exports: [
    NotificationService,
    NotificationPrismaRepository,
    NotificationCacheRepository,
    InAppQueue,
  ],
})
export class InAppModule {}
