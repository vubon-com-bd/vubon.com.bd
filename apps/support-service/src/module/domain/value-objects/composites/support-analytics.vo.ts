import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface SupportAnalyticsProps {
  readonly metric: string;
  readonly period: string;
  readonly metricValue: number;
  readonly previousValue: number | null;
  readonly trend: 'up' | 'down' | 'flat';
  readonly computedAt: Date;
}

export class SupportAnalyticsVO extends BaseVO<SupportAnalyticsProps> {
  private constructor(props: SupportAnalyticsProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SupportAnalyticsProps): SupportAnalyticsVO {
    return new SupportAnalyticsVO(props);
  }

  get metric(): string { return this.value.metric; }
  get period(): string { return this.value.period; }
  get metricValue(): number { return this.value.metricValue; }
  get previousValue(): number | null { return this.value.previousValue; }
  get trend(): SupportAnalyticsProps['trend'] { return this.value.trend; }
  get computedAt(): Date { return this.value.computedAt; }
}
