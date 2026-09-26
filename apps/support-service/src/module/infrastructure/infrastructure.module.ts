/**
 * SupportInfrastructureModule — root infra module
 * @module support-service/infrastructure
 *
 * Wires persistence (Prisma + Cache), workers, services, websocket.
 * Rule: does not import interfaces/modules.
 */
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import { SupportPrismaModule } from './persistence/prisma/prisma.module';
import { SupportRedisModule } from './persistence/cache/redis.module';
import { TicketProcessorWorker } from './workers/ticket-processor.worker';
import { UserClient } from './services/external/user.client';
import { NotificationClient } from './services/external/notification.client';
import { TicketNumberGeneratorService } from './services/internal/ticket-number-generator.service';
import { SupportWebSocketGateway } from './websocket/websocket.gateway';
import { SUPPORT_QUEUE } from './queues/support-queue.constants';

@Module({
  imports: [
    SupportPrismaModule,
    SupportRedisModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST ?? '127.0.0.1',
        port: Number(process.env.REDIS_PORT ?? 6379),
      },
    }),
    BullModule.registerQueue({ name: SUPPORT_QUEUE.TICKET }),
    BullModule.registerQueue({ name: SUPPORT_QUEUE.SLA }),
    BullModule.registerQueue({ name: SUPPORT_QUEUE.ESCALATION }),
    BullModule.registerQueue({ name: SUPPORT_QUEUE.FEEDBACK }),
    BullModule.registerQueue({ name: SUPPORT_QUEUE.CHATBOT }),
    BullModule.registerQueue({ name: SUPPORT_QUEUE.LIVE_CHAT }),
  ],
  providers: [
    TicketProcessorWorker,
    UserClient,
    NotificationClient,
    TicketNumberGeneratorService,
    SupportWebSocketGateway,
  ],
  exports: [
    SupportPrismaModule,
    SupportRedisModule,
    UserClient,
    NotificationClient,
    TicketNumberGeneratorService,
    SupportWebSocketGateway,
  ],
})
export class SupportInfrastructureModule {}
