/**
 * NotificationDeliveryVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Delivery state: status + provider info + attempts summary।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DeliveryStatusVO } from '@domain/primitives/delivery-status.vo.js';
import { ProviderNameVO } from '@domain/primitives/provider-name.vo.js';
import { ProviderMessageIdVO } from '@domain/primitives/provider-message-id.vo.js';

export interface NotificationDeliveryProps {
  readonly status: DeliveryStatusVO;
  readonly providerName?: ProviderNameVO;
  readonly providerMessageId?: ProviderMessageIdVO;
  readonly attemptCount: number;
  readonly maxAttempts: number;
  readonly sentAt?: string;
  readonly deliveredAt?: string;
  readonly failedAt?: string;
}

export class NotificationDeliveryVO extends BaseVO<NotificationDeliveryProps> {
  private constructor(props: NotificationDeliveryProps) {
    super(Object.freeze(props));
  }

  static create(props: NotificationDeliveryProps): NotificationDeliveryVO {
    const vo = new NotificationDeliveryVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationDeliveryProps): NotificationDeliveryVO {
    return new NotificationDeliveryVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!Number.isInteger(v.attemptCount) || v.attemptCount < 0) {
      throw new ValidationError('attemptCount must be non-negative integer', 'attemptCount');
    }
    if (!Number.isInteger(v.maxAttempts) || v.maxAttempts < 1) {
      throw new ValidationError('maxAttempts must be positive integer', 'maxAttempts');
    }
    if (v.attemptCount > v.maxAttempts) {
      throw new ValidationError('attemptCount cannot exceed maxAttempts', 'attemptCount');
    }
    if (v.status.isDelivered() && !v.deliveredAt) {
      throw new ValidationError('Delivered status requires deliveredAt', 'deliveredAt');
    }
    if (v.status.isFailed() && !v.failedAt) {
      throw new ValidationError('Failed status requires failedAt', 'failedAt');
    }
  }

  get status(): DeliveryStatusVO { return this.value.status; }
  get providerName(): ProviderNameVO | undefined { return this.value.providerName; }
  get providerMessageId(): ProviderMessageIdVO | undefined { return this.value.providerMessageId; }
  get attemptCount(): number { return this.value.attemptCount; }
  get maxAttempts(): number { return this.value.maxAttempts; }
  get sentAt(): string | undefined { return this.value.sentAt; }
  get deliveredAt(): string | undefined { return this.value.deliveredAt; }
  get failedAt(): string | undefined { return this.value.failedAt; }

  get remainingAttempts(): number { return this.value.maxAttempts - this.value.attemptCount; }
  get canRetry(): boolean { return this.status.canRetry() && this.remainingAttempts > 0; }
  get isSuccess(): boolean { return this.status.isSuccess(); }
  get isTerminal(): boolean { return this.status.isTerminal(); }

  get deliveryDurationMs(): number | undefined {
    if (!this.value.sentAt || !this.value.deliveredAt) return undefined;
    return (
      new Date(this.value.deliveredAt).getTime() - new Date(this.value.sentAt).getTime()
    );
  }
}
