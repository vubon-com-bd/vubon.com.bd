import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MetricValueVO } from '../primitives/metric-value.vo';

export interface AnalyticsSummaryProps {
  readonly totalUsers: MetricValueVO;
  readonly activeUsers: MetricValueVO;
  readonly totalSessions: MetricValueVO;
  readonly totalRevenue: MetricValueVO;
  readonly conversionRate: MetricValueVO;
}

export class AnalyticsSummaryVO extends BaseVO<AnalyticsSummaryProps> {
  static create(props: AnalyticsSummaryProps): AnalyticsSummaryVO {
    return new AnalyticsSummaryVO(Object.freeze({ ...props }));
  }

  private constructor(value: AnalyticsSummaryProps) {
    super(value);
  }

  get totalUsers(): MetricValueVO { return this.value.totalUsers; }
  get activeUsers(): MetricValueVO { return this.value.activeUsers; }
  get totalSessions(): MetricValueVO { return this.value.totalSessions; }
  get totalRevenue(): MetricValueVO { return this.value.totalRevenue; }
  get conversionRate(): MetricValueVO { return this.value.conversionRate; }

  get avgSessionsPerUser(): MetricValueVO {
    if (this.value.totalUsers.isZero) {
      return MetricValueVO.create(0);
    }
    return MetricValueVO.create(
      this.value.totalSessions.numeric / this.value.totalUsers.numeric,
    );
  }

  get revenuePerUser(): MetricValueVO {
    if (this.value.totalUsers.isZero) {
      return MetricValueVO.create(0);
    }
    return MetricValueVO.create(
      this.value.totalRevenue.numeric / this.value.totalUsers.numeric,
    );
  }

  get activeUserRatio(): number {
    if (this.value.totalUsers.isZero) return 0;
    return (this.value.activeUsers.numeric / this.value.totalUsers.numeric) * 100;
  }
}
