/**
 * GetSurveyHandler
 * @module support-service/application/queries/survey
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSurveyQuery } from './get-survey.query';
import type { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';
import type { SurveyServiceInterface } from '../../services/interfaces/survey.service.interface';

export class GetSurveyHandler extends BaseQueryHandler<
  GetSurveyQuery,
  SurveyResponseDTO
> {
  readonly queryType = 'support.survey.get';

  constructor(private readonly surveyService: SurveyServiceInterface) {
    super();
  }

  async execute(query: GetSurveyQuery): Promise<SurveyResponseDTO> {
    return this.surveyService.getById(query.surveyId);
  }
}
