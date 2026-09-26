import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { UserIdVO } from '../value-objects/primitives/user-id.vo';
import { DeliveryStatusVO } from '../value-objects/primitives/delivery-status.vo';
import { DeliveryErrorVO } from '../value-objects/primitives/delivery-error.vo';

export interface BroadcastResultEntityProps {
  readonly broadcastId: string;
  readonly userId: UserIdVO;
  readonly status: DeliveryStatusVO;
  readonly deliveredAt: Date | null;
  readonly error: DeliveryErrorVO | null;
}

export class BroadcastResultEntity extends BaseEntity<string> {
  private readonly _broadcastId: string;
  private readonly _userId: UserIdVO;
  private readonly _status: DeliveryStatusVO;
  private readonly _deliveredAt: Date | null;
  private readonly _error: DeliveryErrorVO | null;

  private constructor(
    id: string,
    props: BroadcastResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._broadcastId = props.broadcastId;
    this._userId = props.userId;
    this._status = props.status;
    this._deliveredAt = props.deliveredAt;
    this._error = props.error;
  }

  static create(props: BroadcastResultEntityProps): BroadcastResultEntity {
    const now = new Date().toISOString();
    return new BroadcastResultEntity(crypto.randomUUID(), props, now, now, null);
  }

  static reconstitute(
    id: string,
    props: BroadcastResultEntityProps,
    createdAt: string,
    updatedAt: string,
    deletedAt: string | null,
  ): BroadcastResultEntity {
    return new BroadcastResultEntity(id, props, createdAt, updatedAt, deletedAt);
  }

  get broadcastId(): string { return this._broadcastId; }
  get userId(): UserIdVO { return this._userId; }
  get status(): DeliveryStatusVO { return this._status; }
  get deliveredAt(): Date | null { return this._deliveredAt; }
  get error(): DeliveryErrorVO | null { return this._error; }
}
