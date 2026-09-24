import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { COMPLAINT_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(COMPLAINT_STATUS));

export class ComplaintStatusVO extends BaseStatusVO<string> {
  static create(value: string): ComplaintStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid complaint status: ${value}`);
    }
    return new ComplaintStatusVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
