import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { SUPPORT_RULE_TYPE } from '@vubon/shared-constants/support';

const VALID = new Set<string>(Object.values(SUPPORT_RULE_TYPE));

export class RuleTypeVO extends BaseTypeVO<string> {
  static create(value: string): RuleTypeVO {
    if (!VALID.has(value)) {
      throw new Error(`Invalid rule type: ${value}`);
    }
    return new RuleTypeVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
