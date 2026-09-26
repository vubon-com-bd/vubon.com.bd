import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { NotificationIdVO } from '../value-objects/primitives/notification-id.vo';
import { ProviderNameVO } from '../value-objects/primitives/provider-name.vo';
import { ProviderMessageIdVO } from '../value-objects/primitives/provider-message-id.vo';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo';
import { DeliveryAttemptVO } from '../value-objects/primitives/delivery-attempt.vo';
import { DeliveryErrorVO } from '../value-objects/primitives/delivery-error.vo';

export interface NotificationDeliveryEntityProps {
  readonly notificationId: NotificationIdVO;
  readonly providerName: ProviderNameVO;
  readonly providerMessageId: ProviderMessageIdVO | null;
  readonly status: DeliveryStatusVO;
  readonly attemptCount: DeliveryAttemptVO;
  readonly lastError: DeliveryErrorVO | null;
  readonly deliveredAt: Date | null;
}

export class NotificationDeliveryEntity extends AggregateRoot<string> {
  private readonly _notificationId: NotificationIdVO;
  private readonly _providerName: ProviderNameVO;
  private readonly _providerMessageId: ProviderMessageIdVO | null;
  private readonly _status: DeliveryStatusVO;
  private readonly _attemptCount: DeliveryAttemptVO;
  private readonly _lastError: DeliveryErrorVO | null;
  private readonly _deliveredAt: Date | null;

  private constructor(
    id: string,
    props: NotificationDeliveryEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._notificationId = props.notificationId;
    this._providerName = props.providerName;
    this._providerMessageId = props.providerMessageId;
    this._status = props.status;
    this._attemptCount = props.attemptCount;
    this._lastError = props.lastError;
    this._deliveredAt = props.deliveredAt;
  }

  static create(props: NotificationDeliveryEntityProps): NotificationDeliveryEntity {
    const now = new Date().toISOString();
    return new NotificationDeliveryEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: NotificationDeliveryEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): NotificationDeliveryEntity {
    return new NotificationDeliveryEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  markDelivered(messageId: ProviderMessageIdVO): NotificationDeliveryEntity {
    const now = new Date();
    return new NotificationDeliveryEntity(
      this.id,
      {
        ...this._toProps(),
        status: DeliveryStatusVO.create('delivered'),
        providerMessageId: messageId,
        deliveredAt: now,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  recordFailure(error: DeliveryErrorVO): NotificationDeliveryEntity {
    const now = new Date();
    return new NotificationDeliveryEntity(
      this.id,
      {
        ...this._toProps(),
        status: DeliveryStatusVO.create('failed'),
        attemptCount: this._attemptCount.increment(),
        lastError: error,
      },
      this.createdAt,
      now.toISOString(),
      this.deletedAt ?? null,
    );
  }

  get notificationId(): NotificationIdVO { return this._notificationId; }
  get providerName(): ProviderNameVO { return this._providerName; }
  get providerMessageId(): ProviderMessageIdVO | null { return this._providerMessageId; }
  get status(): DeliveryStatusVO { return this._status; }
  get attemptCount(): DeliveryAttemptVO { return this._attemptCount; }
  get lastError(): DeliveryErrorVO | null { return this._lastError; }
  get deliveredAt(): Date | null { return this._deliveredAt; }
  get isDelivered(): boolean { return this._status.isDelivered(); }

  private _toProps(): NotificationDeliveryEntityProps {
    return {
      notificationId: this._notificationId,
      providerName: this._providerName,
      providerMessageId: this._providerMessageId,
      status: this._status,
      attemptCount: this._attemptCount,
      lastError: this._lastError,
      deliveredAt: this._deliveredAt,
    };
  }
}
