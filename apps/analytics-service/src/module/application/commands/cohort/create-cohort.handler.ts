import { CohortService } from '../../services/impl/cohort.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { CreateCohortCommand } from './create-cohort.command.js';
import type { CohortResponseData } from '../../dtos/responses/cohort-response.dto.js';

@Injectable()
@CommandHandler(CreateCohortCommand)
export class CreateCohortHandler extends BaseCommandHandler<CreateCohortCommand, CohortResponseData>
  implements ICommandHandler<CreateCohortCommand> {
  readonly commandType = 'analytics.cohort.create';
  constructor(private readonly service: CohortService) { super(); }
  async execute(command: CreateCohortCommand): Promise<CohortResponseData> {
    return this.service.create(command.payload);
  }
}
