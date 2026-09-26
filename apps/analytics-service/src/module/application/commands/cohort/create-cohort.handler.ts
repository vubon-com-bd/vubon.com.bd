import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateCohortCommand } from './create-cohort.command';
import type { CohortServiceInterface } from '../../services/interfaces/cohort.service.interface';
import type { CohortResponseDTO } from '../../dtos/responses';

@CommandHandler(CreateCohortCommand)
export class CreateCohortHandler
  extends BaseCommandHandler<CreateCohortCommand, CohortResponseDTO>
  implements ICommandHandler<CreateCohortCommand>
{
  readonly commandType = 'analytics.cohort.create';

  constructor(private readonly cohortService: CohortServiceInterface) {
    super();
  }

  async execute(command: CreateCohortCommand): Promise<CohortResponseDTO> {
    return this.cohortService.create({
      name: command.name,
      period: command.period as never,
      fromDate: command.fromDate,
      toDate: command.toDate,
      userIds: [...command.userIds],
    });
  }
}
