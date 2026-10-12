import { CohortService } from '../../services/impl/cohort.service.js';
import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands';
import { AnalyzeCohortCommand } from './analyze-cohort.command.js';
import type { CohortAnalysisResponseData } from '../../dtos/responses/cohort-analysis-response.dto.js';

@Injectable()
@CommandHandler(AnalyzeCohortCommand)
export class AnalyzeCohortHandler extends BaseCommandHandler<AnalyzeCohortCommand, CohortAnalysisResponseData>
  implements ICommandHandler<AnalyzeCohortCommand> {
  readonly commandType = 'analytics.cohort.analyze';
  constructor(private readonly service: CohortService) { super(); }
  async execute(command: AnalyzeCohortCommand): Promise<CohortAnalysisResponseData> {
    return this.service.analyze(command.cohortId, command.payload.maxPeriods ?? 12);
  }
}
