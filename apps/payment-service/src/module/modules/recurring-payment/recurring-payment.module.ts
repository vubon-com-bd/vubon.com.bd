import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { RecurringPaymentController } from '../../interfaces/controllers/rest/recurring-payment.controller';
import { RecurringPaymentService } from '../../application/services/impl/recurring-payment.service';
import { CreateRecurringHandler } from '../../application/commands/recurring/create-recurring.handler';
import { PauseRecurringHandler } from '../../application/commands/recurring/pause-recurring.handler';
import { CancelRecurringHandler } from '../../application/commands/recurring/cancel-recurring.handler';
import { ListRecurringHandler } from '../../application/queries/recurring/list-recurring.handler';

@Module({
  imports: [CqrsModule],
  controllers: [RecurringPaymentController],
  providers: [
    RecurringPaymentService,
    CreateRecurringHandler,
    PauseRecurringHandler,
    CancelRecurringHandler,
    ListRecurringHandler,
  ],
  exports: [RecurringPaymentService],
})
export class RecurringPaymentModule {}
