/**
 * NotificationDeliveryVO — delivery state + attempt tracking
 * @module notification-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { DeliveryStatusVO } from '../primitives/delivery-status.vo.js';
import { DeliveryFailureReasonVO } from '../primitives/delivery-failure-reason.vo.js';

export interface NotificationDeliveryVOProps {
  readonly status: DeliveryStatusVO;
  readonly attemptCount: number;
  readonly provider?: string;
  readonly providerMessageId?: string;
  readonly failureReason?: DeliveryFailureReasonVO;
  readonly lastAttemptAt?: string;
  readonly deliveredAt?: string;
  readonly sentAt?: string;
}

export class NotificationDeliveryVO extends BaseVO<NotificationDeliveryVOProps> {
  private constructor(props: NotificationDeliveryVOProps) {
    super(props);
  }

  static create(props: NotificationDeliveryVOProps): NotificationDeliveryVO {
    const vo = new NotificationDeliveryVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationDeliveryVOProps): NotificationDeliveryVO {
    return new NotificationDeliveryVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.attemptCount < 0) {
      throw new ValidationError('Attempt count cannot be negative', 'attemptCount');
    }
    if (v.status.isDelivered() && !v.deliveredAt) {
      throw new ValidationError('Delivered status requires deliveredAt timestamp', 'deliveredAt');
    }
    if (v.status.isFailed() && !v.failureReason) {
      throw new ValidationError('Failed status requires a failure reason', 'failureReason');
    }
  }

  get status(): DeliveryStatusVO { return this.value.status; }
  get attemptCount(): number { return this.value.attemptCount; }
  get provider(): string | undefined { return this.value.provider; }
  get providerMessageId(): string | undefined { return this.value.providerMessageId; }
  get failureReason(): DeliveryFailureReasonVO | undefined { return this.value.failureReason; }
  get lastAttemptAt(): string | undefined { return this.value.lastAttemptAt; }
  get deliveredAt(): string | undefined { return this.value.deliveredAt; }
  get sentAt(): string | undefined { return this.value.sentAt; }

  hasBeenAttempted(): boolean { return this.value.attemptCount > 0; }
  canRetry(): boolean {
    return this.value.status.isRecoverable() && this.value.failureReason?.isRetryable() === true;
  }
}
