import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class KpiTargetVO extends BaseCodeVO {
  static create(value: string | number): KpiTargetVO {
    const num = typeof value === 'number' ? value : Number(value);

    if (!Number.isFinite(num)) {
      throw new Error(`KPI target must be finite: ${value}`);
    }
    if (num < 0) {
      throw new Error(`KPI target cannot be negative: ${num}`);
    }

    return new KpiTargetVO(String(num));
  }

  private constructor(value: string) {
    super(value);
  }

  get numeric(): number {
    return Number(this.value);
  }

  isAchieved(actual: number): boolean {
    return actual >= this.numeric;
  }

  getAchievementPercent(actual: number): number {
    if (this.numeric === 0) return actual > 0 ? 100 : 0;
    return (actual / this.numeric) * 100;
  }
}
