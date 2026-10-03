/**
 * OrderEntity — AGGREGATE ROOT
 * @module order-service/domain/entities
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { ORDER, ORDER_LIMIT, ORDER_STATUS } from '@vubon/shared-constants/business/order';

import { OrderIdVO } from '../value-objects/primitives/order-id.vo.js';
import { OrderNumberVO } from '../value-objects/primitives/order-number.vo.js';
import { OrderStatusVO } from '../value-objects/primitives/order-status.vo.js';
import { OrderTypeVO } from '../value-objects/primitives/order-type.vo.js';
import { OrderPriorityVO } from '../value-objects/primitives/order-priority.vo.js';
import { CustomerIdVO } from '../value-objects/primitives/customer-id.vo.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo.js';
import { OrderNoteVO } from '../value-objects/primitives/order-note.vo.js';

import { OrderItemEntity } from './order-item.entity.js';

import {
  OrderCreatedEvent,
  OrderConfirmedEvent,
  OrderProcessingEvent,
  OrderPackedEvent,
  OrderShippedEvent,
  OrderOutForDeliveryEvent,
  OrderDeliveredEvent,
  OrderCompletedEvent,
  OrderCancelledEvent,
  OrderReturnedEvent,
  OrderRefundedEvent,
  OrderOnHoldEvent,
  OrderReleasedEvent,
  OrderStatusChangedEvent,
  OrderPriorityChangedEvent,
  OrderNotesUpdatedEvent,
} from '../events/order.events.js';
import {
  OrderItemAddedEvent,
  OrderItemRemovedEvent,
} from '../events/order-item.events.js';

export interface OrderEntityProps {
  readonly orderNumber: OrderNumberVO;
  readonly customerId: CustomerIdVO;
  readonly vendorIds: readonly VendorIdVO[];
  readonly type: OrderTypeVO;
  readonly status: OrderStatusVO;
  readonly priority: OrderPriorityVO;
  readonly currency: string;
  readonly subtotal: number;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly total: number;
  readonly paymentId?: PaymentIdVO;
  readonly paymentStatus?: string;
  readonly paymentMethod?: string;
  readonly shippingMethod?: string;
  readonly trackingNumber?: string;
  readonly notes?: OrderNoteVO;
  readonly customerNotes?: OrderNoteVO;
  readonly confirmedAt?: string;
  readonly shippedAt?: string;
  readonly deliveredAt?: string;
  readonly cancelledAt?: string;
  readonly completedAt?: string;
}

export class OrderEntity extends AggregateRoot<string> {
  private _status: OrderStatusVO;
  private _priority: OrderPriorityVO;
  private _subtotal: number;
  private _discountAmount: number;
  private _taxAmount: number;
  private _shippingAmount: number;
  private _total: number;
  private _items: OrderItemEntity[] = [];
  private _paymentId?: PaymentIdVO;
  private _paymentStatus?: string;
  private _paymentMethod?: string;
  private _shippingMethod?: string;
  private _trackingNumber?: string;
  private _notes?: OrderNoteVO;
  private _customerNotes?: OrderNoteVO;
  private _confirmedAt?: string;
  private _shippedAt?: string;
  private _deliveredAt?: string;
  private _cancelledAt?: string;
  private _completedAt?: string;

  private readonly _orderNumber: OrderNumberVO;
  private readonly _customerId: CustomerIdVO;
  private readonly _vendorIds: readonly VendorIdVO[];
  private readonly _type: OrderTypeVO;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: OrderEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._orderNumber = props.orderNumber;
    this._customerId = props.customerId;
    this._vendorIds = props.vendorIds;
    this._type = props.type;
    this._status = props.status;
    this._priority = props.priority;
    this._currency = props.currency;
    this._subtotal = props.subtotal;
    this._discountAmount = props.discountAmount;
    this._taxAmount = props.taxAmount;
    this._shippingAmount = props.shippingAmount;
    this._total = props.total;
    this._paymentId = props.paymentId;
    this._paymentStatus = props.paymentStatus;
    this._paymentMethod = props.paymentMethod;
    this._shippingMethod = props.shippingMethod;
    this._trackingNumber = props.trackingNumber;
    this._notes = props.notes;
    this._customerNotes = props.customerNotes;
    this._confirmedAt = props.confirmedAt;
    this._shippedAt = props.shippedAt;
    this._deliveredAt = props.deliveredAt;
    this._cancelledAt = props.cancelledAt;
    this._completedAt = props.completedAt;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._total < 0) {
      throw new ValidationError('Order total cannot be negative', 'total');
    }
    if (this._currency.length !== 3) {
      throw new ValidationError('Currency must be 3-char code', 'currency');
    }
    const expected = this.computeTotal();
    if (Math.abs(expected - this._total) > 0.01) {
      throw new ValidationError(
        `Total mismatch: expected ${expected}, got ${this._total}`,
        'total',
      );
    }
  }

  private computeTotal(): number {
    return Math.round((this._subtotal - this._discountAmount + this._taxAmount + this._shippingAmount) * 100) / 100;
  }

  // ─── Getters ───
  get orderNumber(): OrderNumberVO { return this._orderNumber; }
  get customerId(): CustomerIdVO { return this._customerId; }
  get vendorIds(): readonly VendorIdVO[] { return this._vendorIds; }
  get type(): OrderTypeVO { return this._type; }
  get status(): OrderStatusVO { return this._status; }
  get priority(): OrderPriorityVO { return this._priority; }
  get currency(): string { return this._currency; }
  get subtotal(): number { return this._subtotal; }
  get discountAmount(): number { return this._discountAmount; }
  get taxAmount(): number { return this._taxAmount; }
  get shippingAmount(): number { return this._shippingAmount; }
  get total(): number { return this._total; }
  get items(): readonly OrderItemEntity[] { return [...this._items]; }
  get paymentId(): PaymentIdVO | undefined { return this._paymentId; }
  get paymentStatus(): string | undefined { return this._paymentStatus; }
  get paymentMethod(): string | undefined { return this._paymentMethod; }
  get shippingMethod(): string | undefined { return this._shippingMethod; }
  get trackingNumber(): string | undefined { return this._trackingNumber; }
  get notes(): OrderNoteVO | undefined { return this._notes; }
  get customerNotes(): OrderNoteVO | undefined { return this._customerNotes; }
  get confirmedAt(): string | undefined { return this._confirmedAt; }
  get shippedAt(): string | undefined { return this._shippedAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get completedAt(): string | undefined { return this._completedAt; }
  get toIdVO(): OrderIdVO { return OrderIdVO.reconstitute(this.id); }

  get itemCount(): number {
    return this._items.reduce((sum, i) => sum + i.quantity.value, 0);
  }
  get uniqueItemCount(): number { return this._items.length; }
  get isEmpty(): boolean { return this._items.length === 0; }
  get hasMultipleVendors(): boolean { return this._vendorIds.length > 1; }

  // ─── Predicates ───
  isPending(): boolean { return this._status.isPending(); }
  isConfirmed(): boolean { return this._status.isConfirmed(); }
  isProcessing(): boolean { return this._status.isProcessing(); }
  isPacked(): boolean { return this._status.isPacked(); }
  isShipped(): boolean { return this._status.isShipped(); }
  isDelivered(): boolean { return this._status.isDelivered(); }
  isCompleted(): boolean { return this._status.isCompleted(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isReturned(): boolean { return this._status.isReturned(); }
  isRefunded(): boolean { return this._status.isRefunded(); }
  isOnHold(): boolean { return this._status.isOnHold(); }
  isActive(): boolean { return this._status.isActive(); }
  isFinal(): boolean { return this._status.isFinal(); }
  isPaid(): boolean { return this._paymentId !== undefined && this._paymentStatus === 'completed'; }

  canBeModified(): boolean {
    return this._status.isPending() || this._status.isConfirmed();
  }

  canBeCancelled(): boolean {
    return !this._status.isShipped() && !this._status.isFinal();
  }

  canBeReturned(): boolean {
    return this._status.isDelivered() || this._status.isCompleted();
  }

  canBeShipped(): boolean {
    return this._status.isPacked() || this._status.isProcessing();
  }

  canBeDelivered(): boolean {
    return this._status.isShipped();
  }

  canBeRefunded(): boolean {
    return this._status.isCancelled() || this._status.isReturned();
  }

  findItem(itemId: string): OrderItemEntity | undefined {
    return this._items.find((i) => i.id === itemId);
  }

  hasItem(itemId: string): boolean {
    return this.findItem(itemId) !== undefined;
  }

  // ─── Business methods ───

  addItem(item: OrderItemEntity, now: string): void {
    if (!this.canBeModified()) {
      throw new BusinessRuleError(
        `Cannot add item — order status is "${this._status.value}"`,
        'ORDER_NOT_MODIFIABLE',
        { orderId: this.id, status: this._status.value },
      );
    }
    if (this._items.length >= ORDER_LIMIT.MAX_ITEMS) {
      throw new BusinessRuleError(
        `Order cannot have more than ${ORDER_LIMIT.MAX_ITEMS} items`,
        'ORDER_ITEM_LIMIT_EXCEEDED',
        { max: ORDER_LIMIT.MAX_ITEMS },
      );
    }
    if (item.currency !== this._currency) {
      throw new ValidationError(
        `Item currency "${item.currency}" mismatch with order "${this._currency}"`,
        'currency',
      );
    }
    this._items.push(item);
    this.recalculateTotal();
    this.addDomainEvent(
      new OrderItemAddedEvent({
        aggregateId: this.id,
        payload: {
          orderId: this.id,
          itemId: item.id,
          productId: item.productId.value,
          variantId: item.variantId?.value,
          vendorId: item.vendorId?.value,
          sku: item.sku,
          name: item.name,
          quantity: item.quantity.value,
          unitPrice: item.price.amount,
          currency: item.currency,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  removeItem(itemId: string, removedBy?: string, now: string = new Date().toISOString()): void {
    if (!this.canBeModified()) {
      throw new BusinessRuleError(
        `Cannot remove item — order status is "${this._status.value}"`,
        'ORDER_NOT_MODIFIABLE',
      );
    }
    const item = this.findItem(itemId);
    if (!item) return;
    this._items = this._items.filter((i) => i.id !== itemId);
    this.recalculateTotal();
    this.addDomainEvent(
      new OrderItemRemovedEvent({
        aggregateId: this.id,
        payload: {
          orderId: this.id,
          itemId,
          productId: item.productId.value,
          quantity: item.quantity.value,
          removedBy,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  private recalculateTotal(): void {
    this._subtotal = Math.round(this._items.reduce((s, i) => s + i.lineSubtotal, 0) * 100) / 100;
    this._discountAmount = Math.round(this._items.reduce((s, i) => s + i.discountAmount, 0) * 100) / 100;
    this._taxAmount = Math.round(this._items.reduce((s, i) => s + i.taxAmount, 0) * 100) / 100;
    this._shippingAmount = Math.round(this._items.reduce((s, i) => s + i.shippingAmount, 0) * 100) / 100;
    this._total = this.computeTotal();
  }

  confirm(paymentId: PaymentIdVO | undefined, now: string = new Date().toISOString()): void {
    this.assertTransition(ORDER_STATUS.CONFIRMED);
    const from = this._status.value;
    this._status = OrderStatusVO.confirmed();
    this._paymentId = paymentId;
    this._confirmedAt = now;
    this.emitStatusChange(from, ORDER_STATUS.CONFIRMED, now);
    this.addDomainEvent(
      new OrderConfirmedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, confirmedAt: now, paymentId: paymentId?.value },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  startProcessing(now: string = new Date().toISOString()): void {
    this.assertTransition(ORDER_STATUS.PROCESSING);
    const from = this._status.value;
    this._status = OrderStatusVO.create(ORDER_STATUS.PROCESSING);
    this.emitStatusChange(from, ORDER_STATUS.PROCESSING, now);
    this.addDomainEvent(
      new OrderProcessingEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, startedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  pack(now: string = new Date().toISOString()): void {
    this.assertTransition(ORDER_STATUS.PACKED);
    const from = this._status.value;
    this._status = OrderStatusVO.create(ORDER_STATUS.PACKED);
    this.emitStatusChange(from, ORDER_STATUS.PACKED, now);
    this.addDomainEvent(
      new OrderPackedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, packedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  ship(trackingNumber: string | undefined, courierId: string | undefined, now: string = new Date().toISOString()): void {
    this.assertTransition(ORDER_STATUS.SHIPPED);
    const from = this._status.value;
    this._status = OrderStatusVO.create(ORDER_STATUS.SHIPPED);
    this._trackingNumber = trackingNumber;
    this._shippedAt = now;
    this.emitStatusChange(from, ORDER_STATUS.SHIPPED, now);
    this.addDomainEvent(
      new OrderShippedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, shippedAt: now, trackingNumber, courierId },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markOutForDelivery(now: string = new Date().toISOString()): void {
    this.assertTransition(ORDER_STATUS.OUT_FOR_DELIVERY);
    const from = this._status.value;
    this._status = OrderStatusVO.create(ORDER_STATUS.OUT_FOR_DELIVERY);
    this.emitStatusChange(from, ORDER_STATUS.OUT_FOR_DELIVERY, now);
    this.addDomainEvent(
      new OrderOutForDeliveryEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, outAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  deliver(receivedBy: string | undefined, now: string = new Date().toISOString()): void {
    this.assertTransition(ORDER_STATUS.DELIVERED);
    const from = this._status.value;
    this._status = OrderStatusVO.delivered();
    this._deliveredAt = now;
    this.emitStatusChange(from, ORDER_STATUS.DELIVERED, now);
    this.addDomainEvent(
      new OrderDeliveredEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, deliveredAt: now, receivedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  complete(now: string = new Date().toISOString()): void {
    this.assertTransition(ORDER_STATUS.COMPLETED);
    const from = this._status.value;
    this._status = OrderStatusVO.create(ORDER_STATUS.COMPLETED);
    this._completedAt = now;
    this.emitStatusChange(from, ORDER_STATUS.COMPLETED, now);
    this.addDomainEvent(
      new OrderCompletedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, completedAt: now },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  cancel(reason: string, cancelledBy?: string, refundAmount?: number, now: string = new Date().toISOString()): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Cannot cancel order in status "${this._status.value}"`,
        'CANNOT_CANCEL',
        { orderId: this.id, status: this._status.value },
      );
    }
    this.assertTransition(ORDER_STATUS.CANCELLED);
    const from = this._status.value;
    this._status = OrderStatusVO.cancelled();
    this._cancelledAt = now;
    this.emitStatusChange(from, ORDER_STATUS.CANCELLED, cancelledBy);
    this.addDomainEvent(
      new OrderCancelledEvent({
        aggregateId: this.id,
        payload: {
          orderId: this.id,
          cancelledAt: now,
          reason,
          cancelledBy,
          refundAmount,
          currency: this._currency,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markReturned(returnId: string, reason: string, itemIds: readonly string[], now: string = new Date().toISOString()): void {
    this.assertTransition(ORDER_STATUS.RETURNED);
    const from = this._status.value;
    this._status = OrderStatusVO.create(ORDER_STATUS.RETURNED);
    this.emitStatusChange(from, ORDER_STATUS.RETURNED);
    this.addDomainEvent(
      new OrderReturnedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, returnId, returnedAt: now, reason, itemIds },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  refund(amount: number, refundId: string | undefined, now: string = new Date().toISOString()): void {
    if (amount < 0) throw new ValidationError('Refund cannot be negative', 'amount');
    const from = this._status.value;
    this._status = OrderStatusVO.create(ORDER_STATUS.REFUNDED);
    this.emitStatusChange(from, ORDER_STATUS.REFUNDED);
    this.addDomainEvent(
      new OrderRefundedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, refundedAt: now, amount, currency: this._currency, refundId },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  putOnHold(reason: string, now: string = new Date().toISOString()): void {
    this.assertTransition(ORDER_STATUS.ON_HOLD);
    const from = this._status.value;
    this._status = OrderStatusVO.create(ORDER_STATUS.ON_HOLD);
    this.emitStatusChange(from, ORDER_STATUS.ON_HOLD);
    this.addDomainEvent(
      new OrderOnHoldEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, onHoldAt: now, reason },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  release(releasedBy?: string, now: string = new Date().toISOString()): void {
    if (!this._status.isOnHold()) {
      throw new BusinessRuleError(
        `Cannot release — order is not on hold (current: ${this._status.value})`,
        'NOT_ON_HOLD',
      );
    }
    const from = this._status.value;
    this._status = OrderStatusVO.pending();
    this.emitStatusChange(from, ORDER_STATUS.PENDING, releasedBy);
    this.addDomainEvent(
      new OrderReleasedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, releasedAt: now, releasedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  changePriority(newPriority: OrderPriorityVO, changedBy?: string, now: string = new Date().toISOString()): void {
    if (this._priority.value === newPriority.value) return;
    const from = this._priority.value;
    this._priority = newPriority;
    this.addDomainEvent(
      new OrderPriorityChangedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, fromPriority: from, toPriority: newPriority.value, changedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updateNotes(field: 'notes' | 'customerNotes', newNote: OrderNoteVO, now: string): void {
    const previous = field === 'notes' ? this._notes?.value : this._customerNotes?.value;
    if (field === 'notes') this._notes = newNote;
    else this._customerNotes = newNote;
    this.addDomainEvent(
      new OrderNotesUpdatedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, field, previousValue: previous, newValue: newNote.value },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  updatePayment(
    method: string,
    status: string,
    paymentId?: PaymentIdVO,
    now: string = new Date().toISOString(),
  ): void {
    this._paymentMethod = method;
    this._paymentStatus = status;
    if (paymentId) this._paymentId = paymentId;
    this.touch(now);
    this.incrementVersion();
  }

  // ─── Private helpers ───
  private assertTransition(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid status transition: "${this._status.value}" → "${target}"`,
        'INVALID_STATUS_TRANSITION',
        { from: this._status.value, to: target, orderId: this.id },
      );
    }
  }

  private emitStatusChange(from: string, to: string, changedBy?: string): void {
    this.addDomainEvent(
      new OrderStatusChangedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, fromStatus: from, toStatus: to, changedBy },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ─── Factories ───
  static create(params: {
    id: string;
    props: OrderEntityProps;
    items: readonly OrderItemEntity[];
    now: string;
  }): OrderEntity {
    const entity = new OrderEntity(params.id, params.now, params.now, params.props);
    entity._items = [...params.items];
    entity.recalculateTotal();
    entity.addDomainEvent(
      new OrderCreatedEvent({
        aggregateId: params.id,
        payload: {
          orderId: params.id,
          orderNumber: params.props.orderNumber.value,
          customerId: params.props.customerId.value,
          itemCount: entity.itemCount,
          total: entity._total,
          currency: params.props.currency,
          status: params.props.status.value,
          type: params.props.type.value,
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
    props: OrderEntityProps;
    items?: readonly OrderItemEntity[];
    version?: number;
  }): OrderEntity {
    const entity = new OrderEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
    if (params.items) entity._items = [...params.items];
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}
