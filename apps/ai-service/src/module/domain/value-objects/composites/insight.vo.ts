import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InsightIdVO } from '../primitives/insight-id.vo';
import { InsightStatusVO } from '../primitives/insight-status.vo';
import { InsightResultVO } from './insight-result.vo';

export interface InsightProps {
  readonly id: InsightIdVO;
  readonly type: string;
  readonly priority: string;
  readonly status: InsightStatusVO;
  readonly result: InsightResultVO;
  readonly target: string;
}

export class InsightVO extends BaseVO<InsightProps> {
  static create(props: InsightProps): InsightVO {
    return new InsightVO(props);
  }

  private constructor(props: InsightProps) {
    super(Object.freeze({ ...props }));
  }

  get id(): InsightIdVO { return this.value.id; }
  get type(): string { return this.value.type; }
  get priority(): string { return this.value.priority; }
  get status(): InsightStatusVO { return this.value.status; }
  get result(): InsightResultVO { return this.value.result; }
  get target(): string { return this.value.target; }

  isDismissed(): boolean {
    return this.value.status.isDismissed();
  }

  isHighConfidence(): boolean {
    return this.value.result.isHighConfidence();
  }
}
