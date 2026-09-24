import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Controllers
import { TicketController } from '../../interfaces/controllers/rest/ticket.controller';

// Command Handlers
import { CreateTicketHandler } from '../../application/commands/ticket/create-ticket.handler';
import { UpdateTicketHandler } from '../../application/commands/ticket/update-ticket.handler';
import { AssignTicketHandler } from '../../application/commands/ticket/assign-ticket.handler';
import { EscalateTicketHandler } from '../../application/commands/ticket/escalate-ticket.handler';
import { ResolveTicketHandler } from '../../application/commands/ticket/resolve-ticket.handler';
import { CloseTicketHandler } from '../../application/commands/ticket/close-ticket.handler';
import { ReopenTicketHandler } from '../../application/commands/ticket/reopen-ticket.handler';
import { RateTicketHandler } from '../../application/commands/ticket/rate-ticket.handler';

// Query Handlers
import { GetTicketHandler } from '../../application/queries/ticket/get-ticket.handler';
import { ListTicketsHandler } from '../../application/queries/ticket/list-tickets.handler';
import { ListTicketsByUserHandler } from '../../application/queries/ticket/list-tickets-by-user.handler';
import { ListTicketsByStatusHandler } from '../../application/queries/ticket/list-tickets-by-status.handler';
import { ListTicketsByAgentHandler } from '../../application/queries/ticket/list-tickets-by-agent.handler';
import { GetTicketDetailHandler } from '../../application/queries/ticket/get-ticket-detail.handler';

// Sagas
import { TicketEscalationSaga } from '../../application/sagas/ticket-escalation.saga';
import { TicketAutoCloseSaga } from '../../application/sagas/ticket-auto-close.saga';

// Services
import { TicketService } from '../../application/services/impl/ticket.service';

const HANDLERS = [
  // Commands
  CreateTicketHandler,
  UpdateTicketHandler,
  AssignTicketHandler,
  EscalateTicketHandler,
  ResolveTicketHandler,
  CloseTicketHandler,
  ReopenTicketHandler,
  RateTicketHandler,
  // Queries
  GetTicketHandler,
  ListTicketsHandler,
  ListTicketsByUserHandler,
  ListTicketsByStatusHandler,
  ListTicketsByAgentHandler,
  GetTicketDetailHandler,
];

const SAGAS = [TicketEscalationSaga, TicketAutoCloseSaga];

@Module({
  imports: [CqrsModule],
  controllers: [TicketController],
  providers: [
    ...HANDLERS,
    ...SAGAS,
    TicketService,
  ],
  exports: [TicketService],
})
export class TicketModule {}
