/**
 * TicketModule — Ticket feature wiring
 * @module support-service/modules/ticket
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// Application — Services + Mappers
import { TicketService } from '../../application/services/impl/ticket.service';
import { TicketMapper } from '../../application/mappers/ticket.mapper';

// Application — Commands
import { CreateTicketHandler } from '../../application/commands/ticket/create-ticket.handler';
import { UpdateTicketHandler } from '../../application/commands/ticket/update-ticket.handler';
import { AssignTicketHandler } from '../../application/commands/ticket/assign-ticket.handler';
import { EscalateTicketHandler } from '../../application/commands/ticket/escalate-ticket.handler';
import { ResolveTicketHandler } from '../../application/commands/ticket/resolve-ticket.handler';
import { CloseTicketHandler } from '../../application/commands/ticket/close-ticket.handler';
import { ReopenTicketHandler } from '../../application/commands/ticket/reopen-ticket.handler';
import { RateTicketHandler } from '../../application/commands/ticket/rate-ticket.handler';

// Application — Queries
import { GetTicketHandler } from '../../application/queries/ticket/get-ticket.handler';
import { GetTicketDetailHandler } from '../../application/queries/ticket/get-ticket-detail.handler';
import { ListTicketsHandler } from '../../application/queries/ticket/list-tickets.handler';
import { SearchTicketsHandler } from '../../application/queries/ticket/search-tickets.handler';
import { TicketStatsHandler } from '../../application/queries/ticket/ticket-stats.handler';

// Interfaces — Controllers + Mappers + Guards + Interceptors
import { TicketController } from '../../interfaces/controllers/rest/ticket.controller';
import { TicketControllerMapper } from '../../interfaces/mappers/ticket.controller.mapper';
import { OwnTicketGuard } from '../../interfaces/guards/own-ticket.guard';
import { TicketCacheInterceptor } from '../../interfaces/interceptors/ticket-cache.interceptor';
import { TicketValidator } from '../../interfaces/validators/ticket.validator';

@Module({
  imports: [CqrsModule],
  controllers: [TicketController],
  providers: [
    // Services
    TicketService,
    // Mappers
    TicketMapper,
    TicketControllerMapper,
    // Command handlers
    CreateTicketHandler,
    UpdateTicketHandler,
    AssignTicketHandler,
    EscalateTicketHandler,
    ResolveTicketHandler,
    CloseTicketHandler,
    ReopenTicketHandler,
    RateTicketHandler,
    // Query handlers
    GetTicketHandler,
    GetTicketDetailHandler,
    ListTicketsHandler,
    SearchTicketsHandler,
    TicketStatsHandler,
    // Guards + Interceptors + Validators
    OwnTicketGuard,
    TicketCacheInterceptor,
    TicketValidator,
  ],
  exports: [TicketService, TicketMapper],
})
export class TicketModule {}
