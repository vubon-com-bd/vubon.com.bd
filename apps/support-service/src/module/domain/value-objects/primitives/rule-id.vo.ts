/**
 * RuleIdVO — Support automation rule identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'rule_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class RuleIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RuleIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('RuleId must be a string', 'ruleId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `RuleId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'ruleId',
      );
    }
    return new RuleIdVO(trimmed);
  }

  static generate(): RuleIdVO {
    const suffix = Date.now().toString(36);
    return RuleIdVO.create(`${PREFIX}${suffix}`);
  }
}
