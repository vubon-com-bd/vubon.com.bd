import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { DimensionIdVO } from '../value-objects/primitives/dimension-id.vo';
import { DimensionValueVO } from '../value-objects/primitives/dimension-value.vo';

export interface DimensionValueEntityProps {
  readonly dimensionId: DimensionIdVO;
  readonly value: DimensionValueVO;
  readonly frequency: number;
}

export class DimensionValueEntity extends BaseEntity<string> {
  private readonly _dimensionId: DimensionIdVO;
  private readonly _value: DimensionValueVO;
  private readonly _frequency: number;

  private constructor(
    id: string,
    props: DimensionValueEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._dimensionId = props.dimensionId;
    this._value = props.value;
    this._frequency = props.frequency;
  }

  static create(props: DimensionValueEntityProps): DimensionValueEntity {
    if (props.frequency < 0) {
      throw new Error('Frequency cannot be negative');
    }
    const now = new Date().toISOString();
    return new DimensionValueEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: DimensionValueEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): DimensionValueEntity {
    return new DimensionValueEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get dimensionId(): DimensionIdVO { return this._dimensionId; }
  get value(): DimensionValueVO { return this._value; }
  get frequency(): number { return this._frequency; }
}
