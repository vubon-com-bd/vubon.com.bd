/**
 * CreateSurveyHandler
 * @module support-service/application/commands/survey
 */
import { BaseCommandHandler } from '@vubon/shared-kernel/application/commands/base.command-handler';
import { CreateSurveyCommand } from './create-survey.command';
import type { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';
import type { SurveyServiceInterface } from '../../services/interfaces/survey.service.interface';

export class CreateSurveyHandler extends BaseCommandHandler<
  CreateSurveyCommand,
  SurveyResponseDTO
> {
  readonly commandType = 'support.survey.create';

  constructor(private readonly surveyService: SurveyServiceInterface) {
    super();
  }

  async execute(command: CreateSurveyCommand): Promise<SurveyResponseDTO> {
    return this.surveyService.create(command.payload);
  }
}
