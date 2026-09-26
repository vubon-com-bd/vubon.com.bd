import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { EventEntity } from '../entities/event.entity';

export class CanRecordEventSpecification extends Specification<EventEntity> {
  constructor(private readonly maxPayloadBytes = 64 * 1024) {
    super();
  }

  isSatisfiedBy(candidate: EventEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.payload.sizeBytes > this.maxPayloadBytes) return false;
    if (candidate.timestamp.epochMs > Date.now() + 60_000) return false;
    return true;
  }
}
