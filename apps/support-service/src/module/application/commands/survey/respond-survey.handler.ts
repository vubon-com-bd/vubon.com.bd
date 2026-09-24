import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RespondSurveyCommand } from './respond-survey.command';
import type { SurveyResponseServiceInterface } from '../../services/interfaces/survey-response.service.interface';

@CommandHandler(RespondSurveyCommand)
export class RespondSurveyHandler
  extends BaseCommandHandler<RespondSurveyCommand, { id: string }>
  implements ICommandHandler<RespondSurveyCommand>
{
  readonly commandType = 'support.survey.respond';

  constructor(private readonly responseService: SurveyResponseServiceInterface) {
    super();
  }

  async execute(command: RespondSurveyCommand): Promise<{ id: string }> {
    return this.responseService.respond({
      surveyId: command.surveyId,
      userId: command.userId,
      answers: command.answers,
    });
  }
}
