import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { ListSurveysQuery } from './list-surveys.query';
import type { SurveyRepository } from '../../../domain/repositories/survey.repository.interface';
import type { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';

@QueryHandler(ListSurveysQuery)
export class ListSurveysHandler
  extends BaseQueryHandler<ListSurveysQuery, readonly SurveyResponseDTO[]>
  implements IQueryHandler<ListSurveysQuery>
{
  readonly queryType = 'support.survey.list';

  constructor(private readonly surveyRepo: SurveyRepository) {
    super();
  }

  async execute(_query: ListSurveysQuery): Promise<readonly SurveyResponseDTO[]> {
    const surveys = await this.surveyRepo.findAll();
    return surveys.map((s) => ({
      id: s.id.value,
      title: s.title,
      type: s.type.value,
      status: s.status.value,
      questions: s.questions,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    }));
  }
}
