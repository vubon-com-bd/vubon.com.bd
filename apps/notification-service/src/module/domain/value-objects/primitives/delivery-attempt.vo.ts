/**
 * DeliveryAttempt Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { InvalidDeliveryAttemptError } from '@domain/errors/delivery.errors.js';

export interface DeliveryAttemptProps {
  readonly attemptNumber: number;
  readonly attemptedAt: string;
  readonly succeeded: boolean;
  readonly errorMessage?: string;
  readonly providerMessageId?: string;
}

const MAX_ATTEMPT_NUMBER = 20;

export class DeliveryAttemptVO extends BaseVO<DeliveryAttemptProps> {
  private constructor(value: DeliveryAttemptProps) {
    super(value);
  }

  static create(props: DeliveryAttemptProps): DeliveryAttemptVO {
    if (!Number.isInteger(props.attemptNumber) || props.attemptNumber < 1) {
      throw new InvalidDeliveryAttemptError('attemptNumber must be a positive integer');
    }
    if (props.attemptNumber > MAX_ATTEMPT_NUMBER) {
      throw new InvalidDeliveryAttemptError(`attemptNumber exceeds max ${MAX_ATTEMPT_NUMBER}`);
    }
    if (typeof props.attemptedAt !== 'string' || props.attemptedAt.length === 0) {
      throw new InvalidDeliveryAttemptError('attemptedAt is required');
    }
    if (props.succeeded && props.errorMessage) {
      throw new InvalidDeliveryAttemptError('succeeded attempt cannot have errorMessage');
    }
    return new DeliveryAttemptVO(props);
  }

  static reconstitute(props: DeliveryAttemptProps): DeliveryAttemptVO {
    return new DeliveryAttemptVO(props);
  }

  get attemptNumber(): number { return this.value.attemptNumber; }
  get attemptedAt(): string { return this.value.attemptedAt; }
  get succeeded(): boolean { return this.value.succeeded; }
  get errorMessage(): string | undefined { return this.value.errorMessage; }
  get providerMessageId(): string | undefined { return this.value.providerMessageId; }
}
