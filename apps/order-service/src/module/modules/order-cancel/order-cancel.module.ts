import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { CancelController } from '../../interfaces/controllers/rest/cancel.controller';
import { CancelService } from '../../application/services/impl/cancel.service';
import { RequestCancelHandler } from '../../application/commands/cancel/request-cancel.handler';
import { ApproveCancelHandler } from '../../application/commands/cancel/approve-cancel.handler';
import { RejectCancelHandler } from '../../application/commands/cancel/reject-cancel.handler';
import { CompleteCancelHandler } from '../../application/commands/cancel/complete-cancel.handler';
import { GetCancelHandler } from '../../application/queries/cancel/get-cancel.handler';
import { GetCancelByOrderHandler } from '../../application/queries/cancel/get-cancel-by-order.handler';
import { OrderCancelPrismaRepository } from '../../infrastructure/persistence/prisma/repositories/order-cancel.prisma.repository';

@Module({
  imports: [CqrsModule],
  controllers: [CancelController],
  providers: [
    OrderCancelPrismaRepository,
    CancelService,
    RequestCancelHandler,
    ApproveCancelHandler,
    RejectCancelHandler,
    CompleteCancelHandler,
    GetCancelHandler,
    GetCancelByOrderHandler,
  ],
  exports: [CancelService, OrderCancelPrismaRepository],
})
export class OrderCancelModule {}
