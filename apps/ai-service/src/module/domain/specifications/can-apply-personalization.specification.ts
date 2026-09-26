import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { PersonalizationEntity } from '../entities/personalization.entity';

export class CanApplyPersonalizationSpecification
  extends Specification<PersonalizationEntity>
{
  isSatisfiedBy(candidate: PersonalizationEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (!candidate.isReady()) return false;
    if (candidate.confidence < 0.5) return false;
    return true;
  }
}
