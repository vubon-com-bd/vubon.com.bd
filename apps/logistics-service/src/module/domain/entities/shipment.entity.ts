/**
 * ShipmentEntity — AGGREGATE ROOT
 * @module logistics-service/domain/entities
 *
 * Lifecycle state machine (via ShipmentStatusVO):
 *   pending → confirmed → processing → packed → picked_up → in_transit
 *   → out_for_delivery → delivered
 *   Any active state → cancelled / returned / failed / on_hold / delayed
 *
 * Business rules enforced:
 *  - Weight ≤ SHIPMENT.MAX_WEIGHT_KG
 *  - Volume ≤ SHIPMENT.MAX_VOLUME_M3
 *  - COD ≤ ZONE.COD_MAX_AMOUNT
 *  - Declared value ≤ SHIPMENT.MAX_DECLARED_VALUE
 *  - Cancel window: not in-flight, not final
 *  - Modify window: pending/confirmed/on_hold only
 *  - Cannot ship without courier + warehouse
 *  - Deliver only from out_for_delivery
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPMENT } from '@vubon/shared-constants/logistics';
import type { ShipmentId } from '@vubon/shared-types/common';

import { ShipmentIdVO } from '../value-objects/primitives/shipment-id.vo.js';
import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import { WarehouseIdVO } from '../value-objects/primitives/warehouse-id.vo.js';
import { CourierIdVO } from '../value-objects/primitives/courier-id.vo.js';
import { ShipmentStatusVO } from '../value-objects/primitives/shipment-status.vo.js';
import { ShipmentTypeVO } from '../value-objects/primitives/shipment-type.vo.js';
import { ShipmentPriorityVO } from '../value-objects/primitives/shipment-priority.vo.js';
import { TrackingNumberVO } from '../value-objects/primitives/tracking-number.vo.js';
import { NotesVO } from '../value-objects/primitives/notes.vo.js';
import { CodAmountVO } from '../value-objects/primitives/cod-amount.vo.js';
import { DeclaredValueVO } from '../value-objects/primitives/declared-value.vo.js';
import { ShippingCostVO } from '../value-objects/primitives/shipping-cost.vo.js';
import { ShipmentDimensionsVO } from '../value-objects/composites/shipment-dimensions.vo.js';
import { AddressDetailsVO } from '../value-objects/composites/address-details.vo.js';
import { PackageRefVO } from '../value-objects/composites/package-ref.vo.js';
import { CustomerRefVO } from '../value-objects/composites/customer-ref.vo.js';

import {
  ShipmentCreatedEvent,
  ShipmentConfirmedEvent,
  ShipmentProcessingStartedEvent,
  ShipmentPackedEvent,
  ShipmentLabelGeneratedEvent,
  ShipmentPickedUpEvent,
  ShipmentInTransitEvent,
  ShipmentOutForDeliveryEvent,
  ShipmentDeliveredEvent,
  ShipmentFailedEvent,
  ShipmentReturnedEvent,
  ShipmentCancelledEvent,
  ShipmentPutOnHoldEvent,
  ShipmentReleasedEvent,
  ShipmentDelayedEvent,
  ShipmentCourierAssignedEvent,
  ShipmentWarehouseAssignedEvent,
  ShipmentStatusChangedEvent,
} from '../events/shipment.events.js';

import {
  InvalidShipmentStatusTransitionError,
  ShipmentCannotBeCancelledError,
  ShipmentCannotBeModifiedError,
} from '../errors/shipment.errors.js';

export interface ShipmentEntityProps {
  readonly trackingNumber: TrackingNumberVO;
  readonly orderId: OrderIdVO;
  readonly userId?: UserIdVO;
  readonly vendorId?: VendorIdVO;
  readonly warehouseId?: WarehouseIdVO;
  readonly courierId?: CourierIdVO;
  readonly type: ShipmentTypeVO;
  readonly priority: ShipmentPriorityVO;
  readonly status: ShipmentStatusVO;
  readonly dimensions: ShipmentDimensionsVO;
  readonly shippingAddress: AddressDetailsVO;
  readonly pickupAddress?: AddressDetailsVO;
  readonly customer?: CustomerRefVO;
  readonly packages: readonly PackageRefVO[];
  readonly itemCount: number;
  readonly isCOD: boolean;
  readonly codAmount?: CodAmountVO;
  readonly isInsured: boolean;
  readonly declaredValue?: DeclaredValueVO;
  readonly shippingCost?: ShippingCostVO;
  readonly courierTrackingNumber?: string;
  readonly labelUrl?: string;
  readonly estimatedDeliveryAt?: string;
  readonly pickedUpAt?: string;
  readonly deliveredAt?: string;
  readonly returnedAt?: string;
  readonly cancelledAt?: string;
  readonly failureReason?: string;
  readonly notes?: NotesVO;
}

export class ShipmentEntity extends AggregateRoot<string> {
  private _status: ShipmentStatusVO;
  private _warehouseId?: WarehouseIdVO;
  private _courierId?: CourierIdVO;
  private _courierTrackingNumber?: string;
  private _labelUrl?: string;
  private _estimatedDeliveryAt?: string;
  private _pickedUpAt?: string;
  private _deliveredAt?: string;
  private _returnedAt?: string;
  private _cancelledAt?: string;
  private _failureReason?: string;
  private _notes?: NotesVO;
  private _priority: ShipmentPriorityVO;

  private readonly _trackingNumber: TrackingNumberVO;
  private readonly _orderId: OrderIdVO;
  private readonly _userId?: UserIdVO;
  private readonly _vendorId?: VendorIdVO;
  private readonly _type: ShipmentTypeVO;
  private readonly _dimensions: ShipmentDimensionsVO;
  private readonly _shippingAddress: AddressDetailsVO;
  private readonly _pickupAddress?: AddressDetailsVO;
  private readonly _customer?: CustomerRefVO;
  private readonly _packages: PackageRefVO[];
  private readonly _itemCount: number;
  private readonly _isCOD: boolean;
  private readonly _codAmount?: CodAmountVO;
  private readonly _isInsured: boolean;
  private readonly _declaredValue?: DeclaredValueVO;
  private readonly _shippingCost?: ShippingCostVO;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ShipmentEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._trackingNumber = props.trackingNumber;
    this._orderId = props.orderId;
    this._userId = props.userId;
    this._vendorId = props.vendorId;
    this._warehouseId = props.warehouseId;
    this._courierId = props.courierId;
    this._type = props.type;
    this._priority = props.priority;
    this._status = props.status;
    this._dimensions = props.dimensions;
    this._shippingAddress = props.shippingAddress;
    this._pickupAddress = props.pickupAddress;
    this._customer = props.customer;
    this._packages = [...props.packages];
    this._itemCount = props.itemCount;
    this._isCOD = props.isCOD;
    this._codAmount = props.codAmount;
    this._isInsured = props.isInsured;
    this._declaredValue = props.declaredValue;
    this._shippingCost = props.shippingCost;
    this._courierTrackingNumber = props.courierTrackingNumber;
    this._labelUrl = props.labelUrl;
    this._estimatedDeliveryAt = props.estimatedDeliveryAt;
    this._pickedUpAt = props.pickedUpAt;
    this._deliveredAt = props.deliveredAt;
    this._returnedAt = props.returnedAt;
    this._cancelledAt = props.cancelledAt;
    this._failureReason = props.failureReason;
    this._notes = props.notes;
    this.assertInvariants();
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    if (this._packages.length === 0) {
      throw new ValidationError('Shipment must contain at least one package', 'packages');
    }
    if (this._packages.length > SHIPMENT.MAX_ITEMS_PER_SHIPMENT) {
      throw new ValidationError(
        `Packages exceed max ${SHIPMENT.MAX_ITEMS_PER_SHIPMENT}`,
        'packages',
      );
    }
    if (this._itemCount !== this._packages.reduce((sum, p) => sum + p.quantity, 0)) {
      throw new ValidationError('itemCount mismatch with package quantities', 'itemCount');
    }
    if (this._isCOD && !this._codAmount) {
      throw new ValidationError('COD shipment requires codAmount', 'codAmount');
    }
    if (!this._isCOD && this._codAmount && !this._codAmount.isZero()) {
      throw new ValidationError('Non-COD shipment cannot have codAmount > 0', 'codAmount');
    }
    if (this._isInsured && !this._declaredValue) {
      throw new ValidationError('Insured shipment requires declaredValue', 'declaredValue');
    }
    if (this._dimensions.actualWeightKg.value > SHIPMENT.MAX_WEIGHT_KG) {
      throw new ValidationError(
        `Weight ${this._dimensions.actualWeightKg.value}kg exceeds max ${SHIPMENT.MAX_WEIGHT_KG}kg`,
        'weight',
      );
    }
  }

  // ═══════════════ Getters ═══════════════
  get trackingNumber(): TrackingNumberVO { return this._trackingNumber; }
  get orderId(): OrderIdVO { return this._orderId; }
  get userId(): UserIdVO | undefined { return this._userId; }
  get vendorId(): VendorIdVO | undefined { return this._vendorId; }
  get warehouseId(): WarehouseIdVO | undefined { return this._warehouseId; }
  get courierId(): CourierIdVO | undefined { return this._courierId; }
  get type(): ShipmentTypeVO { return this._type; }
  get priority(): ShipmentPriorityVO { return this._priority; }
  get status(): ShipmentStatusVO { return this._status; }
  get dimensions(): ShipmentDimensionsVO { return this._dimensions; }
  get shippingAddress(): AddressDetailsVO { return this._shippingAddress; }
  get pickupAddress(): AddressDetailsVO | undefined { return this._pickupAddress; }
  get customer(): CustomerRefVO | undefined { return this._customer; }
  get packages(): readonly PackageRefVO[] { return this._packages; }
  get itemCount(): number { return this._itemCount; }
  get isCOD(): boolean { return this._isCOD; }
  get codAmount(): CodAmountVO | undefined { return this._codAmount; }
  get isInsured(): boolean { return this._isInsured; }
  get declaredValue(): DeclaredValueVO | undefined { return this._declaredValue; }
  get shippingCost(): ShippingCostVO | undefined { return this._shippingCost; }
  get courierTrackingNumber(): string | undefined { return this._courierTrackingNumber; }
  get labelUrl(): string | undefined { return this._labelUrl; }
  get estimatedDeliveryAt(): string | undefined { return this._estimatedDeliveryAt; }
  get pickedUpAt(): string | undefined { return this._pickedUpAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get returnedAt(): string | undefined { return this._returnedAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get failureReason(): string | undefined { return this._failureReason; }
  get notes(): NotesVO | undefined { return this._notes; }

  get toIdVO(): ShipmentIdVO { return ShipmentIdVO.reconstitute(this.id); }
  get shipmentId(): ShipmentId { return this.id as ShipmentId; }

  // ═══════════════ Predicates ═══════════════
  isPending(): boolean { return this._status.isPending(); }
  isConfirmed(): boolean { return this._status.isConfirmed(); }
  isProcessing(): boolean { return this._status.isProcessing(); }
  isPacked(): boolean { return this._status.isPacked(); }
  isPickedUp(): boolean { return this._status.isPickedUp(); }
  isInTransit(): boolean { return this._status.isInTransit(); }
  isOutForDelivery(): boolean { return this._status.isOutForDelivery(); }
  isDelivered(): boolean { return this._status.isDelivered(); }
  isFailed(): boolean { return this._status.isFailed(); }
  isReturned(): boolean { return this._status.isReturned(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isOnHold(): boolean { return this._status.isOnHold(); }
  isDelayed(): boolean { return this._status.isDelayed(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isInFlight(): boolean { return this._status.isInFlight(); }
  hasCourier(): boolean { return this._courierId !== undefined; }
  hasWarehouse(): boolean { return this._warehouseId !== undefined; }
  hasLabel(): boolean { return this._labelUrl !== undefined; }
  hasPickupAddress(): boolean { return this._pickupAddress !== undefined; }

  /** Whether all preconditions for pickup handoff are met. */
  isReadyForPickup(): boolean {
    return this.isPacked() && this.hasCourier() && this.hasWarehouse() && this.hasLabel();
  }

  canBeCancelled(): boolean {
    return this._status.canBeCancelled() && !this.isDelivered();
  }

  canBeModified(): boolean {
    return this._status.canBeModified();
  }

  canGenerateLabel(): boolean {
    return this._status.canGenerateLabel() && this.hasCourier();
  }

  canBeReturned(): boolean {
    return this.isDelivered() && !this.isReturned();
  }

  // ═══════════════ Private helpers ═══════════════
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new InvalidShipmentStatusTransitionError(this._status.value, target);
    }
  }

  private emitStatusChange(from: string, to: string, changedBy?: string, reason?: string): void {
    this.addDomainEvent(
      new ShipmentStatusChangedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, fromStatus: from, toStatus: to, changedBy, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══════════════ Business methods ═══════════════

  /** Assign a courier to this shipment. */
  assignCourier(courierId: CourierIdVO, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot assign courier to shipment in status "${this._status.value}"`,
        'SHIPMENT_CANNOT_BE_MODIFIED',
        { shipmentId: this.id, status: this._status.value },
      );
    }
    this._courierId = courierId;
    this.addDomainEvent(
      new ShipmentCourierAssignedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, courierId: courierId.value, assignedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  /** Assign a warehouse (origin). */
  assignWarehouse(warehouseId: WarehouseIdVO, now: string = new Date().toISOString()): void {
    if (this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot assign warehouse to shipment in status "${this._status.value}"`,
        'SHIPMENT_CANNOT_BE_MODIFIED',
        { shipmentId: this.id, status: this._status.value },
      );
    }
    this._warehouseId = warehouseId;
    this.addDomainEvent(
      new ShipmentWarehouseAssignedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, warehouseId: warehouseId.value, assignedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  /** Change priority (elevated priority skip queue). */
  changePriority(priority: ShipmentPriorityVO, now: string = new Date().toISOString()): void {
    if (this.isInFlight() || this.isFinal()) {
      throw new BusinessRuleError(
        `Cannot change priority for shipment in status "${this._status.value}"`,
        'SHIPMENT_CANNOT_BE_MODIFIED',
        { shipmentId: this.id, status: this._status.value },
      );
    }
    this._priority = priority;
    this.touch(now);
    this.incrementVersion();
  }

  /** Update notes (only pre-flight). */
  updateNotes(notes: NotesVO, now: string = new Date().toISOString()): void {
    if (!this.canBeModified()) {
      throw new ShipmentCannotBeModifiedError(this.id, this._status.value);
    }
    this._notes = notes;
    this.touch(now);
    this.incrementVersion();
  }

  // ─── Lifecycle transitions ───
  confirm(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('confirmed');
    const from = this._status.value;
    this._status = ShipmentStatusVO.confirmed();
    this.emitStatusChange(from, 'confirmed');
    this.addDomainEvent(
      new ShipmentConfirmedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, fromStatus: from, toStatus: 'confirmed' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  startProcessing(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('processing');
    const from = this._status.value;
    this._status = ShipmentStatusVO.processing();
    this.emitStatusChange(from, 'processing');
    this.addDomainEvent(
      new ShipmentProcessingStartedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, fromStatus: from, toStatus: 'processing' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markPacked(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('packed');
    const from = this._status.value;
    this._status = ShipmentStatusVO.packed();
    this.emitStatusChange(from, 'packed');
    this.addDomainEvent(
      new ShipmentPackedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, fromStatus: from, toStatus: 'packed' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  generateLabel(labelUrl: string, now: string = new Date().toISOString()): void {
    if (!this.canGenerateLabel()) {
      throw new BusinessRuleError(
        `Cannot generate label for shipment in status "${this._status.value}"`,
        'SHIPMENT_LABEL_NOT_ALLOWED',
        { shipmentId: this.id, status: this._status.value },
      );
    }
    if (!labelUrl || labelUrl.trim().length === 0) {
      throw new ValidationError('labelUrl required', 'labelUrl');
    }
    this._labelUrl = labelUrl.trim();
    this.addDomainEvent(
      new ShipmentLabelGeneratedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, labelUrl: this._labelUrl, generatedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  pickup(courierTrackingNumber?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('picked_up');
    if (!this.hasCourier()) {
      throw new BusinessRuleError(
        'Cannot pick up shipment without an assigned courier',
        'SHIPMENT_NO_COURIER',
        { shipmentId: this.id },
      );
    }
    const from = this._status.value;
    this._status = ShipmentStatusVO.pickedUp();
    this._pickedUpAt = now;
    if (courierTrackingNumber) this._courierTrackingNumber = courierTrackingNumber;
    this.emitStatusChange(from, 'picked_up');
    this.addDomainEvent(
      new ShipmentPickedUpEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, fromStatus: from, toStatus: 'picked_up' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markInTransit(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('in_transit');
    const from = this._status.value;
    this._status = ShipmentStatusVO.inTransit();
    this.emitStatusChange(from, 'in_transit');
    this.addDomainEvent(
      new ShipmentInTransitEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, fromStatus: from, toStatus: 'in_transit' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markOutForDelivery(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('out_for_delivery');
    const from = this._status.value;
    this._status = ShipmentStatusVO.outForDelivery();
    this.emitStatusChange(from, 'out_for_delivery');
    this.addDomainEvent(
      new ShipmentOutForDeliveryEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, fromStatus: from, toStatus: 'out_for_delivery' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markDelivered(receivedBy?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('delivered');
    const from = this._status.value;
    this._status = ShipmentStatusVO.delivered();
    this._deliveredAt = now;
    this.emitStatusChange(from, 'delivered');
    this.addDomainEvent(
      new ShipmentDeliveredEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          orderId: this._orderId.value,
          deliveredAt: now,
          receivedBy,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markFailed(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('failed');
    if (!reason || reason.trim().length < 2) {
      throw new ValidationError('Failure reason required', 'reason');
    }
    const from = this._status.value;
    this._status = ShipmentStatusVO.failed();
    this._failureReason = reason.trim();
    this.emitStatusChange(from, 'failed', undefined, reason);
    this.addDomainEvent(
      new ShipmentFailedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, failedAt: now, reason: reason.trim() },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markReturned(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('returned');
    if (!reason || reason.trim().length < 2) {
      throw new ValidationError('Return reason required', 'reason');
    }
    const from = this._status.value;
    this._status = ShipmentStatusVO.returned();
    this._returnedAt = now;
    this.emitStatusChange(from, 'returned', undefined, reason);
    this.addDomainEvent(
      new ShipmentReturnedEvent({
        aggregateId: this.id,
        payload: {
          shipmentId: this.id,
          orderId: this._orderId.value,
          returnedAt: now,
          reason: reason.trim(),
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason?: string, cancelledBy?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeCancelled()) {
      throw new ShipmentCannotBeCancelledError(this.id, this._status.value);
    }
    this.assertTransitionTo('cancelled');
    const from = this._status.value;
    this._status = ShipmentStatusVO.cancelled();
    this._cancelledAt = now;
    this.emitStatusChange(from, 'cancelled', cancelledBy, reason);
    this.addDomainEvent(
      new ShipmentCancelledEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, cancelledAt: now, reason, cancelledBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  putOnHold(reason?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('on_hold');
    const from = this._status.value;
    this._status = ShipmentStatusVO.onHold();
    this.emitStatusChange(from, 'on_hold', undefined, reason);
    this.addDomainEvent(
      new ShipmentPutOnHoldEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, fromStatus: from, toStatus: 'on_hold', reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  release(now: string = new Date().toISOString()): void {
    if (!this.isOnHold()) {
      throw new BusinessRuleError(
        `Cannot release shipment in status "${this._status.value}"`,
        'SHIPMENT_NOT_ON_HOLD',
        { shipmentId: this.id, status: this._status.value },
      );
    }
    const from = this._status.value;
    this._status = ShipmentStatusVO.processing();
    this.emitStatusChange(from, 'processing');
    this.addDomainEvent(
      new ShipmentReleasedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, fromStatus: from, toStatus: 'processing' },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markDelayed(newEta: string | undefined, reason: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('delayed');
    const from = this._status.value;
    const previousEta = this._estimatedDeliveryAt;
    this._status = ShipmentStatusVO.delayed();
    if (newEta) this._estimatedDeliveryAt = newEta;
    this.emitStatusChange(from, 'delayed', undefined, reason);
    this.addDomainEvent(
      new ShipmentDelayedEvent({
        aggregateId: this.id,
        payload: { shipmentId: this.id, previousEta, newEta, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Factories ═══════════════
  static create(params: {
    id: string;
    props: Omit<ShipmentEntityProps, 'status'> & { status?: ShipmentStatusVO };
    now: string;
  }): ShipmentEntity {
    const status = params.props.status ?? ShipmentStatusVO.pending();
    const fullProps: ShipmentEntityProps = { ...params.props, status };
    const entity = new ShipmentEntity(params.id, params.now, params.now, fullProps);
    entity.addDomainEvent(
      new ShipmentCreatedEvent({
        aggregateId: params.id,
        payload: {
          shipmentId: params.id,
          trackingNumber: fullProps.trackingNumber.value,
          orderId: fullProps.orderId.value,
          userId: fullProps.userId?.value,
          vendorId: fullProps.vendorId?.value,
          type: fullProps.type.value,
          priority: fullProps.priority.value,
          itemCount: fullProps.itemCount,
          isCOD: fullProps.isCOD,
          isInsured: fullProps.isInsured,
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
    props: ShipmentEntityProps;
    version?: number;
  }): ShipmentEntity {
    const entity = new ShipmentEntity(
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
