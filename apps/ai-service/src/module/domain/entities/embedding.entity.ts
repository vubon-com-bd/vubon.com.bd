import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { EmbeddingIdVO } from '../value-objects/primitives/embedding-id.vo';
import { EmbeddingTypeVO } from '../value-objects/primitives/embedding-type.vo';
import { EmbeddingModelVO } from '../value-objects/primitives/embedding-model.vo';
import { EmbeddingDimensionVO } from '../value-objects/primitives/embedding-dimension.vo';
import { EmbeddingStatusVO } from '../value-objects/primitives/embedding-status.vo';

export interface EmbeddingEntityProps {
  readonly sourceId: string;
  readonly sourceType: string;
  readonly type: EmbeddingTypeVO;
  readonly model: EmbeddingModelVO;
  readonly dimension: EmbeddingDimensionVO;
  readonly status: EmbeddingStatusVO;
  readonly vector: readonly number[];
}

export class EmbeddingEntity extends AggregateRoot<EmbeddingIdVO> {
  private readonly _sourceId: string;
  private readonly _sourceType: string;
  private readonly _type: EmbeddingTypeVO;
  private readonly _model: EmbeddingModelVO;
  private readonly _dimension: EmbeddingDimensionVO;
  private readonly _status: EmbeddingStatusVO;
  private readonly _vector: readonly number[];

  private constructor(
    id: EmbeddingIdVO,
    props: EmbeddingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._sourceId = props.sourceId;
    this._sourceType = props.sourceType;
    this._type = props.type;
    this._model = props.model;
    this._dimension = props.dimension;
    this._status = props.status;
    this._vector = Object.freeze([...props.vector]);
  }

  static create(props: EmbeddingEntityProps): EmbeddingEntity {
    if (props.vector.length !== props.dimension.value) {
      throw new Error(
        `Embedding: vector length (${props.vector.length}) != dimension (${props.dimension.value})`,
      );
    }
    const now = new Date().toISOString();
    const id = EmbeddingIdVO.create(crypto.randomUUID());
    return new EmbeddingEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: EmbeddingIdVO,
    props: EmbeddingEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): EmbeddingEntity {
    return new EmbeddingEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markIndexed(): EmbeddingEntity {
    return new EmbeddingEntity(
      this.id,
      { ...this._toProps(), status: EmbeddingStatusVO.create('indexed') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  isIndexed(): boolean {
    return this._status.isIndexed();
  }

  get sourceId(): string { return this._sourceId; }
  get sourceType(): string { return this._sourceType; }
  get type(): EmbeddingTypeVO { return this._type; }
  get model(): EmbeddingModelVO { return this._model; }
  get dimension(): EmbeddingDimensionVO { return this._dimension; }
  get status(): EmbeddingStatusVO { return this._status; }
  get vector(): readonly number[] { return this._vector; }

  private _toProps(): EmbeddingEntityProps {
    return {
      sourceId: this._sourceId,
      sourceType: this._sourceType,
      type: this._type,
      model: this._model,
      dimension: this._dimension,
      status: this._status,
      vector: this._vector,
    };
  }
}
