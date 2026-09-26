import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DimensionIdVO } from '../primitives/dimension-id.vo';
import { DimensionNameVO } from '../primitives/dimension-name.vo';

export interface DimensionProps {
  readonly dimensionId: DimensionIdVO;
  readonly name: DimensionNameVO;
  readonly cardinality: number;
}

export class DimensionVO extends BaseVO<DimensionProps> {
  static create(props: DimensionProps): DimensionVO {
    if (props.cardinality < 0) {
      throw new Error('Cardinality cannot be negative');
    }
    return new DimensionVO(Object.freeze({ ...props }));
  }

  private constructor(value: DimensionProps) {
    super(value);
  }

  get dimensionId(): DimensionIdVO { return this.value.dimensionId; }
  get name(): DimensionNameVO { return this.value.name; }
  get cardinality(): number { return this.value.cardinality; }

  get isHighCardinality(): boolean {
    return this.value.cardinality > 1000;
  }

  get isLowCardinality(): boolean {
    return this.value.cardinality <= 20;
  }
}
