import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { SurveyEntity } from '../entities/survey.entity';

export class CanTakeSurveySpecification extends Specification<SurveyEntity> {
  isSatisfiedBy(candidate: SurveyEntity): boolean {
    return candidate.status.value === 'active';
  }
}
