import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { PushController } from '../../interfaces/controllers/rest/push.controller';

// Services
import { NotificationService } from '../../application/services/impl/notification.service';
import { NotificationDeliveryService } from '../../application/services/impl/notification-delivery.service';
import { DeviceService } from '../../application/services/impl/device.service';
import { DeviceTokenValidatorService } from '../../infrastructure/services/internal';

// Providers
import { FcmProvider } from '../../infrastructure/providers/push/fcm.provider';
import { ApnsProvider } from '../../infrastructure/providers/push/apns.provider';
import { WebPushProvider } from '../../infrastructure/providers/push/web-push.provider';
import { OneSignalProvider } from '../../infrastructure/providers/push/onesignal.provider';

// Repositories
import { NotificationDeliveryPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification-delivery.prisma.repository';
import { DevicePrismaRepository } from '../../infrastructure/persistence/prisma/repositories/device.prisma.repository';

// Workers + Queues
import { PushSenderWorker } from '../../infrastructure/workers/push-sender.worker';
import { PushQueue } from '../../infrastructure/queues/push.queue';

// Command handlers
import {
  SendPushHandler,
  SendBulkPushHandler,
} from '../../application/commands/push';

// Query handlers
import {
  GetDeliveryHandler,
  GetDeliveryByNotificationHandler,
  ListFailedDeliveriesHandler,
} from '../../application/queries/delivery';
import {
  GetDeviceHandler,
  ListDevicesHandler,
} from '../../application/queries/device';

@Module({
  imports: [CqrsModule],
  controllers: [PushController],
  providers: [
    // Repositories
    NotificationDeliveryPrismaRepository,
    DevicePrismaRepository,

    // Services
    NotificationService,
    NotificationDeliveryService,
    DeviceService,
    DeviceTokenValidatorService,

    // Providers
    FcmProvider,
    ApnsProvider,
    WebPushProvider,
    OneSignalProvider,

    // Queue + Worker
    PushQueue,
    PushSenderWorker,

    // Command handlers
    SendPushHandler,
    SendBulkPushHandler,

    // Query handlers
    GetDeliveryHandler,
    GetDeliveryByNotificationHandler,
    ListFailedDeliveriesHandler,
    GetDeviceHandler,
    ListDevicesHandler,
  ],
  exports: [
    NotificationDeliveryService,
    DeviceService,
    PushQueue,
    FcmProvider,
    ApnsProvider,
    DeviceTokenValidatorService,
  ],
})
export class PushModule {}
