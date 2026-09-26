import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { VectorIdVO } from '../value-objects/primitives/vector-id.vo';
import { VectorNameVO } from '../value-objects/primitives/vector-name.vo';
import { VectorDimensionVO } from '../value-objects/primitives/vector-dimension.vo';
import { VectorIndexEntity } from './vector-index.entity';

export interface VectorEntityProps {
  readonly name: VectorNameVO;
  readonly dimension: VectorDimensionVO;
  readonly values: readonly number[];
  readonly index: VectorIndexEntity | null;
  readonly metadata: Readonly<Record<string, string | number | boolean>>;
}

export class VectorEntity extends AggregateRoot<VectorIdVO> {
  private readonly _name: VectorNameVO;
  private readonly _dimension: VectorDimensionVO;
  private readonly _values: readonly number[];
  private readonly _index: VectorIndexEntity | null;
  private readonly _metadata: Readonly<Record<string, string | number | boolean>>;

  private constructor(
    id: VectorIdVO,
    props: VectorEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._dimension = props.dimension;
    this._values = Object.freeze([...props.values]);
    this._index = props.index;
    this._metadata = Object.freeze({ ...props.metadata });
  }

  static create(props: VectorEntityProps): VectorEntity {
    if (props.values.length !== props.dimension.value) {
      throw new Error(
        `Vector: values length (${props.values.length}) != dimension (${props.dimension.value})`,
      );
    }
    const now = new Date().toISOString();
    const id = VectorIdVO.create(crypto.randomUUID());
    return new VectorEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: VectorIdVO,
    props: VectorEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VectorEntity {
    return new VectorEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get magnitude(): number {
    return Math.sqrt(this._values.reduce((sum, v) => sum + v * v, 0));
  }

  isNormalized(): boolean {
    return Math.abs(this.magnitude - 1) < 1e-6;
  }

  isIndexed(): boolean {
    return this._index !== null && this._index.isReady();
  }

  get name(): VectorNameVO { return this._name; }
  get dimension(): VectorDimensionVO { return this._dimension; }
  get values(): readonly number[] { return this._values; }
  get index(): VectorIndexEntity | null { return this._index; }
  get metadata(): Readonly<Record<string, string | number | boolean>> { return this._metadata; }
}
