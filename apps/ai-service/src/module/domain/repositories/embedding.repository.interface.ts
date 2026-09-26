import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { EmbeddingEntity } from '../entities/embedding.entity';
import { EmbeddingIdVO } from '../value-objects/primitives/embedding-id.vo';

export interface EmbeddingRepository
  extends BaseRepository<EmbeddingEntity, EmbeddingIdVO> {
  findBySource(
    sourceId: string,
    sourceType: string,
  ): Promise<readonly EmbeddingEntity[]>;
  findByModel(model: string): Promise<readonly EmbeddingEntity[]>;
  findUnindexed(): Promise<readonly EmbeddingEntity[]>;
}
