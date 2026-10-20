/**
 * OrderChannel Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_CHANNEL } from '@vubon/shared-constants/business/order';

export type OrderChannelValue = (typeof ORDER_CHANNEL)[keyof typeof ORDER_CHANNEL];

const VALID_CHANNELS: readonly string[] = Object.values(ORDER_CHANNEL);

export class OrderChannelVO extends BaseTypeVO<OrderChannelValue> {
  private constructor(value: OrderChannelValue) {
    super(value);
  }

  static create(raw: string): OrderChannelVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('OrderChannel must be a string', 'channel');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_CHANNELS.includes(normalized)) {
      throw new ValidationError(
        `Invalid OrderChannel: "${normalized}". Allowed: ${VALID_CHANNELS.join(', ')}`,
        'channel',
      );
    }
    return new OrderChannelVO(normalized as OrderChannelValue);
  }

  static reconstitute(raw: string): OrderChannelVO {
    return new OrderChannelVO(raw as OrderChannelValue);
  }

  isOnline(): boolean {
    return (
      this.value === ORDER_CHANNEL.WEB ||
      this.value === ORDER_CHANNEL.MOBILE_APP ||
      this.value === ORDER_CHANNEL.API
    );
  }
}
