/**
 * OrderCancelEntity — aggregate root for order cancellation
 * @module order-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER_CANCEL, ORDER_CANCEL_STATUS } from '@vubon/shared-constants/business/order';
import { CancelIdVO } from '../value-objects/primitives/cancel-id.vo.js';
import { CancelReasonVO } from '../value-objects/primitives/cancel-reason.vo.js';
import { CancelStatusVO } from '../value-objects/primitives/cancel-status.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';
import {
  OrderCancelRequestedEvent,
  OrderCancelApprovedEvent,
  OrderCancelRejectedEvent,
  OrderCancelProcessedEvent,
} from '../events/order-cancel.events.js';

export interface OrderCancelEntityProps {
  readonly orderId: OrderIdVO;
  readonly reason: CancelReasonVO;
  readonly status: CancelStatusVO;
  readonly requestedBy: CustomerIdVO;
  readonly approvedBy?: CustomerIdVO;
  readonly notes?: string;
  readonly refundAmount?: number;
  readonly currency: string;
  readonly restockInventory: boolean;
  readonly requestedAt: string;
  readonly processedAt?: string;
}

export class OrderCancelEntity extends AggregateRoot<string> {
  private _status: CancelStatusVO;
  private _approvedBy?: CustomerIdVO;
  private _refundAmount?: number;
  private _processedAt?: string;
  private _notes?: string;

  private readonly _orderId: OrderIdVO;
  private readonly _reason: CancelReasonVO;
  private readonly _requestedBy: CustomerIdVO;
  private readonly _currency: string;
  private readonly _restockInventory: boolean;
  private readonly _requestedAt: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: OrderCancelEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderId = props.orderId;
    this._reason = props.reason;
    this._status = props.status;
    this._requestedBy = props.requestedBy;
    this._approvedBy = props.approvedBy;
    this._notes = props.notes;
    this._refundAmount = props.refundAmount;
    this._currency = props.currency;
    this._restockInventory = props.restockInventory;
    this._requestedAt = props.requestedAt;
    this._processedAt = props.processedAt;
  }

  get toIdVO(): CancelIdVO { return CancelIdVO.reconstitute(this.id); }
  get orderId(): OrderIdVO { return this._orderId; }
  get reason(): CancelReasonVO { return this._reason; }
  get status(): CancelStatusVO { return this._status; }
  get requestedBy(): CustomerIdVO { return this._requestedBy; }
  get approvedBy(): CustomerIdVO | undefined { return this._approvedBy; }
  get notes(): string | undefined { return this._notes; }
  get refundAmount(): number | undefined { return this._refundAmount; }
  get currency(): string { return this._currency; }
  get restockInventory(): boolean { return this._restockInventory; }
  get requestedAt(): string { return this._requestedAt; }
  get processedAt(): string | undefined { return this._processedAt; }

  isPending(): boolean { return this._status.isRequested(); }
  isApproved(): boolean { return this._status.isApproved(); }
  isFinalized(): boolean { return this._status.isFinal(); }
  hasRefund(): boolean { return (this._refundAmount ?? 0) > 0; }

  approve(approvedBy: CustomerIdVO, refundAmount: number | undefined, now: string): void {
    if (!this._status.isRequested()) {
      throw new BusinessRuleError(
        `Cannot approve cancel in status "${this._status.value}"`,
        'INVALID_CANCEL_STATUS',
      );
    }
    if (refundAmount !== undefined && refundAmount < 0) {
      throw new ValidationError('Refund amount cannot be negative', 'refundAmount');
    }
    this._status = CancelStatusVO.create(ORDER_CANCEL_STATUS.APPROVED);
    this._approvedBy = approvedBy;
    this._refundAmount = refundAmount;
    this.addDomainEvent(
      new OrderCancelApprovedEvent({
        aggregateId: this.id,
        payload: {
          cancelId: this.id,
          orderId: this._orderId.value,
          approvedBy: approvedBy.value,
          refundAmount,
          currency: this._currency,
          restockInventory: this._restockInventory,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  reject(rejectedBy: CustomerIdVO, reason: string, now: string): void {
    if (!this._status.isRequested()) {
      throw new BusinessRuleError(`Cannot reject in status "${this._status.value}"`, 'INVALID_STATUS');
    }
    this._status = CancelStatusVO.create(ORDER_CANCEL_STATUS.REJECTED);
    this.addDomainEvent(
      new OrderCancelRejectedEvent({
        aggregateId: this.id,
        payload: { cancelId: this.id, orderId: this._orderId.value, rejectedBy: rejectedBy.value, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  process(refundId: string | undefined, now: string): void {
    if (!this._status.isApproved()) {
      throw new BusinessRuleError(`Cannot process — status is "${this._status.value}"`, 'NOT_APPROVED');
    }
    this._status = CancelStatusVO.create(ORDER_CANCEL_STATUS.PROCESSED);
    this._processedAt = now;
    this.addDomainEvent(
      new OrderCancelProcessedEvent({
        aggregateId: this.id,
        payload: { cancelId: this.id, orderId: this._orderId.value, processedAt: now, refundId },
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
    props: OrderCancelEntityProps;
    now: string;
  }): OrderCancelEntity {
    const entity = new OrderCancelEntity(params.id, params.now, params.now, params.props);
    entity.addDomainEvent(
      new OrderCancelRequestedEvent({
        aggregateId: params.id,
        payload: {
          cancelId: params.id,
          orderId: params.props.orderId.value,
          reason: params.props.reason.value,
          requestedBy: params.props.requestedBy.value,
          notes: params.props.notes,
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
    props: OrderCancelEntityProps;
    version?: number;
  }): OrderCancelEntity {
    const entity = new OrderCancelEntity(
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
