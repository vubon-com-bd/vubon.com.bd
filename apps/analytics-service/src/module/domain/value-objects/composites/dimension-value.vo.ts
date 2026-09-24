import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DimensionValueVO as DimValuePrimitive } from '../primitives/dimension-value.vo';

export interface DimensionValueProps {
  readonly dimensionName: string;
  readonly dimensionValue: DimValuePrimitive;
  readonly frequency: number;
}

export class DimensionValueCompositeVO extends BaseVO<DimensionValueProps> {
  static create(props: DimensionValueProps): DimensionValueCompositeVO {
    if (props.frequency < 0) {
      throw new Error('Frequency cannot be negative');
    }
    return new DimensionValueCompositeVO(Object.freeze({ ...props }));
  }

  private constructor(value: DimensionValueProps) {
    super(value);
  }

  get dimensionName(): string { return this.value.dimensionName; }
  get dimensionValue(): DimValuePrimitive { return this.value.dimensionValue; }
  get frequency(): number { return this.value.frequency; }

  isFrequent(threshold = 100): boolean {
    return this.value.frequency >= threshold;
  }
}
