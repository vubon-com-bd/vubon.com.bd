/**
 * RuleConditionVO — Serialized rule condition expression
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseCodeVO
 * Business: a string DSL (e.g. "priority == high && channel == email")
 */
import { BaseCodeVO } from '@vubon/shared-kernel/domain/primitives/code.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 3;
const MAX_LENGTH = 2000;
const FORBIDDEN_FRAGMENTS: readonly RegExp[] = [
  /<script/i,
  /\beval\s*\(/i,
  /\bFunction\s*\(/i,
];

export class RuleConditionVO extends BaseCodeVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RuleConditionVO {
    BaseCodeVO.validateNonEmpty(raw, 'RuleCondition');
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH) {
      throw new ValidationError(
        `RuleCondition too short (min ${MIN_LENGTH})`,
        'ruleCondition',
      );
    }
    if (trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `RuleCondition too long (max ${MAX_LENGTH})`,
        'ruleCondition',
      );
    }
    for (const pattern of FORBIDDEN_FRAGMENTS) {
      if (pattern.test(trimmed)) {
        throw new ValidationError(
          'RuleCondition contains forbidden fragments',
          'ruleCondition',
        );
      }
    }
    return new RuleConditionVO(trimmed);
  }

  get operatorCount(): number {
    const matches = this.value.match(/&&|\|\|/g);
    return matches ? matches.length : 0;
  }

  get isCompound(): boolean {
    return this.operatorCount > 0;
  }
}
