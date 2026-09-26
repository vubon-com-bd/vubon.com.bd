/**
 * AutomationIdVO — Support automation job identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'auto_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class AutomationIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): AutomationIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('AutomationId must be a string', 'automationId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `AutomationId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'automationId',
      );
    }
    return new AutomationIdVO(trimmed);
  }

  static generate(): AutomationIdVO {
    const suffix = Date.now().toString(36);
    return AutomationIdVO.create(`${PREFIX}${suffix}`);
  }
}
