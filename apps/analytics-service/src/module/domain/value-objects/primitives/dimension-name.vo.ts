import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives/name.vo';
import { ANALYTICS_DIMENSION } from '@vubon/shared-constants/platform/analytics';

const VALID_DIMENSIONS = new Set<string>(Object.values(ANALYTICS_DIMENSION));

export class DimensionNameVO extends BaseNameVO {
  static create(raw: string): DimensionNameVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_DIMENSIONS.has(normalized)) {
      throw new Error(`Invalid dimension name: ${raw}`);
    }
    return new DimensionNameVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get isTimeDimension(): boolean {
    return ['date', 'hour', 'day', 'week', 'month', 'quarter', 'year']
      .includes(this.value);
  }

  get isGeoDimension(): boolean {
    return ['country', 'city', 'region'].includes(this.value);
  }

  get isTechDimension(): boolean {
    return ['device', 'browser', 'os', 'language'].includes(this.value);
  }
}
