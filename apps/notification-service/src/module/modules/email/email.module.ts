import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { EmailController } from '../../interfaces/controllers/rest/email.controller';

// Services
import { NotificationService } from '../../application/services/impl/notification.service';
import { NotificationDeliveryService } from '../../application/services/impl/notification-delivery.service';

// Providers
import { SendGridProvider } from '../../infrastructure/providers/email/sendgrid.provider';
import { MailgunProvider } from '../../infrastructure/providers/email/mailgun.provider';
import { SesProvider } from '../../infrastructure/providers/email/ses.provider';
import { PostmarkProvider } from '../../infrastructure/providers/email/postmark.provider';
import { ResendProvider } from '../../infrastructure/providers/email/resend.provider';
import { SmtpProvider } from '../../infrastructure/providers/email/smtp.provider';

// Repositories
import { NotificationDeliveryPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/notification-delivery.prisma.repository';

// Workers + Queues
import { EmailSenderWorker } from '../../infrastructure/workers/email-sender.worker';
import { EmailQueue } from '../../infrastructure/queues/email.queue';

// Commands
import {
  SendEmailHandler,
  SendTemplateEmailHandler,
  SendBulkEmailHandler,
} from '../../application/commands/email';

// Queries
import {
  GetDeliveryHandler,
  GetDeliveryByNotificationHandler,
  ListFailedDeliveriesHandler,
} from '../../application/queries/delivery';

@Module({
  imports: [CqrsModule],
  controllers: [EmailController],
  providers: [
    // Repositories
    NotificationDeliveryPrismaRepository,

    // Services
    NotificationService,
    NotificationDeliveryService,

    // Providers
    SendGridProvider,
    MailgunProvider,
    SesProvider,
    PostmarkProvider,
    ResendProvider,
    SmtpProvider,

    // Queue + Worker
    EmailQueue,
    EmailSenderWorker,

    // Command handlers
    SendEmailHandler,
    SendTemplateEmailHandler,
    SendBulkEmailHandler,

    // Query handlers
    GetDeliveryHandler,
    GetDeliveryByNotificationHandler,
    ListFailedDeliveriesHandler,
  ],
  exports: [
    NotificationDeliveryService,
    NotificationDeliveryPrismaRepository,
    EmailQueue,
    SendGridProvider,
    MailgunProvider,
    SesProvider,
  ],
})
export class EmailModule {}
