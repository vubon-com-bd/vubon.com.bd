import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { EmbeddingIdVO } from '../primitives/embedding-id.vo';

export interface EmbeddingBatchItemProps {
  readonly sourceId: string;
  readonly vector: readonly number[];
}

export interface EmbeddingBatchProps {
  readonly items: readonly EmbeddingBatchItemProps[];
  readonly dimension: number;
}

export class EmbeddingBatchVO extends BaseVO<EmbeddingBatchProps> {
  static create(props: EmbeddingBatchProps): EmbeddingBatchVO {
    if (props.dimension < 1) {
      throw new Error('EmbeddingBatch: dimension must be >= 1');
    }
    for (const item of props.items) {
      if (item.vector.length !== props.dimension) {
        throw new Error(
          `EmbeddingBatch: vector length mismatch (expected ${props.dimension}, got ${item.vector.length})`,
        );
      }
    }
    return new EmbeddingBatchVO(props);
  }

  private constructor(props: EmbeddingBatchProps) {
    super(
      Object.freeze({
        ...props,
        items: Object.freeze(
          props.items.map((i) => Object.freeze({ ...i, vector: Object.freeze([...i.vector]) })),
        ),
      }),
    );
  }

  get items(): readonly EmbeddingBatchItemProps[] { return this.value.items; }
  get dimension(): number { return this.value.dimension; }

  size(): number {
    return this.value.items.length;
  }
}
