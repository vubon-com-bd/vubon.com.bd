import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { SUPPORT_AUTOMATION_TYPE } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(SUPPORT_AUTOMATION_TYPE));

export class AutomationTypeVO extends BaseTypeVO<string> {
  static create(value: string): AutomationTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid automation type: ${value}`);
    }
    return new AutomationTypeVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
