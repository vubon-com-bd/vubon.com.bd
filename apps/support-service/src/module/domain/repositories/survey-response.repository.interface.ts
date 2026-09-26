/**
 * SurveyResponseRepository — Repository interface
 * @module support-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SurveyResponseEntity } from '../entities/survey-response.entity';
import { SurveyIdVO } from '../value-objects/primitives/survey-id.vo';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';

export interface SurveyResponseRepository
  extends BaseRepository<SurveyResponseEntity, SurveyIdVO> {
  findBySurvey(surveyId: SurveyIdVO): Promise<readonly SurveyResponseEntity[]>;
  findByUser(userId: UserIdVO): Promise<readonly SurveyResponseEntity[]>;
  findBySurveyAndUser(surveyId: SurveyIdVO, userId: UserIdVO): Promise<SurveyResponseEntity | null>;
  countBySurvey(surveyId: SurveyIdVO): Promise<number>;
  hasUserResponded(surveyId: SurveyIdVO, userId: UserIdVO): Promise<boolean>;
}
