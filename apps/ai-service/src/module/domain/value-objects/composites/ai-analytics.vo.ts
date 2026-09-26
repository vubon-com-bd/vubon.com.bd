import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { AiAnalyticsIdVO } from '../primitives/ai-analytics-id.vo';
import { AnalyticsTypeVO } from '../primitives/analytics-type.vo';
import { AnalyticsReportVO } from './analytics-report.vo';

export interface AiAnalyticsProps {
  readonly id: AiAnalyticsIdVO;
  readonly type: AnalyticsTypeVO;
  readonly report: AnalyticsReportVO;
  readonly modelId: string | null;
}

export class AiAnalyticsVO extends BaseVO<AiAnalyticsProps> {
  static create(props: AiAnalyticsProps): AiAnalyticsVO {
    return new AiAnalyticsVO(props);
  }

  private constructor(props: AiAnalyticsProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): AiAnalyticsIdVO { return this.value.id; }
  get type(): AnalyticsTypeVO { return this.value.type; }
  get report(): AnalyticsReportVO { return this.value.report; }
  get modelId(): string | null { return this.value.modelId; }

  hasModel(): boolean {
    return this.value.modelId !== null;
  }
}
