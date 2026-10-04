/**
 * OrderItemEntity — child entity of Order aggregate
 * @module order-service/domain/entities
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { OrderItemIdVO } from '../value-objects/primitives/order-item-id.vo.js';
import { OrderItemQuantityVO } from '../value-objects/primitives/order-item-quantity.vo.js';
import { OrderItemPriceVO } from '../value-objects/primitives/order-item-price.vo.js';
import { OrderItemStatusVO } from '../value-objects/primitives/order-item-status.vo.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';
import { VariantIdVO } from '../value-objects/primitives/variant-id.vo.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import { ORDER_ITEM_STATUS } from '@vubon/shared-constants/business/order';
import {
  OrderItemStatusChangedEvent,
  OrderItemUpdatedEvent,
} from '../events/order-item.events.js';

export interface OrderItemEntityProps {
  readonly productId: ProductIdVO;
  readonly variantId?: VariantIdVO;
  readonly vendorId?: VendorIdVO;
  readonly sku: string;
  readonly name: string;
  readonly imageUrl?: string;
  readonly type: string;
  readonly quantity: OrderItemQuantityVO;
  readonly price: OrderItemPriceVO;
  readonly status: OrderItemStatusVO;
  readonly discountAmount: number;
  readonly taxAmount: number;
  readonly shippingAmount: number;
  readonly attributes?: Readonly<Record<string, string>>;
  readonly notes?: string;
}

export class OrderItemEntity extends BaseEntity<string> {
  private _quantity: OrderItemQuantityVO;
  private _price: OrderItemPriceVO;
  private _status: OrderItemStatusVO;
  private _discountAmount: number;
  private _taxAmount: number;
  private _shippingAmount: number;
  private _notes?: string;

  private readonly _productId: ProductIdVO;
  private readonly _variantId?: VariantIdVO;
  private readonly _vendorId?: VendorIdVO;
  private readonly _sku: string;
  private readonly _name: string;
  private readonly _imageUrl?: string;
  private readonly _type: string;
  private readonly _attributes?: Readonly<Record<string, string>>;
  private readonly _currency: string;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: OrderItemEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._productId = props.productId;
    this._variantId = props.variantId;
    this._vendorId = props.vendorId;
    this._sku = props.sku;
    this._name = props.name;
    this._imageUrl = props.imageUrl;
    this._type = props.type;
    this._quantity = props.quantity;
    this._price = props.price;
    this._status = props.status;
    this._discountAmount = props.discountAmount;
    this._taxAmount = props.taxAmount;
    this._shippingAmount = props.shippingAmount;
    this._attributes = props.attributes;
    this._notes = props.notes;
    this._currency = props.price.currency;
    this.assertInvariants();
  }

  private assertInvariants(): void {
    if (this._sku.trim().length === 0) {
      throw new ValidationError('SKU cannot be empty', 'sku');
    }
    if (this._discountAmount < 0 || this._taxAmount < 0 || this._shippingAmount < 0) {
      throw new ValidationError('Amounts cannot be negative', 'amount');
    }
    if (this._discountAmount > this.lineSubtotal) {
      throw new ValidationError(
        `Discount ${this._discountAmount} exceeds subtotal ${this.lineSubtotal}`,
        'discountAmount',
      );
    }
  }

  // ─── Getters ───
  get productId(): ProductIdVO { return this._productId; }
  get variantId(): VariantIdVO | undefined { return this._variantId; }
  get vendorId(): VendorIdVO | undefined { return this._vendorId; }
  get sku(): string { return this._sku; }
  get name(): string { return this._name; }
  get imageUrl(): string | undefined { return this._imageUrl; }
  get type(): string { return this._type; }
  get quantity(): OrderItemQuantityVO { return this._quantity; }
  get price(): OrderItemPriceVO { return this._price; }
  get status(): OrderItemStatusVO { return this._status; }
  get discountAmount(): number { return this._discountAmount; }
  get taxAmount(): number { return this._taxAmount; }
  get shippingAmount(): number { return this._shippingAmount; }
  get attributes(): Readonly<Record<string, string>> | undefined { return this._attributes; }
  get notes(): string | undefined { return this._notes; }
  get currency(): string { return this._currency; }

  get toIdVO(): OrderItemIdVO { return OrderItemIdVO.reconstitute(this.id); }

  // ─── Computed ───
  get lineSubtotal(): number {
    return Math.round(this._price.amount * this._quantity.value * 100) / 100;
  }
  get lineTotal(): number {
    const t = this.lineSubtotal - this._discountAmount + this._taxAmount + this._shippingAmount;
    return Math.round(t * 100) / 100;
  }

  // ─── Business methods ───
  changeQuantity(newQty: OrderItemQuantityVO, now: string): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        `Cannot change quantity of item in status "${this._status.value}"`,
        'ITEM_FINAL_STATUS',
        { itemId: this.id, status: this._status.value },
      );
    }
    this._quantity = newQty;
    this.touch(now);
  }

  applyDiscount(amount: number, now: string): void {
    if (amount < 0) throw new ValidationError('Discount cannot be negative', 'discountAmount');
    if (amount > this.lineSubtotal) {
      throw new ValidationError(
        `Discount ${amount} exceeds subtotal ${this.lineSubtotal}`,
        'discountAmount',
      );
    }
    this._discountAmount = Math.round(amount * 100) / 100;
    this.touch(now);
  }

  changeStatus(newStatus: OrderItemStatusVO, changedBy?: string, now: string = new Date().toISOString()): OrderItemStatusChangedEvent | null {
    if (!this._status.canTransitionTo(newStatus.value)) {
      throw new BusinessRuleError(
        `Cannot transition item status from "${this._status.value}" to "${newStatus.value}"`,
        'INVALID_ITEM_STATUS_TRANSITION',
        { from: this._status.value, to: newStatus.value },
      );
    }
    const from = this._status.value;
    this._status = newStatus;
    this.touch(now);
    return new OrderItemStatusChangedEvent({
      aggregateId: this.id,
      payload: {
        orderId: '',
        itemId: this.id,
        fromStatus: from,
        toStatus: newStatus.value,
        changedBy,
      },
      version: 1,
    });
  }

  updateNotes(notes: string, now: string): void {
    this._notes = notes.trim().slice(0, 500);
    this.touch(now);
  }

  // ─── Predicates ───
  canBeCancelled(): boolean {
    return !this._status.isShipped() && !this._status.isFinal();
  }

  canBeReturned(): boolean {
    return this._status.isDelivered() || this._status.isShipped();
  }

  isDelivered(): boolean { return this._status.isDelivered(); }
  isShipped(): boolean { return this._status.isShipped(); }
  isPending(): boolean { return this._status.isPending(); }
  isConfirmed(): boolean { return this._status.isConfirmed(); }
  isPacked(): boolean { return this._status.isPacked(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isReturned(): boolean { return this._status.isReturned(); }
  isRefunded(): boolean { return this._status.isRefunded(); }
  isFinal(): boolean { return this._status.isFinal(); }

  hasDiscount(): boolean { return this._discountAmount > 0 || this._price.hasDiscount(); }
  hasVariant(): boolean { return this._variantId !== undefined; }

  // ─── Private ───
  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ─── Factories ───
  static create(params: {
    id: string;
    props: OrderItemEntityProps;
    now: string;
  }): OrderItemEntity {
    return new OrderItemEntity(params.id, params.now, params.now, params.props);
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: OrderItemEntityProps;
  }): OrderItemEntity {
    return new OrderItemEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
