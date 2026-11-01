/**
 * ScheduleId Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class ScheduleIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): ScheduleIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('ScheduleId cannot be empty', 'scheduleId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('ScheduleId must be a valid UUID', 'scheduleId');
    }
    return new ScheduleIdVO(trimmed);
  }

  static reconstitute(raw: string): ScheduleIdVO {
    return new ScheduleIdVO(raw);
  }
}
