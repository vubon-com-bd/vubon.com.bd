/**
 * Dimension Value Object (Composite)
 * @module analytics-service/domain/value-objects/composites
 *
 * Analytics dimension with name + value + data type।
 * Business Rule:
 * - Name canonical/custom
 * - Value type consistent with dimension type
 * - Temporal dimension value must be ISO date/datetime
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base';
import { DimensionIdVO } from '../primitives/dimension-id.vo.js';
import { DimensionNameVO } from '../primitives/dimension-name.vo.js';
import { DimensionValueVO } from '../primitives/dimension-value.vo.js';

export interface DimensionVOProps {
  readonly id: DimensionIdVO;
  readonly name: DimensionNameVO;
  readonly value: DimensionValueVO;
}

export class DimensionVO extends BaseVO<DimensionVOProps> {
  private constructor(props: DimensionVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: DimensionVOProps): DimensionVO {
    if (!props.id || !props.name || !props.value) {
      throw new Error('DimensionVO requires id, name, value');
    }

    // Temporal dimension → value must be ISO-like
    if (props.name.isTemporal()) {
      const v = props.value.value;
      if (!/^\d{4}(-\d{2}){0,2}(T\d{2}:\d{2}:\d{2}(\.\d+)?Z?)?$/.test(v)) {
        throw new Error(
          `Temporal dimension "${props.name.value}" value must be ISO-like, got "${v}"`
        );
      }
    }

    return new DimensionVO(props);
  }

  get id(): DimensionIdVO {
    return this.value.id;
  }

  get name(): DimensionNameVO {
    return this.value.name;
  }

  isTemporal(): boolean {
    return this.name.isTemporal();
  }

  isGeographic(): boolean {
    return this.name.isGeographic();
  }

  isTechnical(): boolean {
    return this.name.isTechnical();
  }

  isTraffic(): boolean {
    return this.name.isTraffic();
  }

  isBusiness(): boolean {
    return this.name.isBusiness();
  }

  /** Same dimension name কিনা */
  sameNameAs(other: DimensionVO): boolean {
    return this.name.equals(other.name);
  }

  /** Numeric value কিনা */
  isNumeric(): boolean {
    return this.value.value.toNumber() !== null;
  }

  /** Numeric value extract */
  toNumber(): number | null {
    return this.value.value.toNumber();
  }
}
