import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ComplaintSeverityVO as ComplaintSeverityPrimitiveVO } from '../primitives/complaint-severity.vo';

export interface ComplaintSeverityDetailProps {
  readonly severity: ComplaintSeverityPrimitiveVO;
  readonly requiresImmediate: boolean;
  readonly escalationLevel: number;
}

export class ComplaintSeverityDetailVO extends BaseVO<ComplaintSeverityDetailProps> {
  private constructor(props: ComplaintSeverityDetailProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ComplaintSeverityDetailProps): ComplaintSeverityDetailVO {
    return new ComplaintSeverityDetailVO(props);
  }

  get severity(): ComplaintSeverityPrimitiveVO { return this.value.severity; }
  get requiresImmediate(): boolean { return this.value.requiresImmediate; }
  get escalationLevel(): number { return this.value.escalationLevel; }
}
