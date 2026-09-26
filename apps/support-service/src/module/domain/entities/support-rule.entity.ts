/**
 * SupportRuleEntity — Automation rule aggregate
 * @module support-service/domain/entities
 *
 * Registry: extends AggregateRoot<RuleIdVO>
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { RuleIdVO } from '../value-objects/primitives/rule-id.vo';
import { RuleTypeVO } from '../value-objects/primitives/rule-type.vo';
import { RuleConditionVO } from '../value-objects/primitives/rule-condition.vo';
import { RuleTriggeredEvent } from '../events/rule.events';

export interface CreateSupportRuleInput {
  readonly id: RuleIdVO;
  readonly type: RuleTypeVO;
  readonly condition: RuleConditionVO;
  readonly action: string;
  readonly priority?: number;
  readonly now: string;
}

export interface SupportRuleSnapshot {
  readonly id: string;
  readonly type: string;
  readonly condition: string;
  readonly action: string;
  readonly isActive: boolean;
  readonly priority: number;
  readonly triggerCount: number;
  readonly lastTriggeredAt?: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class SupportRuleEntity extends AggregateRoot<RuleIdVO> {
  private readonly _type: RuleTypeVO;
  private _condition: RuleConditionVO;
  private _action: string;
  private _isActive: boolean;
  private _priority: number;
  private _triggerCount: number;
  private _lastTriggeredAt?: string;

  private constructor(
    id: RuleIdVO,
    type: RuleTypeVO,
    condition: RuleConditionVO,
    action: string,
    isActive: boolean,
    priority: number,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._type = type;
    this._condition = condition;
    this._action = action;
    this._isActive = isActive;
    this._priority = priority;
    this._triggerCount = 0;
  }

  static create(input: CreateSupportRuleInput): SupportRuleEntity {
    if (!input.id || !input.condition) {
      throw new ValidationError(
        'SupportRule requires id and condition',
        'supportRule',
      );
    }
    if (typeof input.action !== 'string' || input.action.trim().length === 0) {
      throw new ValidationError('SupportRule action required', 'supportRule');
    }
    const now = input.now;
    return new SupportRuleEntity(
      input.id,
      input.type,
      input.condition,
      input.action.trim(),
      true,
      input.priority ?? 0,
      now,
      now,
    );
  }

  static rehydrate(snapshot: SupportRuleSnapshot): SupportRuleEntity {
    const rule = new SupportRuleEntity(
      RuleIdVO.create(snapshot.id),
      RuleTypeVO.create(snapshot.type),
      RuleConditionVO.create(snapshot.condition),
      snapshot.action,
      snapshot.isActive,
      snapshot.priority,
      snapshot.createdAt,
      snapshot.updatedAt,
    );
    rule._triggerCount = snapshot.triggerCount;
    rule._lastTriggeredAt = snapshot.lastTriggeredAt;
    return rule;
  }

  get type(): RuleTypeVO {
    return this._type;
  }

  get condition(): RuleConditionVO {
    return this._condition;
  }

  get action(): string {
    return this._action;
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get priority(): number {
    return this._priority;
  }

  get triggerCount(): number {
    return this._triggerCount;
  }

  get isAssignmentRule(): boolean {
    return this._type.isAssignmentRule();
  }

  get isCompound(): boolean {
    return this._condition.isCompound;
  }

  updateCondition(condition: RuleConditionVO, now: string): void {
    if (!this._isActive) {
      throw new BusinessRuleError(
        'Cannot update an inactive rule',
        'supportRule.inactive',
      );
    }
    this._condition = condition;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  updateAction(action: string, now: string): void {
    if (typeof action !== 'string' || action.trim().length === 0) {
      throw new ValidationError('Action required', 'supportRule');
    }
    this._action = action.trim();
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  trigger(
    context: Readonly<Record<string, string | number>>,
    now: string,
  ): void {
    if (!this._isActive) {
      throw new BusinessRuleError(
        'Cannot trigger an inactive rule',
        'supportRule.inactive',
      );
    }
    this._triggerCount += 1;
    this._lastTriggeredAt = now;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.addDomainEvent(
      new RuleTriggeredEvent(this.id, context, this._action, Date.parse(now)),
    );
  }

  deactivate(now: string): void {
    if (!this._isActive) return;
    this._isActive = false;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  activate(now: string): void {
    if (this._isActive) return;
    this._isActive = true;
    (this as unknown as { updatedAt: string }).updatedAt = now;
    this.incrementVersion();
  }

  toSnapshot(): SupportRuleSnapshot {
    return {
      id: this.id.value,
      type: this._type.value,
      condition: this._condition.value,
      action: this._action,
      isActive: this._isActive,
      priority: this._priority,
      triggerCount: this._triggerCount,
      lastTriggeredAt: this._lastTriggeredAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
