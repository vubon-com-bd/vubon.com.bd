/**
 * ReturnShipmentEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { RETURN_SHIPMENT } from '@vubon/shared-constants/logistics';
import type { UserId } from '@vubon/shared-types/common';

import { ReturnShipmentIdVO } from '../value-objects/primitives/return-shipment-id.vo.js';
import { RmaNumberVO } from '../value-objects/primitives/rma-number.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { ReturnShipmentStatusVO } from '../value-objects/primitives/return-shipment-status.vo.js';
import { ReturnShipmentTypeVO } from '../value-objects/primitives/return-shipment-type.vo.js';
import { ReturnReasonVO } from '../value-objects/primitives/return-reason.vo.js';
import { RefundAmountVO } from '../value-objects/primitives/refund-amount.vo.js';
import { DescriptionTextVO } from '../value-objects/primitives/description-text.vo.js';
import { NotesVO } from '../value-objects/primitives/notes.vo.js';
import { AddressDetailsVO } from '../value-objects/composites/address-details.vo.js';

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
  ReturnShipmentRefundIssuedEvent,
} from '../events/return-shipment.events.js';

import {
  InvalidReturnStatusTransitionError,
  ReturnCannotBeApprovedError,
  ReturnPhotoRequiredError,
} from '../errors/return-shipment.errors.js';

export interface ReturnShipmentEntityProps {
  readonly rmaNumber: RmaNumberVO;
  readonly orderId: OrderIdVO;
  readonly originalShipmentId?: ShipmentIdVO;
  readonly userId: UserIdVO;
  readonly status: ReturnShipmentStatusVO;
  readonly type: ReturnShipmentTypeVO;
  readonly reason: ReturnReasonVO;
  readonly description?: DescriptionTextVO;
  readonly images: readonly string[];
  readonly itemIds: readonly string[];
  readonly pickupAddress: AddressDetailsVO;
  readonly pickupScheduledAt?: string;
  readonly pickedUpAt?: string;
  readonly receivedAt?: string;
  readonly inspectedAt?: string;
  readonly inspectedBy?: UserIdVO;
  readonly restockable: boolean;
  readonly refundAmount?: RefundAmountVO;
  readonly restockFeeAmount?: number;
  readonly trackingNumber?: string;
  readonly notes?: NotesVO;
}

export class ReturnShipmentEntity extends AggregateRoot<string> {
  private _status: ReturnShipmentStatusVO;
  private _pickupScheduledAt?: string;
  private _pickedUpAt?: string;
  private _receivedAt?: string;
  private _inspectedAt?: string;
  private _inspectedBy?: UserIdVO;
  private _restockable: boolean;
  private _refundAmount?: RefundAmountVO;
  private _restockFeeAmount?: number;
  private _trackingNumber?: string;
  private _notes?: NotesVO;

  private readonly _rmaNumber: RmaNumberVO;
  private readonly _orderId: OrderIdVO;
  private readonly _originalShipmentId?: ShipmentIdVO;
  private readonly _userId: UserIdVO;
  private readonly _type: ReturnShipmentTypeVO;
  private readonly _reason: ReturnReasonVO;
  private readonly _description?: DescriptionTextVO;
  private readonly _images: readonly string[];
  private readonly _itemIds: readonly string[];
  private readonly _pickupAddress: AddressDetailsVO;

  private constructor(
    id: string, createdAt: string, updatedAt: string,
    props: ReturnShipmentEntityProps, deletedAt?: string | null,
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
    this._images = [...props.images];
    this._itemIds = [...props.itemIds];
    this._pickupAddress = props.pickupAddress;
    this._pickupScheduledAt = props.pickupScheduledAt;
    this._pickedUpAt = props.pickedUpAt;
    this._receivedAt = props.receivedAt;
    this._inspectedAt = props.inspectedAt;
    this._inspectedBy = props.inspectedBy;
    this._restockable = props.restockable;
    this._refundAmount = props.refundAmount;
    this._restockFeeAmount = props.restockFeeAmount;
    this._trackingNumber = props.trackingNumber;
    this._notes = props.notes;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._itemIds.length === 0) {
      throw new ValidationError('Return requires at least one item', 'itemIds');
    }
    if (this._images.length > RETURN_SHIPMENT.MAX_PHOTOS) {
      throw new ValidationError(
        `Images exceed max ${RETURN_SHIPMENT.MAX_PHOTOS}`,
        'images',
      );
    }
    if (RETURN_SHIPMENT.REQUIRE_PHOTOS && this._reason.requiresPhotos() && this._images.length === 0) {
      throw new ReturnPhotoRequiredError(this.id);
    }
  }

  get rmaNumber(): RmaNumberVO { return this._rmaNumber; }
  get orderId(): OrderIdVO { return this._orderId; }
  get originalShipmentId(): ShipmentIdVO | undefined { return this._originalShipmentId; }
  get userId(): UserIdVO { return this._userId; }
  get status(): ReturnShipmentStatusVO { return this._status; }
  get type(): ReturnShipmentTypeVO { return this._type; }
  get reason(): ReturnReasonVO { return this._reason; }
  get description(): DescriptionTextVO | undefined { return this._description; }
  get images(): readonly string[] { return this._images; }
  get itemIds(): readonly string[] { return this._itemIds; }
  get pickupAddress(): AddressDetailsVO { return this._pickupAddress; }
  get pickupScheduledAt(): string | undefined { return this._pickupScheduledAt; }
  get pickedUpAt(): string | undefined { return this._pickedUpAt; }
  get receivedAt(): string | undefined { return this._receivedAt; }
  get inspectedAt(): string | undefined { return this._inspectedAt; }
  get inspectedBy(): UserIdVO | undefined { return this._inspectedBy; }
  get restockable(): boolean { return this._restockable; }
  get refundAmount(): RefundAmountVO | undefined { return this._refundAmount; }
  get restockFeeAmount(): number | undefined { return this._restockFeeAmount; }
  get trackingNumber(): string | undefined { return this._trackingNumber; }
  get notes(): NotesVO | undefined { return this._notes; }
  get toIdVO(): ReturnShipmentIdVO { return ReturnShipmentIdVO.reconstitute(this.id); }

  get itemCount(): number { return this._itemIds.length; }
  get imageCount(): number { return this._images.length; }
  get hasRefund(): boolean { return this._refundAmount !== undefined; }

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
  isInFlight(): boolean { return this._status.isInFlight(); }

  canBeApproved(): boolean { return this.isRequested(); }
  canBeCancelled(): boolean { return this._status.canBeCancelled(); }
  canBeInspected(): boolean { return this._status.canBeInspected(); }

  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidReturnStatusTransitionError(this._status.value, target);
    }
  }
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  approve(now: string = new Date().toISOString()): void {
    if (!this.canBeApproved()) {
      throw new ReturnCannotBeApprovedError(this.id, this._status.value);
    }
    this.assertTransitionTo('approved');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.approved();
    this.addDomainEvent(new ReturnShipmentApprovedEvent({
      aggregateId: this.id,
      payload: { returnId: this.id, fromStatus: from, toStatus: 'approved' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  reject(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('rejected');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.rejected();
    this.addDomainEvent(new ReturnShipmentRejectedEvent({
      aggregateId: this.id,
      payload: { returnId: this.id, fromStatus: from, toStatus: 'rejected', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  schedulePickup(at: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('pickup_scheduled');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.pickupScheduled();
    this._pickupScheduledAt = at;
    this.addDomainEvent(new ReturnShipmentPickupScheduledEvent({
      aggregateId: this.id,
      payload: { returnId: this.id, fromStatus: from, toStatus: 'pickup_scheduled' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markPickedUp(trackingNumber?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('picked_up');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.pickedUp();
    this._pickedUpAt = now;
    if (trackingNumber) this._trackingNumber = trackingNumber;
    this.addDomainEvent(new ReturnShipmentPickedUpEvent({
      aggregateId: this.id,
      payload: { returnId: this.id, fromStatus: from, toStatus: 'picked_up' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markInTransit(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('in_transit');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.inTransit();
    this.addDomainEvent(new ReturnShipmentInTransitEvent({
      aggregateId: this.id,
      payload: { returnId: this.id, fromStatus: from, toStatus: 'in_transit' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markReceived(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('received');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.received();
    this._receivedAt = now;
    this.addDomainEvent(new ReturnShipmentReceivedEvent({
      aggregateId: this.id,
      payload: { returnId: this.id, fromStatus: from, toStatus: 'received' },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  inspect(
    inspectedBy: UserIdVO,
    restockable: boolean,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canBeInspected()) {
      throw new BusinessRuleError(
        `Cannot inspect return in status "${this._status.value}"`,
        'RETURN_CANNOT_BE_INSPECTED',
        { returnId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('inspected');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.inspected();
    this._inspectedAt = now;
    this._inspectedBy = inspectedBy;
    this._restockable = restockable;
    this.addDomainEvent(new ReturnShipmentInspectedEvent({
      aggregateId: this.id,
      payload: {
        returnId: this.id,
        fromStatus: from,
        toStatus: 'inspected',
        reason: restockable ? 'restockable' : 'not_restockable',
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  complete(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('completed');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.completed();
    this.addDomainEvent(new ReturnShipmentCompletedEvent({
      aggregateId: this.id,
      payload: { returnId: this.id, fromStatus: from, toStatus: 'completed' },
      version: this.version + 1,
    }));
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
    this._status = ReturnShipmentStatusVO.cancelled();
    this.addDomainEvent(new ReturnShipmentCancelledEvent({
      aggregateId: this.id,
      payload: { returnId: this.id, fromStatus: from, toStatus: 'cancelled', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  markLost(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('lost');
    const from = this._status.value;
    this._status = ReturnShipmentStatusVO.lost();
    this.addDomainEvent(new ReturnShipmentLostEvent({
      aggregateId: this.id,
      payload: { returnId: this.id, fromStatus: from, toStatus: 'lost', reason },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  issueRefund(amount: RefundAmountVO, restockFeePercent: number = RETURN_SHIPMENT.RESTOCK_FEE_PERCENT, now: string = new Date().toISOString()): void {
    if (!this.isInspected() && !this.isCompleted()) {
      throw new BusinessRuleError(
        `Cannot issue refund before inspection (status: ${this._status.value})`,
        'REFUND_BEFORE_INSPECTION',
        { returnId: this.id, status: this._status.value },
      );
    }
    const net = restockFeePercent > 0 ? amount.applyRestockFee(restockFeePercent) : amount;
    const fee = Math.round((amount.amount - net.amount) * 100) / 100;
    this._refundAmount = net;
    if (fee > 0) this._restockFeeAmount = fee;
    this.addDomainEvent(new ReturnShipmentRefundIssuedEvent({
      aggregateId: this.id,
      payload: {
        returnId: this.id,
        refundAmount: net.amount,
        currency: net.currency,
        issuedAt: now,
      },
      version: this.version + 1,
    }));
    this.touch(now);
    this.incrementVersion();
  }

  updateNotes(notes: NotesVO, now: string = new Date().toISOString()): void {
    this._notes = notes;
    this.touch(now);
    this.incrementVersion();
  }

  static request(params: {
    id: string;
    props: Omit<ReturnShipmentEntityProps, 'status' | 'restockable'> & { status?: ReturnShipmentStatusVO };
    now: string;
  }): ReturnShipmentEntity {
    const status = params.props.status ?? ReturnShipmentStatusVO.requested();
    const fullProps: ReturnShipmentEntityProps = {
      ...params.props,
      status,
      restockable: false,
    };
    const entity = new ReturnShipmentEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(new ReturnShipmentRequestedEvent({
      aggregateId: params.id,
      payload: {
        returnId: params.id,
        rmaNumber: fullProps.rmaNumber.value,
        orderId: fullProps.orderId.value,
        userId: fullProps.userId.value,
        type: fullProps.type.value,
        reason: fullProps.reason.value,
        itemCount: fullProps.itemIds.length,
      },
      version: 1,
    }));
    entity.incrementVersion();
    return entity;
  }

  static reconstitute(params: {
    id: string; createdAt: string; updatedAt: string;
    deletedAt?: string | null; props: ReturnShipmentEntityProps; version?: number;
  }): ReturnShipmentEntity {
    const entity = new ReturnShipmentEntity(
      params.id, params.createdAt, params.updatedAt, params.props, params.deletedAt,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
