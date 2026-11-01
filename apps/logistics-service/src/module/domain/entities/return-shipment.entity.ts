/**
 * ReturnShipmentEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RETURN_SHIPMENT } from '@vubon/shared-constants/logistics';

import { ReturnShipmentIdVO } from '../value-objects/primitives/return-shipment-id.vo.js';
import { ReturnShipmentStatusVO } from '../value-objects/primitives/return-shipment-status.vo.js';
import { ReturnReasonVO } from '../value-objects/primitives/return-reason.vo.js';
import { ReturnShipmentTypeVO } from '../value-objects/primitives/return-shipment-type.vo.js';

import {
  ReturnShipmentRequestedEvent,
  ReturnShipmentApprovedEvent,
  ReturnShipmentRejectedEvent,
  ReturnShipmentPickupScheduledEvent,
  ReturnShipmentPickedUpEvent,
  ReturnShipmentInTransitEvent,
  ReturnShipmentReceivedEvent,
  ReturnShipmentInspectedEvent,
  ReturnShipmentCompletedEvent,
  ReturnShipmentCancelledEvent,
  ReturnShipmentLostEvent,
  ReturnShipmentStatusChangedEvent,
} from '../events/return-shipment.events.js';

export interface ReturnShipmentEntityProps {
  readonly rmaNumber: string;
  readonly orderId: string;
  readonly originalShipmentId?: string;
  readonly userId: string;
  readonly status: ReturnShipmentStatusVO;
  readonly type: ReturnShipmentTypeVO;
  readonly reason: ReturnReasonVO;
  readonly description?: string;
  readonly images?: readonly string[];
  readonly itemIds: readonly string[];
  readonly pickupAddress: string;
  readonly pickupScheduledAt?: string;
  readonly pickedUpAt?: string;
  readonly inTransitAt?: string;
  readonly receivedAt?: string;
  readonly inspectedAt?: string;
  readonly inspectedBy?: string;
  readonly completedAt?: string;
  readonly cancelledAt?: string;
  readonly rejectedAt?: string;
  readonly lostAt?: string;
  readonly restockable: boolean;
  readonly refundAmount?: number;
  readonly refundCurrency?: string;
  readonly restockFeeAmount?: number;
  readonly trackingNumber?: string;
  readonly approveBy?: string;
  readonly rejectReason?: string;
  readonly cancelReason?: string;
  readonly notes?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

export class ReturnShipmentEntity extends AggregateRoot<string> {
  private _status: ReturnShipmentStatusVO;
  private _pickupScheduledAt?: string;
  private _pickedUpAt?: string;
  private _inTransitAt?: string;
  private _receivedAt?: string;
  private _inspectedAt?: string;
  private _inspectedBy?: string;
  private _completedAt?: string;
  private _cancelledAt?: string;
  private _rejectedAt?: string;
  private _lostAt?: string;
  private _restockable: boolean;
  private _refundAmount?: number;
  private _restockFeeAmount?: number;
  private _trackingNumber?: string;
  private _approveBy?: string;
  private _rejectReason?: string;
  private _cancelReason?: string;
  private _notes?: string;

  private readonly _rmaNumber: string;
  private readonly _orderId: string;
  private readonly _originalShipmentId?: string;
  private readonly _userId: string;
  private readonly _type: ReturnShipmentTypeVO;
  private readonly _reason: ReturnReasonVO;
  private readonly _description?: string;
  private readonly _images?: readonly string[];
  private readonly _itemIds: readonly string[];
  private readonly _pickupAddress: string;
  private readonly _refundCurrency?: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ReturnShipmentEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._rmaNumber = props.rmaNumber;
    this._orderId = props.orderId;
    this._originalShipmentId = props.originalShipmentId;
    this._userId = props.userId;
    this._status = props.status;
    this._type = props.type;
    this._reason = props.reason;
    this._description = props.description;
    this._images = props.images;
    this._itemIds = props.itemIds;
    this._pickupAddress = props.pickupAddress;
    this._pickupScheduledAt = props.pickupScheduledAt;
    this._pickedUpAt = props.pickedUpAt;
    this._inTransitAt = props.inTransitAt;
    this._receivedAt = props.receivedAt;
    this._inspectedAt = props.inspectedAt;
    this._inspectedBy = props.inspectedBy;
    this._completedAt = props.completedAt;
    this._cancelledAt = props.cancelledAt;
    this._rejectedAt = props.rejectedAt;
    this._lostAt = props.lostAt;
    this._restockable = props.restockable;
    this._refundAmount = props.refundAmount;
    this._refundCurrency = props.refundCurrency;
    this._restockFeeAmount = props.restockFeeAmount;
    this._trackingNumber = props.trackingNumber;
    this._approveBy = props.approveBy;
    this._rejectReason = props.rejectReason;
    this._cancelReason = props.cancelReason;
    this._notes = props.notes;
    this._metadata = props.metadata;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (!this._rmaNumber) {
      throw new ValidationError('RMA number required', 'rmaNumber');
    }
    if (!this._orderId) {
      throw new ValidationError('Order ID required', 'orderId');
    }
    if (!this._userId) {
      throw new ValidationError('User ID required', 'userId');
    }
    if (!this._pickupAddress) {
      throw new ValidationError('Pickup address required', 'pickupAddress');
    }
    if (this._itemIds.length === 0) {
      throw new ValidationError('At least one item required', 'itemIds');
    }
    if (this._refundAmount !== undefined) {
      if (this._refundAmount < 0) {
        throw new ValidationError('Refund cannot be negative', 'refundAmount');
      }
      if (this._refundAmount > RETURN_SHIPMENT.MAX_RETURN_VALUE) {
        throw new ValidationError(
          `Refund ${this._refundAmount} exceeds max ${RETURN_SHIPMENT.MAX_RETURN_VALUE}`,
          'refundAmount',
        );
      }
    }
    if (this._reason.requiresPhoto() && (!this._images || this._images.length === 0)) {
      throw new ValidationError(
        `Reason "${this._reason.value}" requires at least one photo`,
        'images',
      );
    }
  }

  get rmaNumber(): string { return this._rmaNumber; }
  get orderId(): string { return this._orderId; }
  get originalShipmentId(): string | undefined { return this._originalShipmentId; }
  get userId(): string { return this._userId; }
  get status(): ReturnShipmentStatusVO { return this._status; }
  get type(): ReturnShipmentTypeVO { return this._type; }
  get reason(): ReturnReasonVO { return this._reason; }
  get description(): string | undefined { return this._description; }
  get images(): readonly string[] | undefined { return this._images; }
  get itemIds(): readonly string[] { return this._itemIds; }
  get itemCount(): number { return this._itemIds.length; }
  get pickupAddress(): string { return this._pickupAddress; }
  get pickupScheduledAt(): string | undefined { return this._pickupScheduledAt; }
  get pickedUpAt(): string | undefined { return this._pickedUpAt; }
  get inTransitAt(): string | undefined { return this._inTransitAt; }
  get receivedAt(): string | undefined { return this._receivedAt; }
  get inspectedAt(): string | undefined { return this._inspectedAt; }
  get inspectedBy(): string | undefined { return this._inspectedBy; }
  get completedAt(): string | undefined { return this._completedAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get rejectedAt(): string | undefined { return this._rejectedAt; }
  get lostAt(): string | undefined { return this._lostAt; }
  get restockable(): boolean { return this._restockable; }
  get refundAmount(): number | undefined { return this._refundAmount; }
  get refundCurrency(): string | undefined { return this._refundCurrency; }
  get restockFeeAmount(): number | undefined { return this._restockFeeAmount; }
  get trackingNumber(): string | undefined { return this._trackingNumber; }
  get approveBy(): string | undefined { return this._approveBy; }
  get rejectReason(): string | undefined { return this._rejectReason; }
  get cancelReason(): string | undefined { return this._cancelReason; }
  get notes(): string | undefined { return this._notes; }
  get metadata(): Readonly<Record<string, unknown>> | undefined { return this._metadata; }

  get toIdVO(): ReturnShipmentIdVO {
    return ReturnShipmentIdVO.reconstitute(this.id);
  }

  isRequested(): boolean { return this._status.isRequested(); }
  isApproved(): boolean { return this._status.isApproved(); }
  isPickupScheduled(): boolean { return this._status.isPickupScheduled(); }
  isPickedUp(): boolean { return this._status.isPickedUp(); }
  isInTransit(): boolean { return this._status.isInTransit(); }
  isReceived(): boolean { return this._status.isReceived(); }
  isInspected(): boolean { return this._status.isInspected(); }
  isCompleted(): boolean { return this._status.isCompleted(); }
  isRejected(): boolean { return this._status.isRejected(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isLost(): boolean { return this._status.isLost(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isInProgress(): boolean { return this._status.isInProgress(); }

  hasRefund(): boolean {
    return (this._refundAmount ?? 0) > 0;
  }

  canBeApproved(): boolean { return this.isRequested(); }
  canBeCancelled(): boolean { return !this.isFinal(); }

  // ═══ Business Actions ═══
  approve(approvedBy: string, now: string = new Date().toISOString()): void {
    if (!this.canBeApproved()) {
      throw new BusinessRuleError(
        `Cannot approve return in status "${this._status.value}"`,
        'RETURN_CANNOT_BE_APPROVED',
        { returnId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('approved');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.create('approved');
    this._approveBy = approvedBy;
    this.emitStatusChange(from, 'approved');
    this.addDomainEvent(
      new ReturnShipmentApprovedEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, approvedAt: now, approvedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  reject(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('rejected');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.create('rejected');
    this._rejectedAt = now;
    this._rejectReason = reason;
    this.emitStatusChange(from, 'rejected', reason);
    this.addDomainEvent(
      new ReturnShipmentRejectedEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, reason, rejectedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  schedulePickup(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('pickup_scheduled');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.create('pickup_scheduled');
    this._pickupScheduledAt = now;
    this.emitStatusChange(from, 'pickup_scheduled');
    this.addDomainEvent(
      new ReturnShipmentPickupScheduledEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, pickupScheduledAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markPickedUp(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('picked_up');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.create('picked_up');
    this._pickedUpAt = now;
    this.emitStatusChange(from, 'picked_up');
    this.addDomainEvent(
      new ReturnShipmentPickedUpEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, pickedUpAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  startTransit(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('in_transit');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.create('in_transit');
    this._inTransitAt = now;
    this.emitStatusChange(from, 'in_transit');
    this.addDomainEvent(
      new ReturnShipmentInTransitEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, inTransitAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markReceived(receivedBy?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('received');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.create('received');
    this._receivedAt = now;
    this.emitStatusChange(from, 'received');
    this.addDomainEvent(
      new ReturnShipmentReceivedEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, receivedAt: now, receivedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  inspect(
    params: { restockable: boolean; inspectedBy?: string },
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('inspected');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.create('inspected');
    this._inspectedAt = now;
    this._inspectedBy = params.inspectedBy;
    this._restockable = params.restockable;
    this.emitStatusChange(from, 'inspected');
    this.addDomainEvent(
      new ReturnShipmentInspectedEvent({
        aggregateId: this.id,
        payload: {
          returnId: this.id,
          inspectedAt: now,
          restockable: params.restockable,
          inspectedBy: params.inspectedBy,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  complete(
    params: { refundAmount: number; restockFeeAmount?: number },
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('completed');
    const from = this._status.value;
    if (params.refundAmount < 0) {
      throw new ValidationError('Refund amount cannot be negative', 'refundAmount');
    }
    if (params.refundAmount > RETURN_SHIPMENT.MAX_RETURN_VALUE) {
      throw new ValidationError(
        `Refund ${params.refundAmount} exceeds max ${RETURN_SHIPMENT.MAX_RETURN_VALUE}`,
        'refundAmount',
      );
    }
    this._status = ReturnShipmentStatusVO.create('completed');
    this._completedAt = now;
    this._refundAmount = params.refundAmount;
    this._restockFeeAmount = params.restockFeeAmount;
    this.emitStatusChange(from, 'completed');
    this.addDomainEvent(
      new ReturnShipmentCompletedEvent({
        aggregateId: this.id,
        payload: {
          returnId: this.id,
          completedAt: now,
          refundAmount: params.refundAmount,
          refundCurrency: this._refundCurrency ?? 'BDT',
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Cannot cancel return in status "${this._status.value}"`,
        'RETURN_CANNOT_BE_CANCELLED',
        { returnId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.create('cancelled');
    this._cancelledAt = now;
    this._cancelReason = reason;
    this.emitStatusChange(from, 'cancelled', reason);
    this.addDomainEvent(
      new ReturnShipmentCancelledEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, reason, cancelledAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markLost(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('lost');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.create('lost');
    this._lostAt = now;
    this.emitStatusChange(from, 'lost');
    this.addDomainEvent(
      new ReturnShipmentLostEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, lostAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid return shipment status transition: "${this._status.value}" → "${target}"`,
        'INVALID_RETURN_SHIPMENT_STATUS_TRANSITION',
        { from: this._status.value, to: target, returnId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, reason?: string): void {
    this.addDomainEvent(
      new ReturnShipmentStatusChangedEvent({
        aggregateId: this.id,
        payload: { returnId: this.id, fromStatus: from, toStatus: to, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  static create(params: {
    id: ReturnShipmentIdVO;
    props: Omit<ReturnShipmentEntityProps, 'status' | 'restockable'>;
    now: string;
  }): ReturnShipmentEntity {
    const entity = new ReturnShipmentEntity(
      params.id.value,
      params.now,
      params.now,
      {
        ...params.props,
        status: ReturnShipmentStatusVO.requested(),
        restockable: false,
      },
    );
    entity.addDomainEvent(
      new ReturnShipmentRequestedEvent({
        aggregateId: params.id.value,
        payload: {
          returnId: params.id.value,
          rmaNumber: params.props.rmaNumber,
          orderId: params.props.orderId,
          type: params.props.type.value,
          reason: params.props.reason.value,
          itemCount: params.props.itemIds.length,
          requestedAt: params.now,
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
    props: ReturnShipmentEntityProps;
    version?: number;
  }): ReturnShipmentEntity {
    const entity = new ReturnShipmentEntity(
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
