import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { EmbeddingIdVO } from '../primitives/embedding-id.vo';
import { EmbeddingTypeVO } from '../primitives/embedding-type.vo';
import { EmbeddingModelVO } from '../primitives/embedding-model.vo';
import { EmbeddingDimensionVO } from '../primitives/embedding-dimension.vo';
import { EmbeddingStatusVO } from '../primitives/embedding-status.vo';

export interface EmbeddingProps {
  readonly id: EmbeddingIdVO;
  readonly sourceId: string;
  readonly sourceType: string;
  readonly type: EmbeddingTypeVO;
  readonly model: EmbeddingModelVO;
  readonly dimension: EmbeddingDimensionVO;
  readonly status: EmbeddingStatusVO;
  readonly vector: readonly number[];
}

export class EmbeddingVO extends BaseVO<EmbeddingProps> {
  static create(props: EmbeddingProps): EmbeddingVO {
    if (props.vector.length !== props.dimension.value) {
      throw new Error(
        `Embedding: vector length (${props.vector.length}) != dimension (${props.dimension.value})`,
      );
    }
    return new EmbeddingVO(props);
  }

  private constructor(props: EmbeddingProps) {
    super(
      Object.freeze({
        ...props,
        vector: Object.freeze([...props.vector]),
      }),
    );
  }

  get id(): EmbeddingIdVO { return this.value.id; }
  get sourceId(): string { return this.value.sourceId; }
  get sourceType(): string { return this.value.sourceType; }
  get type(): EmbeddingTypeVO { return this.value.type; }
  get model(): EmbeddingModelVO { return this.value.model; }
  get dimension(): EmbeddingDimensionVO { return this.value.dimension; }
  get status(): EmbeddingStatusVO { return this.value.status; }
  get vector(): readonly number[] { return this.value.vector; }

  isIndexed(): boolean {
    return this.value.status.isIndexed();
  }
}
