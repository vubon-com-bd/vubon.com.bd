import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives/status.vo';
import { SUPPORT_AUTOMATION_STATUS } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(SUPPORT_AUTOMATION_STATUS));

export class AutomationStatusVO extends BaseStatusVO<string> {
  static create(value: string): AutomationStatusVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid automation status: ${value}`);
    }
    return new AutomationStatusVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
