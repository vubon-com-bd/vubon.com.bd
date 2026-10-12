/**
 * ZoneId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class ZoneIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): ZoneIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ZoneId cannot be empty', 'zoneId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('ZoneId must be a valid UUID', 'zoneId');
    }
    return new ZoneIdVO(trimmed);
  }

  static reconstitute(raw: string): ZoneIdVO { return new ZoneIdVO(raw); }
}
