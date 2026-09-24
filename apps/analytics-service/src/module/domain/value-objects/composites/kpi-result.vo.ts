import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { KpiIdVO } from '../primitives/kpi-id.vo';
import { KpiTargetVO } from '../primitives/kpi-target.vo';
import { ANALYTICS_STATUS } from '@vubon/shared-constants/platform/analytics';

export interface KpiResultProps {
  readonly kpiId: KpiIdVO;
  readonly actual: number;
  readonly target: KpiTargetVO;
  readonly status: string;
  readonly evaluatedAt: Date;
}

export class KpiResultVO extends BaseVO<KpiResultProps> {
  static create(props: KpiResultProps): KpiResultVO {
    return new KpiResultVO(Object.freeze({ ...props }));
  }

  private constructor(value: KpiResultProps) {
    super(value);
  }

  get kpiId(): KpiIdVO { return this.value.kpiId; }
  get actual(): number { return this.value.actual; }
  get target(): KpiTargetVO { return this.value.target; }
  get status(): string { return this.value.status; }
  get evaluatedAt(): Date { return this.value.evaluatedAt; }

  get achievementPercent(): number {
    return this.value.target.getAchievementPercent(this.value.actual);
  }

  get variance(): number {
    return this.value.actual - this.value.target.numeric;
  }

  get isAchieved(): boolean {
    return this.value.target.isAchieved(this.value.actual);
  }

  get isBreached(): boolean {
    return this.value.status === ANALYTICS_STATUS.FAILED;
  }
}
