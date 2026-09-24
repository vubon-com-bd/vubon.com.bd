import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class MetricValueVO extends BaseCodeVO {
  private static readonly MIN = -1e15;
  private static readonly MAX = 1e15;

  static create(value: string | number): MetricValueVO {
    const num = typeof value === 'number' ? value : Number(value);

    if (!Number.isFinite(num)) {
      throw new Error(`MetricValue must be finite: ${value}`);
    }
    if (num < MetricValueVO.MIN || num > MetricValueVO.MAX) {
      throw new Error(`MetricValue out of range: ${num}`);
    }

    return new MetricValueVO(String(num));
  }

  private constructor(value: string) {
    super(value);
  }

  get numeric(): number {
    return Number(this.value);
  }

  get isZero(): boolean {
    return this.numeric === 0;
  }

  get isPositive(): boolean {
    return this.numeric > 0;
  }

  get isNegative(): boolean {
    return this.numeric < 0;
  }

  add(other: MetricValueVO): MetricValueVO {
    return MetricValueVO.create(this.numeric + other.numeric);
  }

  subtract(other: MetricValueVO): MetricValueVO {
    return MetricValueVO.create(this.numeric - other.numeric);
  }

  multiply(factor: number): MetricValueVO {
    return MetricValueVO.create(this.numeric * factor);
  }

  percentageOf(total: MetricValueVO): number {
    const t = total.numeric;
    if (t === 0) return 0;
    return (this.numeric / t) * 100;
  }

  round(decimals = 2): MetricValueVO {
    const factor = Math.pow(10, decimals);
    return MetricValueVO.create(Math.round(this.numeric * factor) / factor);
  }
}
