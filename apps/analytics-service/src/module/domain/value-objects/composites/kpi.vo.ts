import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { KpiIdVO } from '../primitives/kpi-id.vo';
import { KpiNameVO } from '../primitives/kpi-name.vo';
import { KpiTargetVO } from '../primitives/kpi-target.vo';
import { KpiThresholdVO } from '../primitives/kpi-threshold.vo';

export interface KpiProps {
  readonly kpiId: KpiIdVO;
  readonly name: KpiNameVO;
  readonly target: KpiTargetVO;
  readonly threshold: KpiThresholdVO;
  readonly metricName: string;
}

export class KpiVO extends BaseVO<KpiProps> {
  static create(props: KpiProps): KpiVO {
    return new KpiVO(Object.freeze({ ...props }));
  }

  private constructor(value: KpiProps) {
    super(value);
  }

  get kpiId(): KpiIdVO { return this.value.kpiId; }
  get name(): KpiNameVO { return this.value.name; }
  get target(): KpiTargetVO { return this.value.target; }
  get threshold(): KpiThresholdVO { return this.value.threshold; }
  get metricName(): string { return this.value.metricName; }

  isAchieved(actual: number): boolean {
    return this.value.target.isAchieved(actual);
  }

  isBelowThreshold(actual: number): boolean {
    return this.value.threshold.isBelow(actual, this.value.target.numeric);
  }

  getAchievement(actual: number): number {
    return this.value.target.getAchievementPercent(actual);
  }

  getStatus(actual: number): 'achieved' | 'below' | 'at' {
    if (this.isAchieved(actual)) return 'achieved';
    if (this.isBelowThreshold(actual)) return 'below';
    return 'at';
  }
}
