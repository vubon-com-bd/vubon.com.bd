import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RefundController } from '../../interfaces/controllers/rest/refund.controller';
import { RefundService } from '../../application/services/impl/refund.service';
import { RefundMapper } from '../../application/mappers/refund.mapper';
import { RequestRefundHandler } from '../../application/commands/refund/request-refund.handler';
import { ApproveRefundHandler } from '../../application/commands/refund/approve-refund.handler';
import { RejectRefundHandler } from '../../application/commands/refund/reject-refund.handler';
import { PartialRefundHandler } from '../../application/commands/refund/partial-refund.handler';
import { ListRefundsHandler } from '../../application/queries/refund/list-refunds.handler';
import { RefundProcessingSaga } from '../../application/sagas/refund-processing.saga';

@Module({
  imports: [CqrsModule],
  controllers: [RefundController],
  providers: [
    RefundService,
    RefundMapper,
    RequestRefundHandler,
    ApproveRefundHandler,
    RejectRefundHandler,
    PartialRefundHandler,
    ListRefundsHandler,
    RefundProcessingSaga,
  ],
  exports: [RefundService],
})
export class RefundModule {}
