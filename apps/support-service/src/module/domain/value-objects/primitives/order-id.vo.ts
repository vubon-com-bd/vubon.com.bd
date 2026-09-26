/**
 * OrderIdVO — Reference to order-service order (ID only, no embed)
 * @module support-service/domain/value-objects/primitives
 *
 * Registry: extends BaseIdVO
 * Rule: cross-service reference — শুধু ID
 */
import { BaseIdVO } from '@vubon/shared-kernel/domain/primitives/id.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const MIN_LENGTH = 1;
const MAX_LENGTH = 64;

export class OrderIdVO extends BaseIdVO {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderIdVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('OrderId must be a string', 'orderId');
    }
    const trimmed = raw.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      throw new ValidationError(
        `OrderId length must be between ${MIN_LENGTH} and ${MAX_LENGTH}`,
        'orderId',
      );
    }
    return new OrderIdVO(trimmed);
  }
}
