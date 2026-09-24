import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { BaseQueryHandler } from '@vubon/shared-kernel/application/queries/base.query-handler';
import { GetSurveyQuery } from './get-survey.query';
import type { SurveyRepository } from '../../../domain/repositories/survey.repository.interface';
import { SurveyIdVO } from '../../../domain/value-objects/primitives/survey-id.vo';
import { SurveyNotFoundError } from '../../errors/survey.errors';
import type { SurveyResponseDTO } from '../../dtos/responses/survey-response.dto';

@QueryHandler(GetSurveyQuery)
export class GetSurveyHandler
  extends BaseQueryHandler<GetSurveyQuery, SurveyResponseDTO>
  implements IQueryHandler<GetSurveyQuery>
{
  readonly queryType = 'support.survey.get';

  constructor(private readonly surveyRepo: SurveyRepository) {
    super();
  }

  async execute(query: GetSurveyQuery): Promise<SurveyResponseDTO> {
    const s = await this.surveyRepo.findById(SurveyIdVO.create(query.surveyId));
    if (!s) throw new SurveyNotFoundError(query.surveyId);
    return {
      id: s.id.value,
      title: s.title,
      type: s.type.value,
      status: s.status.value,
      questions: s.questions,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
    };
  }
}
