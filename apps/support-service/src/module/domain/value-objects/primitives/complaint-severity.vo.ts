import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { COMPLAINT_SEVERITY } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(COMPLAINT_SEVERITY));

export class ComplaintSeverityVO extends BaseTypeVO<string> {
  static create(value: string): ComplaintSeverityVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid complaint severity: ${value}`);
    }
    return new ComplaintSeverityVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
