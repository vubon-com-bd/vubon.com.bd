/**
 * DeliveryError Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { NOTIFICATION_DELIVERY_FAILURE_REASON } from '@vubon/shared-constants/platform';

export type DeliveryFailureReasonValue =
  (typeof NOTIFICATION_DELIVERY_FAILURE_REASON)[keyof typeof NOTIFICATION_DELIVERY_FAILURE_REASON];

const ALLOWED_REASONS = Object.values(NOTIFICATION_DELIVERY_FAILURE_REASON) as readonly string[];
const MAX_MESSAGE_LENGTH = 500;

export interface DeliveryErrorProps {
  readonly reason: DeliveryFailureReasonValue;
  readonly message: string;
  readonly providerCode?: string;
  readonly retryable: boolean;
}

export class DeliveryErrorVO extends BaseVO<DeliveryErrorProps> {
  private constructor(value: DeliveryErrorProps) {
    super(value);
  }

  static create(props: DeliveryErrorProps): DeliveryErrorVO {
    if (!ALLOWED_REASONS.includes(props.reason)) {
      throw new ValidationError(
        `Invalid delivery failure reason "${props.reason}". Allowed: ${ALLOWED_REASONS.join(', ')}`,
        'reason',
      );
    }
    if (typeof props.message !== 'string' || props.message.trim().length === 0) {
      throw new ValidationError('Delivery error message is required', 'message');
    }
    if (props.message.length > MAX_MESSAGE_LENGTH) {
      throw new ValidationError(
        `Delivery error message exceeds ${MAX_MESSAGE_LENGTH} chars`,
        'message',
      );
    }
    return new DeliveryErrorVO(props);
  }

  static reconstitute(props: DeliveryErrorProps): DeliveryErrorVO {
    return new DeliveryErrorVO(props);
  }

  get reason(): DeliveryFailureReasonValue { return this.value.reason; }
  get message(): string { return this.value.message; }
  get providerCode(): string | undefined { return this.value.providerCode; }
  get retryable(): boolean { return this.value.retryable; }
}
