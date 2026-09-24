import { BaseStatusVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DELIVERY_STATUS } from '@vubon/shared-constants/platform/notification';

const ALLOWED = new Set<string>(Object.values(NOTIFICATION_DELIVERY_STATUS));

export class DeliveryStatusVO extends BaseStatusVO<string> {
  private constructor(value: string) {
    super(value);
  }

  protected static override allowedValues(): ReadonlySet<string> {
    return ALLOWED;
  }

  static create(raw: string): DeliveryStatusVO {
    if (!ALLOWED.has(raw)) {
      throw new Error(`Invalid delivery status: ${raw}`);
    }
    return new DeliveryStatusVO(raw);
  }

  isDelivered(): boolean {
    return this.value === NOTIFICATION_DELIVERY_STATUS.DELIVERED;
  }

  isFailed(): boolean {
    return (
      this.value === NOTIFICATION_DELIVERY_STATUS.FAILED ||
      this.value === NOTIFICATION_DELIVERY_STATUS.BOUNCED
    );
  }
}
