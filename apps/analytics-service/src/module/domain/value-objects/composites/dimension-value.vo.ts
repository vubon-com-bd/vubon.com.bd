/**
 * Dimension Value Composite VO
 * @module analytics-service/domain/value-objects/composites
 *
 * Named dimension value pair (for GROUP BY results)।
 * Business Rule:
 * - Name + value pair for analytics GROUP BY output
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { DimensionNameVO } from '../primitives/dimension-name.vo.js';
import { DimensionValueVO } from '../primitives/dimension-value.vo.js';

export interface DimensionValueCompositeVOProps {
  readonly dimension: DimensionNameVO;
  readonly value: DimensionValueVO;
}

export class DimensionValueCompositeVO extends BaseVO<DimensionValueCompositeVOProps> {
  private constructor(props: DimensionValueCompositeVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: DimensionValueCompositeVOProps): DimensionValueCompositeVO {
    if (!props.dimension || !props.value) {
      throw new Error('DimensionValueCompositeVO requires dimension, value');
    }
    return new DimensionValueCompositeVO(props);
  }

  get dimension(): DimensionNameVO {
    return this.value.dimension;
  }

  /** Composite key for grouping */
  key(): string {
    return `${this.dimension.value}:${this.value.value}`;
  }

  sameAs(other: DimensionValueCompositeVO): boolean {
    return this.key() === other.key();
  }
}
