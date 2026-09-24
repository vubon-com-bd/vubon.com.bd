import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { RuleIdVO } from '../value-objects/primitives/rule-id.vo';
import { RuleTypeVO } from '../value-objects/primitives/rule-type.vo';
import { RuleConditionVO } from '../value-objects/primitives/rule-condition.vo';

export interface SupportRuleEntityProps {
  readonly name: string;
  readonly type: RuleTypeVO;
  readonly condition: RuleConditionVO;
  readonly action: string;
  readonly priority: number;
  readonly isActive: boolean;
}

export class SupportRuleEntity extends AggregateRoot<RuleIdVO> {
  private readonly _name: string;
  private readonly _type: RuleTypeVO;
  private readonly _condition: RuleConditionVO;
  private readonly _action: string;
  private readonly _priority: number;
  private readonly _isActive: boolean;

  private constructor(
    id: RuleIdVO,
    props: SupportRuleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._name = props.name;
    this._type = props.type;
    this._condition = props.condition;
    this._action = props.action;
    this._priority = props.priority;
    this._isActive = props.isActive;
  }

  static create(props: SupportRuleEntityProps): SupportRuleEntity {
    const now = new Date().toISOString();
    const id = RuleIdVO.create(crypto.randomUUID());
    return new SupportRuleEntity(id, props, now, now, null);
  }

  static reconstitute(
    id: RuleIdVO,
    props: SupportRuleEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): SupportRuleEntity {
    return new SupportRuleEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get name(): string { return this._name; }
  get type(): RuleTypeVO { return this._type; }
  get condition(): RuleConditionVO { return this._condition; }
  get action(): string { return this._action; }
  get priority(): number { return this._priority; }
  get isActive(): boolean { return this._isActive; }
}
