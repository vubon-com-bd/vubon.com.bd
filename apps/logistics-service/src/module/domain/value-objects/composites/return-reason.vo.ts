import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ReturnReasonTypeVO } from '../primitives/return-reason-type.vo';

export interface ReturnReasonDetailProps {
  readonly code: string;
  readonly label: string;
  readonly type: ReturnReasonTypeVO;
}

export class ReturnReasonDetailVO extends BaseVO<ReturnReasonDetailProps> {
  private constructor(props: ReturnReasonDetailProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: ReturnReasonDetailProps): ReturnReasonDetailVO {
    if (!props.code.trim()) throw new Error('Return reason code cannot be empty');
    if (!props.label.trim()) throw new Error('Return reason label cannot be empty');
    return new ReturnReasonDetailVO(props);
  }

  get code(): string { return this.value.code; }
  get label(): string { return this.value.label; }
  get type(): ReturnReasonTypeVO { return this.value.type; }
}
