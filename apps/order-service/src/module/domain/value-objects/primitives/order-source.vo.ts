/**
 * OrderSource Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_SOURCE } from '@vubon/shared-constants/business/order';

export type OrderSourceValue = (typeof ORDER_SOURCE)[keyof typeof ORDER_SOURCE];

const VALID_SOURCES: readonly string[] = Object.values(ORDER_SOURCE);

export class OrderSourceVO extends BaseTypeVO<OrderSourceValue> {
  private constructor(value: OrderSourceValue) {
    super(value);
  }

  static create(raw: string): OrderSourceVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('OrderSource must be a string', 'source');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_SOURCES.includes(normalized)) {
      throw new ValidationError(
        `Invalid OrderSource: "${normalized}". Allowed: ${VALID_SOURCES.join(', ')}`,
        'source',
      );
    }
    return new OrderSourceVO(normalized as OrderSourceValue);
  }

  static reconstitute(raw: string): OrderSourceVO {
    return new OrderSourceVO(raw as OrderSourceValue);
  }

  isSystemGenerated(): boolean {
    return this.value === ORDER_SOURCE.API || this.value === ORDER_SOURCE.IMPORT;
  }
}
