import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { DeliveryAttemptVO } from '../value-objects/primitives/delivery-attempt.vo';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo';
import { DeliveryErrorVO } from '../value-objects/primitives/delivery-error.vo';

export interface NotificationAttemptEntityProps {
  readonly deliveryId: string;
  readonly attemptNumber: DeliveryAttemptVO;
  readonly status: DeliveryStatusVO;
  readonly error: DeliveryErrorVO | null;
  readonly attemptedAt: Date;
}

export class NotificationAttemptEntity extends BaseEntity<string> {
  private readonly _deliveryId: string;
  private readonly _attemptNumber: DeliveryAttemptVO;
  private readonly _status: DeliveryStatusVO;
  private readonly _error: DeliveryErrorVO | null;
  private readonly _attemptedAt: Date;

  private constructor(
    id: string,
    props: NotificationAttemptEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._deliveryId = props.deliveryId;
    this._attemptNumber = props.attemptNumber;
    this._status = props.status;
    this._error = props.error;
    this._attemptedAt = props.attemptedAt;
  }

  static create(props: NotificationAttemptEntityProps): NotificationAttemptEntity {
    const now = new Date().toISOString();
    return new NotificationAttemptEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: NotificationAttemptEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): NotificationAttemptEntity {
    return new NotificationAttemptEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get deliveryId(): string { return this._deliveryId; }
  get attemptNumber(): DeliveryAttemptVO { return this._attemptNumber; }
  get status(): DeliveryStatusVO { return this._status; }
  get error(): DeliveryErrorVO | null { return this._error; }
  get attemptedAt(): Date { return this._attemptedAt; }
}
