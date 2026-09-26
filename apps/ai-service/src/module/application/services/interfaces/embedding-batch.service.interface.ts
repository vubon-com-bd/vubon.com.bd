import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { EmbeddingBatchEntity } from '../../../domain/entities/embedding-batch.entity';
import type { EmbeddingIdVO } from '../../../domain/value-objects/primitives/embedding-id.vo';

export interface EmbeddingBatchServiceInterface
  extends BaseServiceInterface<EmbeddingBatchEntity, EmbeddingIdVO> {
  findByEmbeddingId(embeddingId: string): Promise<EmbeddingBatchEntity | null>;
}
