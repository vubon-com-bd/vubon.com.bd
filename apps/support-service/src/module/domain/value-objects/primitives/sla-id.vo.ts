/**
 * SlaIdVO — Service Level Agreement identifier
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const PREFIX = 'sla_';
const MIN_LENGTH = 6;
const MAX_LENGTH = 64;

export class SlaIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): SlaIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('SlaId must be a string', 'slaId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `SlaId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'slaId',
      );
    }
    return new SlaIdVO(trimmed);
  }

  static generate(): SlaIdVO {
    const suffix = Date.now().toString(36);
    return SlaIdVO.create(`${PREFIX}${suffix}`);
  }
}
