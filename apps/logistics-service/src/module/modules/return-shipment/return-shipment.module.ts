import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ReturnShipmentController } from '../../interfaces/controllers/rest/return-shipment.controller';
import { ReturnShipmentService } from '../../application/services/impl/return-shipment.service';

import { RequestReturnHandler } from '../../application/commands/return-shipment/request-return.handler';
import { ApproveReturnHandler } from '../../application/commands/return-shipment/approve-return.handler';
import { PickupReturnHandler } from '../../application/commands/return-shipment/pickup-return.handler';
import { CompleteReturnHandler } from '../../application/commands/return-shipment/complete-return.handler';

import { GetReturnHandler } from '../../application/queries/return-shipment/get-return.handler';
import { ListReturnsHandler } from '../../application/queries/return-shipment/list-returns.handler';
import { ListPendingReturnsHandler } from '../../application/queries/return-shipment/list-pending-returns.handler';

import { ReturnShipmentPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/return-shipment.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ReturnShipmentController],
  providers: [
    ReturnShipmentPrismaRepository,
    ReturnShipmentService,
    RequestReturnHandler,
    ApproveReturnHandler,
    PickupReturnHandler,
    CompleteReturnHandler,
    GetReturnHandler,
    ListReturnsHandler,
    ListPendingReturnsHandler,
  ],
  exports: [ReturnShipmentService, ReturnShipmentPrismaRepository],
})
export class ReturnShipmentModule {}
