import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { MarketingReportIdVO } from '../primitives/marketing-report-id.vo';
import { ReportTypeVO } from '../primitives/report-type.vo';
import { ReportFormatVO } from '../primitives/report-format.vo';

export interface MarketingReportProps {
  readonly id: MarketingReportIdVO;
  readonly name: string;
  readonly type: ReportTypeVO;
  readonly format: ReportFormatVO;
  readonly generatedAt: Date;
}

export class MarketingReportVO extends BaseVO<MarketingReportProps> {
  private constructor(props: MarketingReportProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: MarketingReportProps): MarketingReportVO {
    return new MarketingReportVO(props);
  }

  get id(): MarketingReportIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): ReportTypeVO { return this.value.type; }
  get format(): ReportFormatVO { return this.value.format; }
  get generatedAt(): Date { return this.value.generatedAt; }
}
