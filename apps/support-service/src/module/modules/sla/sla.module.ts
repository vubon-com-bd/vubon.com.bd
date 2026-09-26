/**
 * SlaModule
 * @module support-service/modules/sla
 */
import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SlaService } from '../../application/services/impl/sla.service';
import { SlaMapper } from '../../application/mappers/sla.mapper';
import { CreateSlaHandler } from '../../application/commands/sla/create-sla.handler';
import { UpdateSlaHandler } from '../../application/commands/sla/update-sla.handler';
import { TickSlaHandler } from '../../application/commands/sla/tick-sla.handler';
import { GetSlaHandler } from '../../application/queries/sla/get-sla.handler';
import { ListSlaByTicketHandler } from '../../application/queries/sla/list-sla-by-ticket.handler';
import { SlaController } from '../../interfaces/controllers/rest/sla.controller';
import { SlaControllerMapper } from '../../interfaces/mappers/sla.controller.mapper';

@Module({
  imports: [CqrsModule],
  controllers: [SlaController],
  providers: [
    SlaService,
    SlaMapper,
    SlaControllerMapper,
    CreateSlaHandler,
    UpdateSlaHandler,
    TickSlaHandler,
    GetSlaHandler,
    ListSlaByTicketHandler,
  ],
  exports: [SlaService],
})
export class SlaModule {}
