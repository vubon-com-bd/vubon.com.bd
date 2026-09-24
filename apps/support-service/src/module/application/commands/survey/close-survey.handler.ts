import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CloseSurveyCommand } from './close-survey.command';
import type { SurveyServiceInterface } from '../../services/interfaces/survey.service.interface';
import { SurveyIdVO } from '../../../domain/value-objects/primitives/survey-id.vo';

@CommandHandler(CloseSurveyCommand)
export class CloseSurveyHandler
  extends BaseCommandHandler<CloseSurveyCommand, void>
  implements ICommandHandler<CloseSurveyCommand>
{
  readonly commandType = 'support.survey.close';

  constructor(private readonly surveyService: SurveyServiceInterface) {
    super();
  }

  async execute(command: CloseSurveyCommand): Promise<void> {
    await this.surveyService.close(SurveyIdVO.create(command.surveyId));
  }
}
