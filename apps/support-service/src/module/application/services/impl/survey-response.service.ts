import { Injectable } from '@nestjs/common';
import type { SurveyResponseServiceInterface } from '../interfaces/survey-response.service.interface';
import type { SurveyResponseRepository } from '../../../domain/repositories/survey-response.repository.interface';
import { SurveyResponseEntity } from '../../../domain/entities/survey-response.entity';
import { SurveyIdVO } from '../../../domain/value-objects/primitives/survey-id.vo';
import { UserIdVO } from '../../../domain/value-objects/primitives/user-id.vo';
import type { RespondSurveyRequestDTO } from '../../dtos/requests/survey';

@Injectable()
export class SurveyResponseService implements SurveyResponseServiceInterface {
  constructor(private readonly responseRepo: SurveyResponseRepository) {}

  async respond(input: RespondSurveyRequestDTO): Promise<{ id: string }> {
    const entity = SurveyResponseEntity.create({
      surveyId: SurveyIdVO.create(input.surveyId),
      userId: UserIdVO.create(input.userId),
      answers: input.answers,
    });
    const saved = await this.responseRepo.save(entity);
    return { id: saved.id };
  }

  async findBySurvey(surveyId: string): Promise<readonly SurveyResponseEntity[]> {
    return this.responseRepo.findBySurvey(SurveyIdVO.create(surveyId));
  }
}
