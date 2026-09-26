import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';

const VALID_UNITS = new Set<string>([
  'count', 'percentage', 'currency', 'seconds', 'minutes',
  'hours', 'days', 'bytes', 'kb', 'mb', 'gb', 'ratio', 'score',
]);

export class MetricUnitVO extends BaseTypeVO<string> {
  static create(raw: string): MetricUnitVO {
    const normalized = raw.trim().toLowerCase();
    if (!VALID_UNITS.has(normalized)) {
      throw new Error(`Invalid metric unit: ${raw}`);
    }
    return new MetricUnitVO(normalized);
  }

  private constructor(value: string) {
    super(value);
  }

  get isTime(): boolean {
    return ['seconds', 'minutes', 'hours', 'days'].includes(this.value);
  }

  get isSize(): boolean {
    return ['bytes', 'kb', 'mb', 'gb'].includes(this.value);
  }

  get isPercentage(): boolean {
    return this.value === 'percentage';
  }

  convertTo(target: MetricUnitVO, value: number): number {
    if (this.isTime && target.isTime) {
      const timeMap: Record<string, number> = {
        seconds: 1, minutes: 60, hours: 3600, days: 86400,
      };
      const fromFactor = timeMap[this.value];
      const toFactor = timeMap[target.value];
      if (fromFactor === undefined || toFactor === undefined) {
        throw new Error(`Unsupported time unit conversion`);
      }
      return (value * fromFactor) / toFactor;
    }
    throw new Error(`Cannot convert ${this.value} to ${target.value}`);
  }
}
