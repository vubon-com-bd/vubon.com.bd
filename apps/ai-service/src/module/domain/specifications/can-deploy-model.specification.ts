import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { ModelEntity } from '../entities/model.entity';

export class CanDeployModelSpecification extends Specification<ModelEntity> {
  isSatisfiedBy(candidate: ModelEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (!candidate.status.canDeploy()) return false;
    if (!candidate.metrics?.isProductionReady()) return false;
    if (candidate.endpoint === null) return false;
    return true;
  }
}
