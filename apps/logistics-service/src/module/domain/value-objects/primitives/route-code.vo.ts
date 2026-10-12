/**
 * RouteCode Value Object — RT-XXXX
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ROUTE_CODE_PATTERN = /^[A-Z0-9][A-Z0-9\-_]{1,49}$/;

export class RouteCodeVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): RouteCodeVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('Route code must be a string', 'code');
    }
    const cleaned = raw.trim().toUpperCase();
    if (!ROUTE_CODE_PATTERN.test(cleaned)) {
      throw new ValidationError('Route code must be 2-50 uppercase alnum', 'code');
    }
    return new RouteCodeVO(cleaned);
  }

  static reconstitute(raw: string): RouteCodeVO { return new RouteCodeVO(raw); }

  get length(): number { return this.value.length; }
}
