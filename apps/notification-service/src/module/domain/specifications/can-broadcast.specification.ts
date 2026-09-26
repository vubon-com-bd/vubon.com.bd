import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { BroadcastEntity } from '../entities/broadcast.entity';

export class CanBroadcastSpecification extends Specification<BroadcastEntity> {
  isSatisfiedBy(candidate: BroadcastEntity): boolean {
    if (candidate.status.value === 'completed') return false;
    if (candidate.status.value === 'cancelled') return false;
    return true;
  }
}
