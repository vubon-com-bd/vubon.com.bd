import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';

export interface SupportSummaryProps {
  readonly totalTickets: number;
  readonly openTickets: number;
  readonly resolvedTickets: number;
  readonly averageResponseMinutes: number;
  readonly averageResolutionMinutes: number;
  readonly satisfactionScore: number;
  readonly slaCompliancePercent: number;
}

export class SupportSummaryVO extends BaseVO<SupportSummaryProps> {
  private constructor(props: SupportSummaryProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SupportSummaryProps): SupportSummaryVO {
    return new SupportSummaryVO(props);
  }

  get totalTickets(): number { return this.value.totalTickets; }
  get openTickets(): number { return this.value.openTickets; }
  get resolvedTickets(): number { return this.value.resolvedTickets; }
  get averageResponseMinutes(): number { return this.value.averageResponseMinutes; }
  get averageResolutionMinutes(): number { return this.value.averageResolutionMinutes; }
  get satisfactionScore(): number { return this.value.satisfactionScore; }
  get slaCompliancePercent(): number { return this.value.slaCompliancePercent; }
}
