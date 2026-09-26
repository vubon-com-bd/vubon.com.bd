import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { ReturnIdVO } from '../value-objects/primitives/return-id.vo';
import { ReturnReasonVO } from '../value-objects/primitives/return-reason.vo';
import { ReturnStatusVO } from '../value-objects/primitives/return-status.vo';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo';
import {
  OrderReturnRequestedEvent,
  OrderReturnApprovedEvent,
  OrderReturnRejectedEvent,
  OrderReturnCompletedEvent,
} from '../events/order-return.events';

export interface OrderReturnEntityProps {
  readonly orderId: OrderIdVO;
  readonly customerId: CustomerIdVO;
  readonly reason: ReturnReasonVO;
  readonly status: ReturnStatusVO;
  readonly approvedAt: Date | null;
  readonly rejectedAt: Date | null;
  readonly completedAt: Date | null;
}

export class OrderReturnEntity extends AggregateRoot<ReturnIdVO> {
  private readonly _orderId: OrderIdVO;
  private readonly _customerId: CustomerIdVO;
  private readonly _reason: ReturnReasonVO;
  private readonly _status: ReturnStatusVO;
  private readonly _approvedAt: Date | null;
  private readonly _rejectedAt: Date | null;
  private readonly _completedAt: Date | null;

  private constructor(
    id: ReturnIdVO,
    props: OrderReturnEntityProps,
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
    this._completedAt = props.completedAt;
  }

  static create(props: OrderReturnEntityProps): OrderReturnEntity {
    const now = new Date().toISOString();
    const id = ReturnIdVO.create(crypto.randomUUID());
    const entity = new OrderReturnEntity(id, props, now, now);
    entity.addDomainEvent(
      new OrderReturnRequestedEvent(
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
    id: ReturnIdVO,
    props: OrderReturnEntityProps,
    createdAt: string,
    updatedAt: string,
  ): OrderReturnEntity {
    return new OrderReturnEntity(id, props, createdAt, updatedAt);
  }

  approve(): OrderReturnEntity {
    const now = new Date();
    const updated = new OrderReturnEntity(
      this.id,
      { ...this._toProps(), status: ReturnStatusVO.create('approved'), approvedAt: now },
      this.createdAt,
      now.toISOString(),
    );
    updated.addDomainEvent(
      new OrderReturnApprovedEvent(this.id.value, this.id.value, this._orderId.value, this.version + 1),
    );
    return updated;
  }

  reject(reason: string): OrderReturnEntity {
    void reason;
    const now = new Date();
    const updated = new OrderReturnEntity(
      this.id,
      { ...this._toProps(), status: ReturnStatusVO.create('rejected'), rejectedAt: now },
      this.createdAt,
      now.toISOString(),
    );
    updated.addDomainEvent(
      new OrderReturnRejectedEvent(
        this.id.value,
        this.id.value,
        this._orderId.value,
        reason,
        this.version + 1,
      ),
    );
    return updated;
  }

  complete(): OrderReturnEntity {
    const now = new Date();
    const updated = new OrderReturnEntity(
      this.id,
      { ...this._toProps(), status: ReturnStatusVO.create('completed'), completedAt: now },
      this.createdAt,
      now.toISOString(),
    );
    updated.addDomainEvent(
      new OrderReturnCompletedEvent(this.id.value, this.id.value, this._orderId.value, this.version + 1),
    );
    return updated;
  }

  get orderId(): OrderIdVO { return this._orderId; }
  get customerId(): CustomerIdVO { return this._customerId; }
  get reason(): ReturnReasonVO { return this._reason; }
  get status(): ReturnStatusVO { return this._status; }
  get approvedAt(): Date | null { return this._approvedAt; }
  get rejectedAt(): Date | null { return this._rejectedAt; }
  get completedAt(): Date | null { return this._completedAt; }

  private _toProps(): OrderReturnEntityProps {
    return {
      orderId: this._orderId,
      customerId: this._customerId,
      reason: this._reason,
      status: this._status,
      approvedAt: this._approvedAt,
      rejectedAt: this._rejectedAt,
      completedAt: this._completedAt,
    };
  }
}
