import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { SurveyEntity } from '../entities/survey.entity';
import { SurveyIdVO } from '../value-objects/primitives/survey-id.vo';
import { SurveyTypeVO } from '../value-objects/primitives/survey-type.vo';

export interface SurveyRepository extends BaseRepository<SurveyEntity, SurveyIdVO> {
  findActive(): Promise<readonly SurveyEntity[]>;
  findByType(type: SurveyTypeVO): Promise<readonly SurveyEntity[]>;
}
