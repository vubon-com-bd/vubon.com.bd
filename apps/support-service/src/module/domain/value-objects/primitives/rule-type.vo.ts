/**
 * RuleTypeVO — Rule category
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseTypeVO
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives/type.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SUPPORT_RULE_TYPE } from '@vubon/shared-constants/support';

export type RuleTypeValue =
  (typeof SUPPORT_RULE_TYPE)[keyof typeof SUPPORT_RULE_TYPE];

const TYPE_SET: ReadonlySet<string> = new Set(
  Object.values(SUPPORT_RULE_TYPE),
);

const ASSIGNMENT_TYPES: ReadonlySet<string> = new Set<string>([
  'assignment',
  'routing',
]);

export class RuleTypeVO extends BaseTypeVO<RuleTypeValue> {
  private constructor(value: RuleTypeValue) {
    super(value);
  }

  protected static allowedValues(): ReadonlySet<string> {
    return TYPE_SET;
  }

  static create(raw: string): RuleTypeVO {
    const normalized = raw.trim().toLowerCase();
    if (!TYPE_SET.has(normalized)) {
      throw new ValidationError(
        `Invalid rule type: ${raw}`,
        'ruleType',
      );
    }
    return new RuleTypeVO(normalized as RuleTypeValue);
  }

  isAssignmentRule(): boolean {
    return ASSIGNMENT_TYPES.has(this.value);
  }
}
