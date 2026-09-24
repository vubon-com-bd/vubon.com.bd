import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { SlaController } from '../../interfaces/controllers/rest/sla.controller';
import { CreateSlaHandler } from '../../application/commands/sla/create-sla.handler';
import { UpdateSlaHandler } from '../../application/commands/sla/update-sla.handler';
import { GetSlaHandler } from '../../application/queries/sla/get-sla.handler';
import { ListSlasHandler } from '../../application/queries/sla/list-slas.handler';
import { SlaService } from '../../application/services/impl/sla.service';

const HANDLERS = [
  CreateSlaHandler,
  UpdateSlaHandler,
  GetSlaHandler,
  ListSlasHandler,
];

@Module({
  imports: [CqrsModule],
  controllers: [SlaController],
  providers: [...HANDLERS, SlaService],
  exports: [SlaService],
})
export class SlaModule {}
