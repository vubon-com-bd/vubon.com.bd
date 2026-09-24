import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TicketSatisfactionController } from '../../interfaces/controllers/rest/ticket-satisfaction.controller';
import { RateTicketHandler } from '../../application/commands/ticket/rate-ticket.handler';
import { TicketSatisfactionService } from '../../application/services/impl/ticket-satisfaction.service';

@Module({
  imports: [CqrsModule],
  controllers: [TicketSatisfactionController],
  providers: [RateTicketHandler, TicketSatisfactionService],
  exports: [TicketSatisfactionService],
})
export class TicketSatisfactionModule {}
