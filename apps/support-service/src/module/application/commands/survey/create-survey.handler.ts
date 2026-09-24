import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateSurveyCommand } from './create-survey.command';
import type { SurveyServiceInterface } from '../../services/interfaces/survey.service.interface';
import type { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';

@CommandHandler(CreateSurveyCommand)
export class CreateSurveyHandler
  extends BaseCommandHandler<CreateSurveyCommand, SurveyResponseDTO>
  implements ICommandHandler<CreateSurveyCommand>
{
  readonly commandType = 'support.survey.create';

  constructor(private readonly surveyService: SurveyServiceInterface) {
    super();
  }

  async execute(command: CreateSurveyCommand): Promise<SurveyResponseDTO> {
    return this.surveyService.create({
      title: command.title,
      type: command.type_,
      questions: command.questions as never,
    });
  }
}
