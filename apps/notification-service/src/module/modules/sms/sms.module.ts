import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SmsController } from '../../interfaces/controllers/rest/sms.controller';

// Services
import { NotificationService } from '../../application/services/impl/notification.service';
import { NotificationDeliveryService } from '../../application/services/impl/notification-delivery.service';
import { SmsSplitterService } from '../../infrastructure/services/internal';

// Providers
import { TwilioProvider } from '../../infrastructure/providers/sms/twilio.provider';
import { VonageProvider } from '../../infrastructure/providers/sms/vonage.provider';
import { BulkSmsBdProvider } from '../../infrastructure/providers/sms/bulksmsbd.provider';
import { BanglalinkProvider } from '../../infrastructure/providers/sms/banglalink.provider';
import { GrameenphoneProvider } from '../../infrastructure/providers/sms/grameenphone.provider';

// Repositories
import { NotificationDeliveryPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification-delivery.prisma.repository';

// Workers + Queues
import { SmsSenderWorker } from '../../infrastructure/workers/sms-sender.worker';
import { SmsQueue } from '../../infrastructure/queues/sms.queue';

// Command handlers
import {
  SendSmsHandler,
  SendBulkSmsHandler,
} from '../../application/commands/sms';

// Query handlers
import {
  GetDeliveryHandler,
  GetDeliveryByNotificationHandler,
  ListFailedDeliveriesHandler,
} from '../../application/queries/delivery';

@Module({
  imports: [CqrsModule],
  controllers: [SmsController],
  providers: [
    // Repositories
    NotificationDeliveryPrismaRepository,

    // Services
    NotificationService,
    NotificationDeliveryService,
    SmsSplitterService,

    // Providers
    TwilioProvider,
    VonageProvider,
    BulkSmsBdProvider,
    BanglalinkProvider,
    GrameenphoneProvider,

    // Queue + Worker
    SmsQueue,
    SmsSenderWorker,

    // Command handlers
    SendSmsHandler,
    SendBulkSmsHandler,

    // Query handlers
    GetDeliveryHandler,
    GetDeliveryByNotificationHandler,
    ListFailedDeliveriesHandler,
  ],
  exports: [
    NotificationDeliveryService,
    NotificationDeliveryPrismaRepository,
    SmsQueue,
    TwilioProvider,
    SmsSplitterService,
  ],
})
export class SmsModule {}
