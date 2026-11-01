/**
 * RouteName Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseNameVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN = 3;
const MAX = 150;

export class RouteNameVO extends BaseNameVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): RouteNameVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('RouteName must be a string', 'name');
    }
    const normalized = raw.trim().replace(/\s+/g, ' ');
    if (normalized.length < MIN || normalized.length > MAX) {
      throw new ValidationError(`RouteName must be ${MIN}-${MAX} chars`, 'name');
    }
    return new RouteNameVO(normalized);
  }

  static reconstitute(raw: string): RouteNameVO {
    return new RouteNameVO(raw);
  }
}
