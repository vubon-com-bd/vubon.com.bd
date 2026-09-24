import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { SUPPORT_SLA_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(SUPPORT_SLA_STATUS));

export class SlaStatusVO extends BaseStatusVO<string> {
  static create(value: string): SlaStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid SLA status: ${value}`);
    }
    return new SlaStatusVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
