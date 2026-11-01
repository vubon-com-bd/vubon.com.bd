/**
 * OrderEntity — AGGREGATE ROOT
 * @module order-service/domain/entities
 *
 * State machine:
 *   pending → confirmed → processing → packed → shipped
 *   → out_for_delivery → delivered → completed
 *   Any non-terminal → cancelled
 *   delivered/completed → returned → refunded
 *
 * Invariants:
 *   - Must have at least one item
 *   - Total must equal subtotal - discount + tax + shipping
 *   - Cannot exceed item limit
 *   - Terminal statuses cannot transition further
 */
import { AggregateRoot } from '@vubon/shared-kernel/domain/base/base.aggregate';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { OrderVO } from '../value-objects/composites/order.vo.js';
import { OrderItemVO } from '../value-objects/composites/order-item.vo.js';
import { ShippingAddressVO } from '../value-objects/composites/shipping-address.vo.js';
import { BillingAddressVO } from '../value-objects/composites/billing-address.vo.js';
import { OrderStatusVO } from '../value-objects/primitives/order-status.vo.js';
import { OrderTotalVO } from '../value-objects/primitives/order-total.vo.js';
import { OrderSubtotalVO } from '../value-objects/primitives/order-subtotal.vo.js';
import { OrderDiscountVO } from '../value-objects/primitives/order-discount.vo.js';
import { OrderTaxVO } from '../value-objects/primitives/order-tax.vo.js';
import { OrderShippingVO } from '../value-objects/primitives/order-shipping.vo.js';
import { OrderNoteVO } from '../value-objects/primitives/order-note.vo.js';
import { PaymentIdVO } from '../value-objects/primitives/payment-id.vo.js';

import {
  OrderCreatedEvent,
  OrderStatusChangedEvent,
  OrderCancelledEvent,
  OrderPriorityChangedEvent,
  OrderNoteAddedEvent,
} from '../events/order.events.js';

import { ORDER_ITEM_LIMIT } from '@vubon/shared-constants/business/order';

export interface OrderEntityProps {
  readonly vo: OrderVO;
  readonly items: readonly OrderItemVO[];
  readonly shippingAddress: ShippingAddressVO;
  readonly billingAddress?: BillingAddressVO;
  readonly paymentId?: PaymentIdVO;
  readonly paymentMethod?: string;
  readonly confirmedAt?: string;
  readonly shippedAt?: string;
  readonly deliveredAt?: string;
  readonly completedAt?: string;
  readonly cancelledAt?: string;
  readonly returnedAt?: string;
  readonly refundedAt?: string;
}

export class OrderEntity extends AggregateRoot<string> {
  private _vo: OrderVO;
  private _items: OrderItemVO[];
  private readonly _shippingAddress: ShippingAddressVO;
  private readonly _billingAddress?: BillingAddressVO;
  private _paymentId?: PaymentIdVO;
  private _paymentMethod?: string;
  private _confirmedAt?: string;
  private _shippedAt?: string;
  private _deliveredAt?: string;
  private _completedAt?: string;
  private _cancelledAt?: string;
  private _returnedAt?: string;
  private _refundedAt?: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: OrderEntityProps,
    deletedAt?: string | null,
    skipInvariants: boolean = false,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._vo = props.vo;
    this._items = [...props.items];
    this._shippingAddress = props.shippingAddress;
    this._billingAddress = props.billingAddress;
    this._paymentId = props.paymentId;
    this._paymentMethod = props.paymentMethod;
    this._confirmedAt = props.confirmedAt;
    this._shippedAt = props.shippedAt;
    this._deliveredAt = props.deliveredAt;
    this._completedAt = props.completedAt;
    this._cancelledAt = props.cancelledAt;
    this._returnedAt = props.returnedAt;
    this._refundedAt = props.refundedAt;

    if (!skipInvariants) {
      this.assertInvariants();
    }
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    if (this._items.length === 0) {
      throw new ValidationError('Order must have at least one item', 'items');
    }
    if (this._items.length > ORDER_ITEM_LIMIT.MAX_ITEMS_PER_ORDER) {
      throw new ValidationError(
        `Order items exceed limit ${ORDER_ITEM_LIMIT.MAX_ITEMS_PER_ORDER}`,
        'items',
      );
    }
    if (this._vo.status.isDelivered() && !this._deliveredAt) {
      throw new ValidationError('Delivered order requires deliveredAt', 'deliveredAt');
    }
    if (this._vo.status.isCancelled() && !this._cancelledAt) {
      throw new ValidationError('Cancelled order requires cancelledAt', 'cancelledAt');
    }
  }

  // ═══════════════ Getters ═══════════════
  get vo(): OrderVO { return this._vo; }
  get orderNumber(): OrderVO['orderNumber'] { return this._vo.orderNumber; }
  get customerId(): OrderVO['customerId'] { return this._vo.customerId; }
  get status(): OrderStatusVO { return this._vo.status; }
  get items(): readonly OrderItemVO[] { return [...this._items]; }
  get shippingAddress(): ShippingAddressVO { return this._shippingAddress; }
  get billingAddress(): BillingAddressVO | undefined { return this._billingAddress; }
  get paymentId(): PaymentIdVO | undefined { return this._paymentId; }
  get paymentMethod(): string | undefined { return this._paymentMethod; }
  get subtotal(): OrderSubtotalVO { return this._vo.subtotal; }
  get discount(): OrderDiscountVO { return this._vo.discount; }
  get tax(): OrderTaxVO { return this._vo.tax; }
  get shipping(): OrderShippingVO { return this._vo.shipping; }
  get total(): OrderTotalVO { return this._vo.total; }
  get note(): OrderNoteVO | undefined { return this._vo.note; }
  get confirmedAt(): string | undefined { return this._confirmedAt; }
  get shippedAt(): string | undefined { return this._shippedAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get completedAt(): string | undefined { return this._completedAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get returnedAt(): string | undefined { return this._returnedAt; }
  get refundedAt(): string | undefined { return this._refundedAt; }

  // ═══════════════ Predicates ═══════════════
  isPending(): boolean { return this.status.isPending(); }
  isConfirmed(): boolean { return this.status.isConfirmed(); }
  isProcessing(): boolean { return this.status.isProcessing(); }
  isPacked(): boolean { return this.status.isPacked(); }
  isShipped(): boolean { return this.status.isShipped(); }
  isDelivered(): boolean { return this.status.isDelivered(); }
  isCompleted(): boolean { return this.status.isCompleted(); }
  isCancelled(): boolean { return this.status.isCancelled(); }
  isReturned(): boolean { return this.status.isReturned(); }
  isRefunded(): boolean { return this.status.isRefunded(); }
  isTerminal(): boolean { return this.status.isTerminal(); }
  isCancellable(): boolean { return this.status.isCancellable(); }
  isReturnable(): boolean { return this.status.isReturnable(); }


  canBeActivated(): boolean {
    return this.isPending() || this.isConfirmed();
  }

  canBeDeactivated(): boolean {
    return this.isConfirmed() || this.isProcessing();
  }

  get itemCount(): number { return this._items.length; }
  hasDiscount(): boolean { return this.discount.isApplied(); }

  // ═══════════════ Business Actions ═══════════════
  addItem(item: OrderItemVO, now: string = new Date().toISOString()): void {
    if (this.isTerminal() || this.isShipped()) {
      throw new BusinessRuleError(
        `Cannot add item to order in status "${this.status.value}"`,
        'ORDER_CANNOT_BE_MODIFIED',
        { orderId: this.id, status: this.status.value },
      );
    }
    if (this._items.length >= ORDER_ITEM_LIMIT.MAX_ITEMS_PER_ORDER) {
      throw new ValidationError(
        `Order items exceed limit ${ORDER_ITEM_LIMIT.MAX_ITEMS_PER_ORDER}`,
        'items',
      );
    }
    this._items.push(item);
    this.recalculateTotals();
    this.touch(now);
    this.incrementVersion();
  }

  removeItem(itemId: string, now: string = new Date().toISOString()): void {
    if (this.isTerminal() || this.isShipped()) {
      throw new BusinessRuleError(
        `Cannot remove item from order in status "${this.status.value}"`,
        'ORDER_CANNOT_BE_MODIFIED',
        { orderId: this.id, status: this.status.value },
      );
    }
    const idx = this._items.findIndex((i) => i.id.value === itemId);
    if (idx < 0) {
      throw new ValidationError(`Order item "${itemId}" not found`, 'items');
    }
    this._items.splice(idx, 1);
    if (this._items.length === 0) {
      throw new ValidationError('Order must have at least one item', 'items');
    }
    this.recalculateTotals();
    this.touch(now);
    this.incrementVersion();
  }

  confirm(confirmedBy?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('confirmed');
    const from = this.status.value;
    this._vo = OrderVO.create({ ...this._vo.value, status: OrderStatusVO.confirmed() });
    this._confirmedAt = now;
    this.emitStatusChange(from, 'confirmed', confirmedBy);
    this.touch(now);
    this.incrementVersion();
  }

  startProcessing(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('processing');
    const from = this.status.value;
    this._vo = OrderVO.create({ ...this._vo.value, status: OrderStatusVO.processing() });
    this.emitStatusChange(from, 'processing');
    this.touch(now);
    this.incrementVersion();
  }

  pack(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('packed');
    const from = this.status.value;
    this._vo = OrderVO.create({ ...this._vo.value, status: OrderStatusVO.packed() });
    this.emitStatusChange(from, 'packed');
    this.touch(now);
    this.incrementVersion();
  }

  ship(shippedBy?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('shipped');
    const from = this.status.value;
    this._vo = OrderVO.create({ ...this._vo.value, status: OrderStatusVO.shipped() });
    this._shippedAt = now;
    this.emitStatusChange(from, 'shipped', shippedBy);
    this.touch(now);
    this.incrementVersion();
  }

  markDelivered(receivedBy?: string, now: string = new Date().toISOString()): void {
    this.assertTransitionTo('delivered');
    const from = this.status.value;
    this._vo = OrderVO.create({ ...this._vo.value, status: OrderStatusVO.delivered() });
    this._deliveredAt = now;
    this.emitStatusChange(from, 'delivered', receivedBy);
    this.touch(now);
    this.incrementVersion();
  }

  complete(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('completed');
    const from = this.status.value;
    this._vo = OrderVO.create({ ...this._vo.value, status: OrderStatusVO.completed() });
    this._completedAt = now;
    this.emitStatusChange(from, 'completed');
    this.touch(now);
    this.incrementVersion();
  }

  cancel(
    reason: string,
    cancelledBy: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.isCancellable()) {
      throw new BusinessRuleError(
        `Order "${this.id}" cannot be cancelled in status "${this.status.value}"`,
        'ORDER_CANNOT_BE_CANCELLED',
        { orderId: this.id, status: this.status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    const from = this.status.value;
    this._vo = OrderVO.create({ ...this._vo.value, status: OrderStatusVO.cancelled() });
    this._cancelledAt = now;
    this.emitStatusChange(from, 'cancelled', cancelledBy, reason);
    this.addDomainEvent(
      new OrderCancelledEvent({
        aggregateId: this.id,
        payload: {
          orderId: this.id,
          cancelId: `cancel-${this.id}`,
          reason,
          cancelledBy,
          cancelledAt: now,
        },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  markReturned(returnId: string, now: string = new Date().toISOString()): void {
    if (!this.isReturnable()) {
      throw new BusinessRuleError(
        `Order "${this.id}" cannot be returned in status "${this.status.value}"`,
        'ORDER_CANNOT_BE_RETURNED',
        { orderId: this.id, status: this.status.value },
      );
    }
    this.assertTransitionTo('returned');
    const from = this.status.value;
    this._vo = OrderVO.create({ ...this._vo.value, status: OrderStatusVO.returned() });
    this._returnedAt = now;
    this.emitStatusChange(from, 'returned');
    this.touch(now);
    this.incrementVersion();
  }

  markRefunded(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('refunded');
    const from = this.status.value;
    this._vo = OrderVO.create({ ...this._vo.value, status: OrderStatusVO.refunded() });
    this._refundedAt = now;
    this.emitStatusChange(from, 'refunded');
    this.touch(now);
    this.incrementVersion();
  }

  setPayment(paymentId: PaymentIdVO, method: string, now: string = new Date().toISOString()): void {
    this._paymentId = paymentId;
    this._paymentMethod = method;
    this.touch(now);
    this.incrementVersion();
  }

  addNote(note: OrderNoteVO, addedBy: string, now: string = new Date().toISOString()): void {
    this._vo = OrderVO.create({ ...this._vo.value, note });
    this.addDomainEvent(
      new OrderNoteAddedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, note: note.value, addedBy },
        version: this.version + 1,
      }),
    );
    this.touch(now);
    this.incrementVersion();
  }

  // ═══════════════ Private Helpers ═══════════════
  private recalculateTotals(): void {
    const currency = this.subtotal.currency;
    const newSubtotal = this._items.reduce((sum, item) => {
      const line = item.lineTotal;
      return sum + line.amount;
    }, 0);
    const subtotalVO = OrderSubtotalVO.create(Math.round(newSubtotal * 100) / 100, currency);
    const newTotal =
      subtotalVO.amount -
      this.discount.amount +
      this.tax.amount +
      this.shipping.amount;
    const totalVO = OrderTotalVO.create(Math.round(newTotal * 100) / 100, currency);

    this._vo = OrderVO.create({
      ...this._vo.value,
      subtotal: subtotalVO,
      total: totalVO,
    });
  }

  private assertTransitionTo(target: string): void {
    if (!this.status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid order status transition: "${this.status.value}" → "${target}"`,
        'INVALID_ORDER_STATUS_TRANSITION',
        { from: this.status.value, to: target, orderId: this.id },
      );
    }
  }

  private emitStatusChange(
    from: string,
    to: string,
    changedBy?: string,
    reason?: string,
  ): void {
    this.addDomainEvent(
      new OrderStatusChangedEvent({
        aggregateId: this.id,
        payload: { orderId: this.id, fromStatus: from, toStatus: to, changedBy, reason },
        version: this.version + 1,
      }),
    );
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══════════════ Factories ═══════════════
  static create(params: {
    id: string;
    vo: OrderVO;
    items: readonly OrderItemVO[];
    shippingAddress: ShippingAddressVO;
    billingAddress?: BillingAddressVO;
    now: string;
  }): OrderEntity {
    if (!params.vo.status.isPending()) {
      throw new ValidationError('New order must be in pending status', 'status');
    }
    if (params.items.length === 0) {
      throw new ValidationError('Order must have at least one item', 'items');
    }

    const entity = new OrderEntity(
      params.id,
      params.now,
      params.now,
      {
        vo: params.vo,
        items: params.items,
        shippingAddress: params.shippingAddress,
        billingAddress: params.billingAddress,
      },
      null,
    );

    entity.addDomainEvent(
      new OrderCreatedEvent({
        aggregateId: params.id,
        payload: {
          orderId: params.id,
          orderNumber: params.vo.orderNumber.value,
          customerId: params.vo.customerId.value,
          totalAmount: params.vo.total.amount,
          currency: params.vo.total.currency,
          itemCount: params.items.length,
          createdAt: params.now,
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
    version?: number;
  }): OrderEntity {
    const entity = new OrderEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt ?? null,
      true,
    );
    if (params.version !== undefined) {
      for (let i = 0; i < params.version; i++) entity.incrementVersion();
    }
    return entity;
  }
}

// ═══════════════ Extended Predicates (Batch 9 additions) ═══════════════
declare module './order.entity.js' {
  interface OrderEntity {
    canBeActivated(): boolean;
  }
}
