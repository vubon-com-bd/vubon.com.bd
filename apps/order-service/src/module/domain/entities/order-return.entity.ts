/**
 * OrderReturnEntity — aggregate root for order return
 * @module order-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_RETURN, ORDER_RETURN_STATUS } from '@vubon/shared-constants/business/order';
import { ReturnIdVO } from '../value-objects/primitives/return-id.vo.js';
import { ReturnReasonVO } from '../value-objects/primitives/return-reason.vo.js';
import { ReturnStatusVO } from '../value-objects/primitives/return-status.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';
import { OrderItemIdVO } from '../value-objects/primitives/order-item-id.vo.js';
import {
  OrderReturnRequestedEvent,
  OrderReturnApprovedEvent,
  OrderReturnRejectedEvent,
  OrderReturnPickedUpEvent,
  OrderReturnReceivedEvent,
  OrderReturnInspectedEvent,
  OrderReturnCompletedEvent,
  OrderReturnClosedEvent,
} from '../events/order-return.events.js';

export interface OrderReturnEntityProps {
  readonly orderId: OrderIdVO;
  readonly customerId: CustomerIdVO;
  readonly status: ReturnStatusVO;
  readonly reason: ReturnReasonVO;
  readonly itemIds: readonly OrderItemIdVO[];
  readonly images: readonly string[];
  readonly notes?: string;
  readonly refundAmount?: number;
  readonly restockFee?: number;
  readonly currency: string;
  readonly requestedAt: string;
  readonly approvedAt?: string;
  readonly pickedUpAt?: string;
  readonly receivedAt?: string;
  readonly refundedAt?: string;
  readonly closedAt?: string;
}

export class OrderReturnEntity extends AggregateRoot<string> {
  private _status: ReturnStatusVO;
  private _refundAmount?: number;
  private _restockFee?: number;
  private _notes?: string;
  private _approvedAt?: string;
  private _pickedUpAt?: string;
  private _receivedAt?: string;
  private _refundedAt?: string;
  private _closedAt?: string;

  private readonly _orderId: OrderIdVO;
  private readonly _customerId: CustomerIdVO;
  private readonly _reason: ReturnReasonVO;
  private readonly _itemIds: readonly OrderItemIdVO[];
  private readonly _images: readonly string[];
  private readonly _currency: string;
  private readonly _requestedAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: OrderReturnEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._customerId = props.customerId;
    this._status = props.status;
    this._reason = props.reason;
    this._itemIds = props.itemIds;
    this._images = props.images;
    this._notes = props.notes;
    this._refundAmount = props.refundAmount;
    this._restockFee = props.restockFee;
    this._currency = props.currency;
    this._requestedAt = props.requestedAt;
    this._approvedAt = props.approvedAt;
    this._pickedUpAt = props.pickedUpAt;
    this._receivedAt = props.receivedAt;
    this._refundedAt = props.refundedAt;
    this._closedAt = props.closedAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._itemIds.length === 0) {
      throw new ValidationError('Return must reference at least one item', 'itemIds');
    }
    if (this._images.length > ORDER_RETURN.MAX_IMAGES) {
      throw new ValidationError(`Cannot exceed ${ORDER_RETURN.MAX_IMAGES} images`, 'images');
    }
  }

  get toIdVO(): ReturnIdVO { return ReturnIdVO.reconstitute(this.id); }
  get orderId(): OrderIdVO { return this._orderId; }
  get customerId(): CustomerIdVO { return this._customerId; }
  get status(): ReturnStatusVO { return this._status; }
  get reason(): ReturnReasonVO { return this._reason; }
  get itemIds(): readonly OrderItemIdVO[] { return this._itemIds; }
  get images(): readonly string[] { return this._images; }
  get notes(): string | undefined { return this._notes; }
  get refundAmount(): number | undefined { return this._refundAmount; }
  get restockFee(): number | undefined { return this._restockFee; }
  get currency(): string { return this._currency; }
  get requestedAt(): string { return this._requestedAt; }
  get approvedAt(): string | undefined { return this._approvedAt; }
  get pickedUpAt(): string | undefined { return this._pickedUpAt; }
  get receivedAt(): string | undefined { return this._receivedAt; }
  get refundedAt(): string | undefined { return this._refundedAt; }
  get closedAt(): string | undefined { return this._closedAt; }

  get itemCount(): number { return this._itemIds.length; }
  get isComplete(): boolean { return this._status.isFinal(); }

  netRefund(): number {
    const refund = this._refundAmount ?? 0;
    const fee = this._restockFee ?? 0;
    return Math.round((refund - fee) * 100) / 100;
  }

  approve(approvedBy: string, now: string): void {
    if (!this._status.isRequested()) {
      throw new BusinessRuleError(`Cannot approve in status "${this._status.value}"`, 'INVALID_STATUS');
    }
    this._status = ReturnStatusVO.create(ORDER_RETURN_STATUS.APPROVED);
    this._approvedAt = now;
    this.addDomainEvent(
      new OrderReturnApprovedEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, orderId: this._orderId.value, approvedBy, approvedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  reject(rejectedBy: string, reason: string, now: string): void {
    if (!this._status.isRequested()) {
      throw new BusinessRuleError(`Cannot reject in status "${this._status.value}"`, 'INVALID_STATUS');
    }
    this._status = ReturnStatusVO.create(ORDER_RETURN_STATUS.REJECTED);
    this.addDomainEvent(
      new OrderReturnRejectedEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, orderId: this._orderId.value, rejectedBy, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  pickUp(courierId: string | undefined, now: string): void {
    this._status = ReturnStatusVO.create(ORDER_RETURN_STATUS.PICKED_UP);
    this._pickedUpAt = now;
    this.addDomainEvent(
      new OrderReturnPickedUpEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, orderId: this._orderId.value, pickedUpAt: now, courierId },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  receive(warehouseId: string | undefined, now: string): void {
    this._status = ReturnStatusVO.create(ORDER_RETURN_STATUS.RECEIVED);
    this._receivedAt = now;
    this.addDomainEvent(
      new OrderReturnReceivedEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, orderId: this._orderId.value, receivedAt: now, warehouseId },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  inspect(condition: string, notes: string | undefined, now: string): void {
    this._status = ReturnStatusVO.create(ORDER_RETURN_STATUS.INSPECTED);
    this.addDomainEvent(
      new OrderReturnInspectedEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, orderId: this._orderId.value, inspectedAt: now, condition, notes },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  complete(refundAmount: number, restockFee: number, now: string): void {
    if (refundAmount < 0 || restockFee < 0) {
      throw new ValidationError('Amounts cannot be negative', 'refundAmount');
    }
    this._status = ReturnStatusVO.create(ORDER_RETURN_STATUS.REFUNDED);
    this._refundAmount = refundAmount;
    this._restockFee = restockFee;
    this._refundedAt = now;
    this.addDomainEvent(
      new OrderReturnCompletedEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, orderId: this._orderId.value, completedAt: now, refundAmount, restockFee, currency: this._currency },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  close(resolution: 'refunded' | 'replaced', now: string): void {
    this._status = ReturnStatusVO.create(ORDER_RETURN_STATUS.CLOSED);
    this._closedAt = now;
    this.addDomainEvent(
      new OrderReturnClosedEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, orderId: this._orderId.value, closedAt: now, resolution },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: string;
    props: OrderReturnEntityProps;
    now: string;
  }): OrderReturnEntity {
    const entity = new OrderReturnEntity(params.id, params.now, params.now, params.props);
    entity.addDomainEvent(
      new OrderReturnRequestedEvent({
        aggregateId: params.id,
        payload: {
          returnId: params.id,
          orderId: params.props.orderId.value,
          customerId: params.props.customerId.value,
          reason: params.props.reason.value,
          itemIds: params.props.itemIds.map((i) => i.value),
          images: params.props.images,
        },
        version: 1,
      }),
    );
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: OrderReturnEntityProps;
    version?: number;
  }): OrderReturnEntity {
    const entity = new OrderReturnEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
