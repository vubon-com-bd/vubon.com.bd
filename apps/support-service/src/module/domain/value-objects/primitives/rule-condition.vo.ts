import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';

export class RuleConditionVO extends BaseCodeVO {
  static create(value: string): RuleConditionVO {
    BaseCodeVO.validateNonEmpty(value, 'RuleCondition');
    return new RuleConditionVO(value);
  }
  private constructor(value: string) {
    super(value);
  }
}
