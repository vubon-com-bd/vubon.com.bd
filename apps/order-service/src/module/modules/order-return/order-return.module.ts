import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { ReturnController } from '../../interfaces/controllers/rest/return.controller';
import { ReturnService } from '../../application/services/impl/return.service';
import { RequestReturnHandler } from '../../application/commands/return/request-return.handler';
import { ApproveReturnHandler } from '../../application/commands/return/approve-return.handler';
import { RejectReturnHandler } from '../../application/commands/return/reject-return.handler';
import { ReceiveReturnHandler } from '../../application/commands/return/receive-return.handler';
import { CompleteReturnHandler } from '../../application/commands/return/complete-return.handler';
import { GetReturnHandler } from '../../application/queries/return/get-return.handler';
import { GetReturnByOrderHandler } from '../../application/queries/return/get-return-by-order.handler';
import { OrderReturnPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/order-return.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [ReturnController],
  providers: [
    OrderReturnPrismaRepository,
    ReturnService,
    RequestReturnHandler,
    ApproveReturnHandler,
    RejectReturnHandler,
    ReceiveReturnHandler,
    CompleteReturnHandler,
    GetReturnHandler,
    GetReturnByOrderHandler,
  ],
  exports: [ReturnService, OrderReturnPrismaRepository],
})
export class OrderReturnModule {}
