import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { VectorIdVO } from '../value-objects/primitives/vector-id.vo';
import { VectorIndexTypeVO } from '../value-objects/primitives/vector-index-type.vo';
import { VectorNameVO } from '../value-objects/primitives/vector-name.vo';
import { VectorStatusVO } from '../value-objects/primitives/vector-status.vo';

export interface VectorIndexEntityProps {
  readonly name: VectorNameVO;
  readonly type: VectorIndexTypeVO;
  readonly dimension: number;
  readonly provider: string;
  readonly status: VectorStatusVO;
  readonly entryCount: number;
}

export class VectorIndexEntity extends AggregateRoot<VectorIdVO> {
  private readonly _name: VectorNameVO;
  private readonly _type: VectorIndexTypeVO;
  private readonly _dimension: number;
  private readonly _provider: string;
  private readonly _status: VectorStatusVO;
  private readonly _entryCount: number;

  private constructor(
    id: VectorIdVO,
    props: VectorIndexEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._dimension = props.dimension;
    this._provider = props.provider;
    this._status = props.status;
    this._entryCount = props.entryCount;
  }

  static create(props: VectorIndexEntityProps): VectorIndexEntity {
    if (props.dimension < 1) {
      throw new Error('VectorIndex: dimension must be >= 1');
    }
    const now = new Date().toISOString();
    const id = VectorIdVO.create(crypto.randomUUID());
    return new VectorIndexEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: VectorIdVO,
    props: VectorIndexEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): VectorIndexEntity {
    return new VectorIndexEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markReady(): VectorIndexEntity {
    return new VectorIndexEntity(
      this.id,
      { ...this._toProps(), status: VectorStatusVO.create('ready') },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  withEntryCount(count: number): VectorIndexEntity {
    if (count < 0) {
      throw new Error('VectorIndex: entryCount cannot be negative');
    }
    return new VectorIndexEntity(
      this.id,
      { ...this._toProps(), entryCount: count },
      this.createdAt,
      new Date().toISOString(),
      this.deletedAt ?? null,
    );
  }

  isReady(): boolean {
    return this._status.isReady();
  }

  isEmpty(): boolean {
    return this._entryCount === 0;
  }

  get name(): VectorNameVO { return this._name; }
  get type(): VectorIndexTypeVO { return this._type; }
  get dimension(): number { return this._dimension; }
  get provider(): string { return this._provider; }
  get status(): VectorStatusVO { return this._status; }
  get entryCount(): number { return this._entryCount; }

  private _toProps(): VectorIndexEntityProps {
    return {
      name: this._name,
      type: this._type,
      dimension: this._dimension,
      provider: this._provider,
      status: this._status,
      entryCount: this._entryCount,
    };
  }
}
