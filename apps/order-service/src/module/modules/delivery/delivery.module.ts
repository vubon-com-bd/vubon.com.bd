import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DeliveryController } from '../../interfaces/controllers/rest/delivery.controller';
import { DeliveryService } from '../../application/services/impl/delivery.service';
import { ScheduleDeliveryHandler } from '../../application/commands/delivery/schedule-delivery.handler';
import { RescheduleDeliveryHandler } from '../../application/commands/delivery/reschedule-delivery.handler';
import { ConfirmDeliveryHandler } from '../../application/commands/delivery/confirm-delivery.handler';
import { MarkDeliveryAttemptedHandler } from '../../application/commands/delivery/mark-delivery-attempted.handler';
import { GetDeliveryHandler } from '../../application/queries/delivery/get-delivery.handler';
import { GetDeliveryByOrderHandler } from '../../application/queries/delivery/get-delivery-by-order.handler';
import { GetDeliveryMethodsHandler } from '../../application/queries/delivery/get-delivery-methods.handler';
import { DeliveryPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/delivery.prisma.repository';
import { DeliveryCacheRepository } from '../../infrastructure/persistence/cache/repositories/delivery.cache.repository';

@Module({
  imports: [CqrsModule],
  controllers: [DeliveryController],
  providers: [
    DeliveryPrismaRepository,
    DeliveryCacheRepository,
    DeliveryService,
    ScheduleDeliveryHandler,
    RescheduleDeliveryHandler,
    ConfirmDeliveryHandler,
    MarkDeliveryAttemptedHandler,
    GetDeliveryHandler,
    GetDeliveryByOrderHandler,
    GetDeliveryMethodsHandler,
  ],
  exports: [DeliveryService, DeliveryPrismaRepository, DeliveryCacheRepository],
})
export class DeliveryModule {}
