import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class KpiThresholdVO extends BaseCodeVO {
  static create(value: string | number): KpiThresholdVO {
    const num = typeof value === 'number' ? value : Number(value);
    if (!Number.isFinite(num)) {
      throw new Error(`KPI threshold must be finite: ${value}`);
    }
    if (num < 0 || num > 100) {
      throw new Error(`KPI threshold must be 0-100: ${num}`);
    }
    return new KpiThresholdVO(String(num));
  }

  private constructor(value: string) {
    super(value);
  }

  get numeric(): number {
    return Number(this.value);
  }

  isBelow(actual: number, target: number): boolean {
    if (target === 0) return false;
    const achievement = (actual / target) * 100;
    return achievement < this.numeric;
  }

  isAt(actual: number, target: number): boolean {
    if (target === 0) return false;
    const achievement = (actual / target) * 100;
    return Math.abs(achievement - this.numeric) < 0.01;
  }
}
