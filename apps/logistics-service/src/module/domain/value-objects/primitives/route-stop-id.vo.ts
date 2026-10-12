/**
 * RouteStopId Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { REGEX } from '@vubon/shared-constants/common';

export class RouteStopIdVO extends BaseIdVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): RouteStopIdVO {
    if (typeof raw !== 'string' || raw.trim().length === 0) {
      throw new ValidationError('RouteStopId cannot be empty', 'stopId');
    }
    const trimmed = raw.trim();
    if (!REGEX.UUID.test(trimmed)) {
      throw new ValidationError('RouteStopId must be a valid UUID', 'stopId');
    }
    return new RouteStopIdVO(trimmed);
  }

  static reconstitute(raw: string): RouteStopIdVO { return new RouteStopIdVO(raw); }
}
