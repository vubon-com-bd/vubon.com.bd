import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SurveyResponseEntity } from '../entities/survey-response.entity';
import { SurveyIdVO } from '../value-objects/primitives/survey-id.vo';

export interface SurveyResponseRepository extends BaseRepository<SurveyResponseEntity, string> {
  findBySurvey(surveyId: SurveyIdVO): Promise<readonly SurveyResponseEntity[]>;
}
