import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DeliveryStatusVO } from '../primitives/delivery-status.vo';
import { DeliveryAttemptVO } from '../primitives/delivery-attempt.vo';
import { DeliveryErrorVO } from '../primitives/delivery-error.vo';
import { ProviderNameVO } from '../primitives/provider-name.vo';
import { ProviderMessageIdVO } from '../primitives/provider-message-id.vo';

export interface NotificationDeliveryProps {
  readonly providerName: ProviderNameVO;
  readonly providerMessageId: ProviderMessageIdVO | null;
  readonly status: DeliveryStatusVO;
  readonly attempts: DeliveryAttemptVO;
  readonly lastError: DeliveryErrorVO | null;
  readonly deliveredAt: Date | null;
}

export class NotificationDeliveryVO extends BaseVO<NotificationDeliveryProps> {
  private constructor(props: NotificationDeliveryProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: NotificationDeliveryProps): NotificationDeliveryVO {
    return new NotificationDeliveryVO(props);
  }

  get providerName(): ProviderNameVO { return this.value.providerName; }
  get providerMessageId(): ProviderMessageIdVO | null { return this.value.providerMessageId; }
  get status(): DeliveryStatusVO { return this.value.status; }
  get attempts(): DeliveryAttemptVO { return this.value.attempts; }
  get lastError(): DeliveryErrorVO | null { return this.value.lastError; }
  get deliveredAt(): Date | null { return this.value.deliveredAt; }
}
