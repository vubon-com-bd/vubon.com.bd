/**
 * CloseSurveyHandler
 * @module support-service/application/commands/survey
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CloseSurveyCommand } from './close-survey.command';
import type { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';
import type { SurveyServiceInterface } from '../../services/interfaces/survey.service.interface';

export class CloseSurveyHandler extends BaseCommandHandler<
  CloseSurveyCommand,
  SurveyResponseDTO
> {
  readonly commandType = 'support.survey.close';

  constructor(private readonly surveyService: SurveyServiceInterface) {
    super();
  }

  async execute(command: CloseSurveyCommand): Promise<SurveyResponseDTO> {
    return this.surveyService.close(command.payload);
  }
}
