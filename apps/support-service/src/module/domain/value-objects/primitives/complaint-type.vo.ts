import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { COMPLAINT_TYPE } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(COMPLAINT_TYPE));

export class ComplaintTypeVO extends BaseTypeVO<string> {
  static create(value: string): ComplaintTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid complaint type: ${value}`);
    }
    return new ComplaintTypeVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
