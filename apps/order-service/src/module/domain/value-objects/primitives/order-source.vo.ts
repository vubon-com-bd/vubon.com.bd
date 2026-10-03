/**
 * OrderSource Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_SOURCE } from '@vubon/shared-constants/business/order';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(ORDER_SOURCE) as readonly string[];

export class OrderSourceVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderSourceVO {
    if (!ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid order source "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'source',
      );
    }
    return new OrderSourceVO(raw);
  }

  static customer(): OrderSourceVO { return new OrderSourceVO(ORDER_SOURCE.CUSTOMER); }
  static admin(): OrderSourceVO { return new OrderSourceVO(ORDER_SOURCE.ADMIN); }
  static api(): OrderSourceVO { return new OrderSourceVO(ORDER_SOURCE.API); }

  static reconstitute(raw: string): OrderSourceVO {
    return new OrderSourceVO(raw);
  }

  isSystemGenerated(): boolean {
    return [ORDER_SOURCE.API, ORDER_SOURCE.IMPORT, ORDER_SOURCE.BULK].includes(
      this.value as never,
    );
  }
}
