import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SplitPaymentController } from '../../interfaces/controllers/rest/split-payment.controller';
import { SplitPaymentService } from '../../application/services/impl/split-payment.service';
import { CreateSplitPaymentHandler } from '../../application/commands/split/create-split-payment.handler';
import { ListSplitPaymentsHandler } from '../../application/queries/split/list-split-payments.handler';

@Module({
  imports: [CqrsModule],
  controllers: [SplitPaymentController],
  providers: [
    SplitPaymentService,
    CreateSplitPaymentHandler,
    ListSplitPaymentsHandler,
  ],
  exports: [SplitPaymentService],
})
export class SplitPaymentModule {}
