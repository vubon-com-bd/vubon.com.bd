/**
 * NotificationAttemptVO — Composite Value Object
 * @module notification-service/domain/value-objects/composites
 *
 * Single delivery attempt: number + status + result।
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { DeliveryAttemptVO } from '@domain/primitives/delivery-attempt.vo.js';
import { DeliveryErrorVO } from '@domain/primitives/delivery-error.vo.js';

export interface NotificationAttemptProps {
  readonly attempt: DeliveryAttemptVO;
  readonly error?: DeliveryErrorVO;
}

export class NotificationAttemptVO extends BaseVO<NotificationAttemptProps> {
  private constructor(props: NotificationAttemptProps) {
    super(Object.freeze(props));
  }

  static create(props: NotificationAttemptProps): NotificationAttemptVO {
    const vo = new NotificationAttemptVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: NotificationAttemptProps): NotificationAttemptVO {
    return new NotificationAttemptVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (v.attempt.succeeded && v.error) {
      throw new ValidationError('Successful attempt cannot have delivery error', 'error');
    }
    if (!v.attempt.succeeded && !v.error) {
      throw new ValidationError('Failed attempt must have delivery error', 'error');
    }
  }

  get attempt(): DeliveryAttemptVO { return this.value.attempt; }
  get error(): DeliveryErrorVO | undefined { return this.value.error; }
  get succeeded(): boolean { return this.attempt.succeeded; }
  get isRetryable(): boolean { return this.error?.retryable === true; }
}
