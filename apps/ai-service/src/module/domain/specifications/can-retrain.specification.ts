import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ModelEntity } from '../entities/model.entity';

export class CanRetrainSpecification extends Specification<ModelEntity> {
  isSatisfiedBy(candidate: ModelEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.status.isTraining()) return false;
    if (candidate.status.isDeployed()) return true;
    if (candidate.status.isDeprecated()) return true;
    return false;
  }
}
