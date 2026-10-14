/**
 * PerformanceId Value Object
 * @module vendor-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { REGEX } from '@vubon/shared-constants/common';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

export class PerformanceIdVO extends BaseIdVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): PerformanceIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('PerformanceId cannot be empty', 'performanceId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('PerformanceId must be a valid UUID', 'performanceId');
    }
    return new PerformanceIdVO(trimmed);
  }

  static reconstitute(raw: string): PerformanceIdVO {
    return new PerformanceIdVO(raw);
  }
}
