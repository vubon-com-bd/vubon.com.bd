import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { RuleIdVO } from '../primitives/rule-id.vo';
import { RuleTypeVO } from '../primitives/rule-type.vo';
import { RuleConditionVO } from '../primitives/rule-condition.vo';

export interface SupportRuleProps {
  readonly id: RuleIdVO;
  readonly name: string;
  readonly type: RuleTypeVO;
  readonly condition: RuleConditionVO;
  readonly action: string;
  readonly priority: number;
  readonly isActive: boolean;
}

export class SupportRuleVO extends BaseVO<SupportRuleProps> {
  private constructor(props: SupportRuleProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: SupportRuleProps): SupportRuleVO {
    return new SupportRuleVO(props);
  }

  get id(): RuleIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get type(): RuleTypeVO { return this.value.type; }
  get condition(): RuleConditionVO { return this.value.condition; }
  get action(): string { return this.value.action; }
  get priority(): number { return this.value.priority; }
  get isActive(): boolean { return this.value.isActive; }
}
