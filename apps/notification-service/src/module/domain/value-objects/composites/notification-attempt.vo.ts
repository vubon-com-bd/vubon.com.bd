import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { DeliveryAttemptVO } from '../primitives/delivery-attempt.vo';
import { DeliveryStatusVO } from '../primitives/delivery-status.vo';
import { DeliveryErrorVO } from '../primitives/delivery-error.vo';

export interface NotificationAttemptProps {
  readonly attemptNumber: DeliveryAttemptVO;
  readonly status: DeliveryStatusVO;
  readonly error: DeliveryErrorVO | null;
  readonly attemptedAt: Date;
}

export class NotificationAttemptVO extends BaseVO<NotificationAttemptProps> {
  private constructor(props: NotificationAttemptProps) {
    super(Object.freeze({ ...props }));
  }

  static create(props: NotificationAttemptProps): NotificationAttemptVO {
    return new NotificationAttemptVO(props);
  }

  get attemptNumber(): DeliveryAttemptVO { return this.value.attemptNumber; }
  get status(): DeliveryStatusVO { return this.value.status; }
  get error(): DeliveryErrorVO | null { return this.value.error; }
  get attemptedAt(): Date { return this.value.attemptedAt; }
}
