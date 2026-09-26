import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { EmbeddingBatchEntity } from '../entities/embedding-batch.entity';
import { EmbeddingIdVO } from '../value-objects/primitives/embedding-id.vo';

export interface EmbeddingBatchRepository
  extends BaseRepository<EmbeddingBatchEntity, EmbeddingIdVO> {
  findByEmbeddingId(embeddingId: EmbeddingIdVO): Promise<EmbeddingBatchEntity | null>;
}
