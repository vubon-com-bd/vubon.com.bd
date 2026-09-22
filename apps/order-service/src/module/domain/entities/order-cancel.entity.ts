import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { CancelIdVO } from '../value-objects/primitives/cancel-id.vo';
import { CancelReasonVO } from '../value-objects/primitives/cancel-reason.vo';
import { CancelStatusVO } from '../value-objects/primitives/cancel-status.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo';
import {
  OrderCancelRequestedEvent,
  OrderCancelApprovedEvent,
  OrderCancelRejectedEvent,
  OrderCancelCompletedEvent,
} from '../events/order-cancel.events';

export interface OrderCancelEntityProps {
  readonly orderId: OrderIdVO;
  readonly customerId: CustomerIdVO;
  readonly reason: CancelReasonVO;
  readonly status: CancelStatusVO;
  readonly approvedAt: Date | null;
  readonly rejectedAt: Date | null;
}

export class OrderCancelEntity extends AggregateRoot<CancelIdVO> {
  private readonly _orderId: OrderIdVO;
  private readonly _customerId: CustomerIdVO;
  private readonly _reason: CancelReasonVO;
  private readonly _status: CancelStatusVO;
  private readonly _approvedAt: Date | null;
  private readonly _rejectedAt: Date | null;

  private constructor(
    id: CancelIdVO,
    props: OrderCancelEntityProps,
    createdAt: string,
    updatedAt: string,
  ) {
    super(id, createdAt, updatedAt);
    this._orderId = props.orderId;
    this._customerId = props.customerId;
    this._reason = props.reason;
    this._status = props.status;
    this._approvedAt = props.approvedAt;
    this._rejectedAt = props.rejectedAt;
  }

  static create(props: OrderCancelEntityProps): OrderCancelEntity {
    const now = new Date().toISOString();
    const id = CancelIdVO.create(crypto.randomUUID());
    const entity = new OrderCancelEntity(id, props, now, now);
    entity.addDomainEvent(
      new OrderCancelRequestedEvent(
        id.value,
        id.value,
        props.orderId.value,
        props.reason.value,
        0,
      ),
    );
    return entity;
  }

  static reconstitute(
    id: CancelIdVO,
    props: OrderCancelEntityProps,
    createdAt: string,
    updatedAt: string,
  ): OrderCancelEntity {
    return new OrderCancelEntity(id, props, createdAt, updatedAt);
  }

  approve(): OrderCancelEntity {
    const now = new Date();
    const updated = new OrderCancelEntity(
      this.id,
      { ...this._toProps(), status: CancelStatusVO.create('approved'), approvedAt: now },
      this.createdAt,
      now.toISOString(),
    );
    updated.addDomainEvent(
      new OrderCancelApprovedEvent(this.id.value, this.id.value, this._orderId.value, this.version + 1),
    );
    return updated;
  }

  reject(reason: string): OrderCancelEntity {
    const now = new Date();
    const updated = new OrderCancelEntity(
      this.id,
      { ...this._toProps(), status: CancelStatusVO.create('rejected'), rejectedAt: now },
      this.createdAt,
      now.toISOString(),
    );
    updated.addDomainEvent(
      new OrderCancelRejectedEvent(
        this.id.value,
        this.id.value,
        this._orderId.value,
        reason,
        this.version + 1,
      ),
    );
    return updated;
  }

  complete(): OrderCancelEntity {
    const now = new Date();
    const updated = new OrderCancelEntity(
      this.id,
      { ...this._toProps(), status: CancelStatusVO.create('cancelled') },
      this.createdAt,
      now.toISOString(),
    );
    updated.addDomainEvent(
      new OrderCancelCompletedEvent(this.id.value, this.id.value, this._orderId.value, this.version + 1),
    );
    return updated;
  }

  get orderId(): OrderIdVO { return this._orderId; }
  get customerId(): CustomerIdVO { return this._customerId; }
  get reason(): CancelReasonVO { return this._reason; }
  get status(): CancelStatusVO { return this._status; }
  get approvedAt(): Date | null { return this._approvedAt; }
  get rejectedAt(): Date | null { return this._rejectedAt; }

  private _toProps(): OrderCancelEntityProps {
    return {
      orderId: this._orderId,
      customerId: this._customerId,
      reason: this._reason,
      status: this._status,
      approvedAt: this._approvedAt,
      rejectedAt: this._rejectedAt,
    };
  }
}
