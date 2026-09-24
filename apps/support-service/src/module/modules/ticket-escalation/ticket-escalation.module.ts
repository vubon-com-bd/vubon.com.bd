import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { TicketEscalationController } from '../../interfaces/controllers/rest/ticket-escalation.controller';
import { EscalateTicketHandler } from '../../application/commands/ticket/escalate-ticket.handler';
import { TicketEscalationService } from '../../application/services/impl/ticket-escalation.service';

@Module({
  imports: [CqrsModule],
  controllers: [TicketEscalationController],
  providers: [EscalateTicketHandler, TicketEscalationService],
  exports: [TicketEscalationService],
})
export class TicketEscalationModule {}
