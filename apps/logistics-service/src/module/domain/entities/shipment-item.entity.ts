/**
 * ShipmentItemEntity — Child of Shipment aggregate
 * @module logistics-service/domain/entities
 *
 * ⚠️ Extends BaseEntity (NOT AggregateRoot)
 *    - NO incrementVersion()
 *    - NO domain event emission (parent aggregate emits)
 *
 * State machine:
 *   pending → packed → shipped → delivered ✓ (final)
 *   shipped → returned ✓ (final)
 *   pending/packed → cancelled ✓ (final)
 */
import { BaseEntity } from '@vubon/shared-kernel/domain/base/base.entity';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ShipmentItemIdVO } from '../value-objects/primitives/shipment-item-id.vo.js';
import { ShipmentItemQuantityVO } from '../value-objects/primitives/shipment-item-quantity.vo.js';
import { ShipmentItemStatusVO } from '../value-objects/primitives/shipment-item-status.vo.js';

// ─── Props Interface ──────────────────────
export interface ShipmentItemEntityProps {
  readonly sku: string;
  readonly name: string;
  readonly quantity: ShipmentItemQuantityVO;
  readonly unitPrice: number;
  readonly totalPrice: number;
  readonly currency: string;
  readonly weightKg?: number;
  readonly status: ShipmentItemStatusVO;
  readonly productId?: string;
  readonly variantId?: string;
  readonly imageUrl?: string;
  readonly notes?: string;
  readonly packedAt?: string;
  readonly shippedAt?: string;
  readonly deliveredAt?: string;
  readonly returnedAt?: string;
  readonly cancelledAt?: string;
  readonly returnReason?: string;
  readonly cancelReason?: string;
  readonly metadata?: Readonly<Record<string, unknown>>;
}

// ─── Entity Class ─────────────────────────
export class ShipmentItemEntity extends BaseEntity<string> {
  // Mutable state
  private _quantity: ShipmentItemQuantityVO;
  private _totalPrice: number;
  private _status: ShipmentItemStatusVO;
  private _packedAt?: string;
  private _shippedAt?: string;
  private _deliveredAt?: string;
  private _returnedAt?: string;
  private _cancelledAt?: string;
  private _returnReason?: string;
  private _cancelReason?: string;
  private _notes?: string;

  // Immutable references
  private readonly _sku: string;
  private readonly _name: string;
  private readonly _unitPrice: number;
  private readonly _currency: string;
  private readonly _weightKg?: number;
  private readonly _productId?: string;
  private readonly _variantId?: string;
  private readonly _imageUrl?: string;
  private readonly _metadata?: Readonly<Record<string, unknown>>;

  private constructor(
    id: string,
    createdAt: string,
    updatedAt: string,
    props: ShipmentItemEntityProps,
    deletedAt?: string | null,
  ) {
    super(id, createdAt, updatedAt, deletedAt);
    this._sku = props.sku;
    this._name = props.name;
    this._quantity = props.quantity;
    this._unitPrice = props.unitPrice;
    this._totalPrice = props.totalPrice;
    this._currency = props.currency;
    this._weightKg = props.weightKg;
    this._status = props.status;
    this._productId = props.productId;
    this._variantId = props.variantId;
    this._imageUrl = props.imageUrl;
    this._notes = props.notes;
    this._packedAt = props.packedAt;
    this._shippedAt = props.shippedAt;
    this._deliveredAt = props.deliveredAt;
    this._returnedAt = props.returnedAt;
    this._cancelledAt = props.cancelledAt;
    this._returnReason = props.returnReason;
    this._cancelReason = props.cancelReason;
    this._metadata = props.metadata;

    this.assertInvariants();
  }

  // ═══════════════ Invariants ═══════════════
  private assertInvariants(): void {
    if (!this._sku || this._sku.trim().length === 0) {
      throw new ValidationError('SKU cannot be empty', 'sku');
    }
    if (!this._name || this._name.trim().length === 0) {
      throw new ValidationError('Item name cannot be empty', 'name');
    }
    if (this._unitPrice < 0) {
      throw new ValidationError('Unit price cannot be negative', 'unitPrice');
    }
    if (this._totalPrice < 0) {
      throw new ValidationError('Total price cannot be negative', 'totalPrice');
    }

    // Price consistency
    const expectedTotal = this._unitPrice * this._quantity.value;
    if (Math.abs(this._totalPrice - expectedTotal) > 0.01) {
      throw new ValidationError(
        `Total price ${this._totalPrice} does not match unitPrice × quantity (${expectedTotal})`,
        'totalPrice',
      );
    }

    if (this._weightKg !== undefined && this._weightKg < 0) {
      throw new ValidationError('Weight cannot be negative', 'weightKg');
    }
  }

  // ═══════════════ Getters ═══════════════
  get sku(): string { return this._sku; }
  get name(): string { return this._name; }
  get quantity(): ShipmentItemQuantityVO { return this._quantity; }
  get unitPrice(): number { return this._unitPrice; }
  get totalPrice(): number { return this._totalPrice; }
  get currency(): string { return this._currency; }
  get weightKg(): number | undefined { return this._weightKg; }
  get status(): ShipmentItemStatusVO { return this._status; }
  get productId(): string | undefined { return this._productId; }
  get variantId(): string | undefined { return this._variantId; }
  get imageUrl(): string | undefined { return this._imageUrl; }
  get notes(): string | undefined { return this._notes; }
  get packedAt(): string | undefined { return this._packedAt; }
  get shippedAt(): string | undefined { return this._shippedAt; }
  get deliveredAt(): string | undefined { return this._deliveredAt; }
  get returnedAt(): string | undefined { return this._returnedAt; }
  get cancelledAt(): string | undefined { return this._cancelledAt; }
  get returnReason(): string | undefined { return this._returnReason; }
  get cancelReason(): string | undefined { return this._cancelReason; }
  get metadata(): Readonly<Record<string, unknown>> | undefined {
    return this._metadata;
  }

  get toIdVO(): ShipmentItemIdVO {
    return ShipmentItemIdVO.reconstitute(this.id);
  }

  // ═══════════════ Predicates ═══════════════
  isPending(): boolean { return this._status.isPending(); }
  isPacked(): boolean { return this._status.isPacked(); }
  isShipped(): boolean { return this._status.isShipped(); }
  isDelivered(): boolean { return this._status.isDelivered(); }
  isReturned(): boolean { return this._status.isReturned(); }
  isCancelled(): boolean { return this._status.isCancelled(); }
  isFinal(): boolean { return this._status.isFinal(); }
  canBeCancelled(): boolean { return this._status.isCancellable(); }

  hasWeight(): boolean {
    return this._weightKg !== undefined && this._weightKg > 0;
  }

  // ═══════════════ Business Actions ═══════════════
  changeQuantity(
    quantity: ShipmentItemQuantityVO,
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isFinal() || this.isShipped()) {
      throw new BusinessRuleError(
        `Cannot change quantity of item in status "${this._status.value}"`,
        'SHIPMENT_ITEM_CANNOT_BE_MODIFIED',
        { itemId: this.id, status: this._status.value },
      );
    }
    this._quantity = quantity;
    this._totalPrice = Math.round(this._unitPrice * quantity.value * 100) / 100;
    this.touch(now);
  }

  markPacked(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('packed');
    this._status = ShipmentItemStatusVO.create('packed');
    this._packedAt = now;
    this.touch(now);
  }

  markShipped(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('shipped');
    this._status = ShipmentItemStatusVO.create('shipped');
    this._shippedAt = now;
    this.touch(now);
  }

  markDelivered(now: string = new Date().toISOString()): void {
    this.assertTransitionTo('delivered');
    this._status = ShipmentItemStatusVO.delivered();
    this._deliveredAt = now;
    this.touch(now);
  }

  markReturned(
    reason?: string,
    now: string = new Date().toISOString(),
  ): void {
    this.assertTransitionTo('returned');
    this._status = ShipmentItemStatusVO.create('returned');
    this._returnedAt = now;
    this._returnReason = reason;
    this.touch(now);
  }

  cancel(
    reason?: string,
    now: string = new Date().toISOString(),
  ): void {
    if (!this.canBeCancelled()) {
      throw new BusinessRuleError(
        `Cannot cancel item in status "${this._status.value}"`,
        'SHIPMENT_ITEM_CANNOT_BE_CANCELLED',
        { itemId: this.id, status: this._status.value },
      );
    }
    this.assertTransitionTo('cancelled');
    this._status = ShipmentItemStatusVO.create('cancelled');
    this._cancelledAt = now;
    this._cancelReason = reason;
    this.touch(now);
  }

  updateNotes(
    notes: string,
    now: string = new Date().toISOString(),
  ): void {
    if (this._status.isFinal()) {
      throw new BusinessRuleError(
        `Cannot update notes for item in status "${this._status.value}"`,
        'SHIPMENT_ITEM_CANNOT_BE_MODIFIED',
        { itemId: this.id, status: this._status.value },
      );
    }
    this._notes = notes;
    this.touch(now);
  }

  // ═══════════════ Private Helpers ═══════════════
  private assertTransitionTo(target: string): void {
    if (!this._status.canTransitionTo(target)) {
      throw new BusinessRuleError(
        `Invalid item status transition: "${this._status.value}" → "${target}"`,
        'INVALID_SHIPMENT_ITEM_STATUS_TRANSITION',
        { from: this._status.value, to: target, itemId: this.id },
      );
    }
  }

  private touch(now: string): void {
    (this as unknown as { updatedAt: string }).updatedAt = now;
  }

  // ═══════════════ Factories ═══════════════
  static create(params: {
    id: ShipmentItemIdVO;
    props: Omit<ShipmentItemEntityProps, 'status'>;
    now: string;
  }): ShipmentItemEntity {
    return new ShipmentItemEntity(
      params.id.value,
      params.now,
      params.now,
      { ...params.props, status: ShipmentItemStatusVO.pending() },
    );
  }

  static reconstitute(params: {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string | null;
    props: ShipmentItemEntityProps;
  }): ShipmentItemEntity {
    return new ShipmentItemEntity(
      params.id,
      params.createdAt,
      params.updatedAt,
      params.props,
      params.deletedAt,
    );
  }
}
