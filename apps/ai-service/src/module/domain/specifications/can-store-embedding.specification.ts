import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { EmbeddingEntity } from '../entities/embedding.entity';

export class CanStoreEmbeddingSpecification
  extends Specification<EmbeddingEntity>
{
  isSatisfiedBy(candidate: EmbeddingEntity): boolean {
    if (candidate.isDeleted()) return false;
    if (candidate.vector.length === 0) return false;
    if (candidate.vector.length !== candidate.dimension.value) return false;
    for (const v of candidate.vector) {
      if (!Number.isFinite(v)) return false;
    }
    return true;
  }
}
