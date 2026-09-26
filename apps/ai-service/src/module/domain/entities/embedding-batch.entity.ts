import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { EmbeddingIdVO } from '../value-objects/primitives/embedding-id.vo';
import { EmbeddingBatchVO } from '../value-objects/composites/embedding-batch.vo';

export interface EmbeddingBatchEntityProps {
  readonly embeddingId: EmbeddingIdVO;
  readonly batch: EmbeddingBatchVO;
}

export class EmbeddingBatchEntity extends BaseEntity<EmbeddingIdVO> {
  private readonly _embeddingId: EmbeddingIdVO;
  private readonly _batch: EmbeddingBatchVO;

  private constructor(
    id: EmbeddingIdVO,
    props: EmbeddingBatchEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._embeddingId = props.embeddingId;
    this._batch = props.batch;
  }

  static create(props: EmbeddingBatchEntityProps): EmbeddingBatchEntity {
    const now = new Date().toISOString();
    return new EmbeddingBatchEntity(props.embeddingId, props, now, now, null);
  }

  static reconstitute(
    id: EmbeddingIdVO,
    props: EmbeddingBatchEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): EmbeddingBatchEntity {
    return new EmbeddingBatchEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  size(): number {
    return this._batch.size();
  }

  get embeddingId(): EmbeddingIdVO { return this._embeddingId; }
  get batch(): EmbeddingBatchVO { return this._batch; }
}
