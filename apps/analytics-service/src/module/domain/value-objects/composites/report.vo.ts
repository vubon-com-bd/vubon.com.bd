import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ReportIdVO } from '../primitives/report-id.vo';
import { ReportTypeVO } from '../primitives/report-type.vo';
import { ReportFormatVO } from '../primitives/report-format.vo';
import { ReportStatusVO } from '../primitives/report-status.vo';

export interface ReportProps {
  readonly reportId: ReportIdVO;
  readonly type: ReportTypeVO;
  readonly format: ReportFormatVO;
  readonly status: ReportStatusVO;
  readonly generatedAt: Date | null;
  readonly ownerId: string;
}

export class ReportVO extends BaseVO<ReportProps> {
  static create(props: ReportProps): ReportVO {
    return new ReportVO(Object.freeze({ ...props }));
  }

  private constructor(value: ReportProps) {
    super(value);
  }

  get reportId(): ReportIdVO { return this.value.reportId; }
  get type(): ReportTypeVO { return this.value.type; }
  get format(): ReportFormatVO { return this.value.format; }
  get status(): ReportStatusVO { return this.value.status; }
  get generatedAt(): Date | null { return this.value.generatedAt; }
  get ownerId(): string { return this.value.ownerId; }

  get isReady(): boolean {
    return this.value.status.value === 'completed';
  }

  isOwnedBy(userId: string): boolean {
    return this.value.ownerId === userId;
  }

  getAgeMs(): number | null {
    if (!this.value.generatedAt) return null;
    return Date.now() - this.value.generatedAt.getTime();
  }
}
