/**
 * SupportRuleVO — Automation rule composite
 * @module support-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RuleIdVO } from '../primitives/rule-id.vo';
import { RuleTypeVO } from '../primitives/rule-type.vo';
import { RuleConditionVO } from '../primitives/rule-condition.vo';

export interface SupportRuleVOProps {
  readonly id: RuleIdVO;
  readonly type: RuleTypeVO;
  readonly condition: RuleConditionVO;
  readonly action: string;
  readonly isActive: boolean;
  readonly priority?: number;
}

export class SupportRuleVO extends BaseVO<Readonly<SupportRuleVOProps>> {
  private constructor(props: SupportRuleVOProps) {
    super(
      Object.freeze({
        ...props,
        priority: props.priority ?? 0,
      }),
    );
  }

  static create(props: SupportRuleVOProps): SupportRuleVO {
    if (!props.id || !props.condition || !props.action) {
      throw new ValidationError(
        'SupportRuleVO requires id, condition, action',
        'supportRule',
      );
    }
    return new SupportRuleVO(props);
  }

  get id(): RuleIdVO {
    return this.value.id;
  }

  get condition(): RuleConditionVO {
    return this.value.condition;
  }

  get isActive(): boolean {
    return this.value.isActive;
  }

  get isCompound(): boolean {
    return this.value.condition.isCompound;
  }

  get priority(): number {
    return this.value.priority ?? 0;
  }

  get isAssignmentRule(): boolean {
    return this.value.type.isAssignmentRule();
  }
}
