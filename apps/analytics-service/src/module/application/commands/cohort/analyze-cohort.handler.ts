import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { AnalyzeCohortCommand } from './analyze-cohort.command';
import type { CohortServiceInterface } from '../../services/interfaces/cohort.service.interface';
import type { CohortAnalysisResponseDTO } from '../../dtos/responses';

@CommandHandler(AnalyzeCohortCommand)
export class AnalyzeCohortHandler
  extends BaseCommandHandler<AnalyzeCohortCommand, CohortAnalysisResponseDTO>
  implements ICommandHandler<AnalyzeCohortCommand>
{
  readonly commandType = 'analytics.cohort.analyze';

  constructor(private readonly cohortService: CohortServiceInterface) {
    super();
  }

  async execute(command: AnalyzeCohortCommand): Promise<CohortAnalysisResponseDTO> {
    return this.cohortService.analyze({
      cohortId: command.cohortId,
      periods: command.periods,
    });
  }
}
