/**
 * ListSurveysHandler
 * @module support-service/application/queries/survey
 */
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSurveysQuery } from './list-surveys.query';
import type { SurveyListResponseDTO } from '../../dtos/responses/survey-list-response.dto';
import type { SurveyServiceInterface } from '../../services/interfaces/survey.service.interface';

export class ListSurveysHandler extends BaseQueryHandler<
  ListSurveysQuery,
  SurveyListResponseDTO
> {
  readonly queryType = 'support.survey.list';

  constructor(private readonly surveyService: SurveyServiceInterface) {
    super();
  }

  async execute(query: ListSurveysQuery): Promise<SurveyListResponseDTO> {
    return this.surveyService.list(query.page, query.limit);
  }
}
