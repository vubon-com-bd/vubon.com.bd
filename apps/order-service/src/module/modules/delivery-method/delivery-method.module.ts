import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DeliveryMethodService } from '../../application/services/impl/delivery-method.service';
import { GetDeliveryMethodsHandler } from '../../application/queries/delivery/get-delivery-methods.handler';
import { DeliveryMethodPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/delivery-method.prisma.repository';

@Module({
  imports: [CqrsModule],
  providers: [
    DeliveryMethodPrismaRepository,
    DeliveryMethodService,
    GetDeliveryMethodsHandler,
  ],
  exports: [DeliveryMethodService, DeliveryMethodPrismaRepository],
})
export class DeliveryMethodModule {}
