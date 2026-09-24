import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSurveyResponsesQuery } from './list-survey-responses.query';
import type { SurveyResponseRepository } from '../../../domain/repositories/survey-response.repository.interface';
import { SurveyIdVO } from '../../../domain/value-objects/primitives/survey-id.vo';
import type { SurveyAnswerResponseDTO } from '../../dtos/responses/survey-response.dto';

@QueryHandler(ListSurveyResponsesQuery)
export class ListSurveyResponsesHandler
  extends BaseQueryHandler<ListSurveyResponsesQuery, readonly SurveyAnswerResponseDTO[]>
  implements IQueryHandler<ListSurveyResponsesQuery>
{
  readonly queryType = 'support.survey.responses.list';

  constructor(private readonly responseRepo: SurveyResponseRepository) {
    super();
  }

  async execute(query: ListSurveyResponsesQuery): Promise<readonly SurveyAnswerResponseDTO[]> {
    const responses = await this.responseRepo.findBySurvey(SurveyIdVO.create(query.surveyId));
    return responses.map((r) => ({
      surveyId: r.surveyId.value,
      userId: r.userId.value,
      answers: r.answers,
      submittedAt: r.createdAt,
    }));
  }
}
