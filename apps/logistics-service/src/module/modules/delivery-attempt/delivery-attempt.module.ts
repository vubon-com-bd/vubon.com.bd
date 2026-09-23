import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { DeliveryAttemptController } from '../../interfaces/controllers/rest/delivery-attempt.controller';
import { DeliveryAttemptService } from '../../application/services/impl/delivery-attempt.service';
import { GetDeliveryAttemptsHandler } from '../../application/queries/delivery/get-delivery-attempts.handler';
import { DeliveryAttemptPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/delivery-attempt.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [DeliveryAttemptController],
  providers: [
    DeliveryAttemptPrismaRepository,
    DeliveryAttemptService,
    GetDeliveryAttemptsHandler,
  ],
  exports: [DeliveryAttemptService, DeliveryAttemptPrismaRepository],
})
export class DeliveryAttemptModule {}
