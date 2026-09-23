import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DeliveryController } from '../../interfaces/controllers/rest/delivery.controller';
import { DeliveryService } from '../../application/services/impl/delivery.service';
import { DeliveryMapper } from '../../application/mappers/delivery.mapper';

import { ScheduleDeliveryHandler } from '../../application/commands/delivery/schedule-delivery.handler';
import { RescheduleDeliveryHandler } from '../../application/commands/delivery/reschedule-delivery.handler';
import { AttemptDeliveryHandler } from '../../application/commands/delivery/attempt-delivery.handler';
import { CompleteDeliveryHandler } from '../../application/commands/delivery/complete-delivery.handler';
import { FailDeliveryHandler } from '../../application/commands/delivery/fail-delivery.handler';

import { GetDeliveryHandler } from '../../application/queries/delivery/get-delivery.handler';
import { ListDeliveriesHandler } from '../../application/queries/delivery/list-deliveries.handler';
import { GetDeliveryAttemptsHandler } from '../../application/queries/delivery/get-delivery-attempts.handler';

import { DeliveryPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/delivery.prisma.repository';
import { DeliveryCacheRepository } from '../../infrastructure/persistence/cache/repositories/delivery.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [DeliveryController],
  providers: [
    DeliveryPrismaRepository,
    DeliveryCacheRepository,
    DeliveryService,
    DeliveryMapper,
    ScheduleDeliveryHandler,
    RescheduleDeliveryHandler,
    AttemptDeliveryHandler,
    CompleteDeliveryHandler,
    FailDeliveryHandler,
    GetDeliveryHandler,
    ListDeliveriesHandler,
    GetDeliveryAttemptsHandler,
  ],
  exports: [DeliveryService, DeliveryPrismaRepository, DeliveryCacheRepository],
})
export class DeliveryModule {}
