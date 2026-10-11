/**
 * DeliveryFailureReason Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_DELIVERY_FAILURE_REASON } from '@vubon/shared-constants/platform/notification';
import { InvalidDeliveryFailureReasonError } from '../../errors/delivery.errors.js';

type FailureReasonValue =
  (typeof NOTIFICATION_DELIVERY_FAILURE_REASON)[keyof typeof NOTIFICATION_DELIVERY_FAILURE_REASON];
const ALLOWED = Object.values(NOTIFICATION_DELIVERY_FAILURE_REASON) as readonly string[];

export class DeliveryFailureReasonVO extends BaseTypeVO<FailureReasonValue> {
  private constructor(value: FailureReasonValue) {
    super(value);
  }

  static override allowedValues(): ReadonlySet<string> {
    return new Set<string>(ALLOWED);
  }

  static create(raw: string): DeliveryFailureReasonVO {
    if (!ALLOWED.includes(raw)) {
      throw new InvalidDeliveryFailureReasonError(raw, ALLOWED);
    }
    return new DeliveryFailureReasonVO(raw as FailureReasonValue);
  }

  static reconstitute(raw: string): DeliveryFailureReasonVO {
    return new DeliveryFailureReasonVO(raw as FailureReasonValue);
  }

  // Named constructors
  static invalidAddress(): DeliveryFailureReasonVO { return new DeliveryFailureReasonVO(NOTIFICATION_DELIVERY_FAILURE_REASON.INVALID_ADDRESS); }
  static invalidPhone(): DeliveryFailureReasonVO { return new DeliveryFailureReasonVO(NOTIFICATION_DELIVERY_FAILURE_REASON.INVALID_PHONE); }
  static invalidToken(): DeliveryFailureReasonVO { return new DeliveryFailureReasonVO(NOTIFICATION_DELIVERY_FAILURE_REASON.INVALID_TOKEN); }
  static rateLimited(): DeliveryFailureReasonVO { return new DeliveryFailureReasonVO(NOTIFICATION_DELIVERY_FAILURE_REASON.RATE_LIMITED); }
  static quotaExceeded(): DeliveryFailureReasonVO { return new DeliveryFailureReasonVO(NOTIFICATION_DELIVERY_FAILURE_REASON.QUOTA_EXCEEDED); }
  static gatewayError(): DeliveryFailureReasonVO { return new DeliveryFailureReasonVO(NOTIFICATION_DELIVERY_FAILURE_REASON.GATEWAY_ERROR); }
  static networkError(): DeliveryFailureReasonVO { return new DeliveryFailureReasonVO(NOTIFICATION_DELIVERY_FAILURE_REASON.NETWORK_ERROR); }
  static timeout(): DeliveryFailureReasonVO { return new DeliveryFailureReasonVO(NOTIFICATION_DELIVERY_FAILURE_REASON.TIMEOUT); }
  static unsubscribed(): DeliveryFailureReasonVO { return new DeliveryFailureReasonVO(NOTIFICATION_DELIVERY_FAILURE_REASON.UNSUBSCRIBED); }
  static blocked(): DeliveryFailureReasonVO { return new DeliveryFailureReasonVO(NOTIFICATION_DELIVERY_FAILURE_REASON.BLOCKED); }
  static unknown(): DeliveryFailureReasonVO { return new DeliveryFailureReasonVO(NOTIFICATION_DELIVERY_FAILURE_REASON.UNKNOWN); }

  isRetryable(): boolean {
    return (
      this.value === NOTIFICATION_DELIVERY_FAILURE_REASON.RATE_LIMITED ||
      this.value === NOTIFICATION_DELIVERY_FAILURE_REASON.QUOTA_EXCEEDED ||
      this.value === NOTIFICATION_DELIVERY_FAILURE_REASON.GATEWAY_ERROR ||
      this.value === NOTIFICATION_DELIVERY_FAILURE_REASON.NETWORK_ERROR ||
      this.value === NOTIFICATION_DELIVERY_FAILURE_REASON.TIMEOUT
    );
  }

  isPermanent(): boolean {
    return (
      this.value === NOTIFICATION_DELIVERY_FAILURE_REASON.INVALID_ADDRESS ||
      this.value === NOTIFICATION_DELIVERY_FAILURE_REASON.INVALID_PHONE ||
      this.value === NOTIFICATION_DELIVERY_FAILURE_REASON.INVALID_TOKEN ||
      this.value === NOTIFICATION_DELIVERY_FAILURE_REASON.UNSUBSCRIBED ||
      this.value === NOTIFICATION_DELIVERY_FAILURE_REASON.BLOCKED
    );
  }
}
