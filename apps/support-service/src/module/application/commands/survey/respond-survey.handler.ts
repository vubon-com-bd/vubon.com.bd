/**
 * RespondSurveyHandler
 * @module support-service/application/commands/survey
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { RespondSurveyCommand } from './respond-survey.command';
import type { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';
import type { SurveyServiceInterface } from '../../services/interfaces/survey.service.interface';

export class RespondSurveyHandler extends BaseCommandHandler<
  RespondSurveyCommand,
  SurveyResponseDTO
> {
  readonly commandType = 'support.survey.respond';

  constructor(private readonly surveyService: SurveyServiceInterface) {
    super();
  }

  async execute(command: RespondSurveyCommand): Promise<SurveyResponseDTO> {
    return this.surveyService.respond(command.payload);
  }
}
