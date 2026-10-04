/**
 * OrderChannel Value Object
 * @module order-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { ORDER_CHANNEL } from '@vubon/shared-constants/business/order';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

const ALLOWED = Object.values(ORDER_CHANNEL) as readonly string[];

export class OrderChannelVO extends BaseTypeVO<string> {
  private constructor(value: string) {
    super(value);
  }

  static create(raw: string): OrderChannelVO {
    if (!ALLOWED.includes(raw)) {
      throw new ValidationError(
        `Invalid order channel "${raw}". Allowed: ${ALLOWED.join(', ')}`,
        'channel',
      );
    }
    return new OrderChannelVO(raw);
  }

  static web(): OrderChannelVO { return new OrderChannelVO(ORDER_CHANNEL.WEB); }
  static mobile(): OrderChannelVO { return new OrderChannelVO(ORDER_CHANNEL.MOBILE_APP); }
  static pos(): OrderChannelVO { return new OrderChannelVO(ORDER_CHANNEL.POS); }
  static api(): OrderChannelVO { return new OrderChannelVO(ORDER_CHANNEL.API); }

  static reconstitute(raw: string): OrderChannelVO {
    return new OrderChannelVO(raw);
  }

  isOnline(): boolean {
    return [
      ORDER_CHANNEL.WEB,
      ORDER_CHANNEL.MOBILE_APP,
      ORDER_CHANNEL.API,
    ].includes(this.value as never);
  }
}
