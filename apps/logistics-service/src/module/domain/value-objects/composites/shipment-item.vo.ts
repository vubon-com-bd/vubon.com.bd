/**
 * ShipmentItem Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 *
 * Immutable snapshot of a shipment line item.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { ShipmentItemIdVO } from '../primitives/shipment-item-id.vo.js';
import { ShipmentItemQuantityVO } from '../primitives/shipment-item-quantity.vo.js';
import { ShipmentItemStatusVO } from '../primitives/shipment-item-status.vo.js';

// ─── Props Interface ──────────────────────
export interface ShipmentItemVOProps {
  readonly id: ShipmentItemIdVO;
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
  readonly createdAt: string;
  readonly updatedAt: string;
}

// ─── Composite VO ─────────────────────────
export class ShipmentItemVO extends BaseVO<ShipmentItemVOProps> {
  private constructor(props: ShipmentItemVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ShipmentItemVOProps): ShipmentItemVO {
    const vo = new ShipmentItemVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ShipmentItemVOProps): ShipmentItemVO {
    return new ShipmentItemVO(props);
  }

  protected validate(): void {
    const v = this.value;

    if (!v.sku || v.sku.trim().length === 0) {
      throw new ValidationError('SKU cannot be empty', 'sku');
    }
    if (v.sku.length > 100) {
      throw new ValidationError('SKU cannot exceed 100 chars', 'sku');
    }

    if (!v.name || v.name.trim().length === 0) {
      throw new ValidationError('Item name cannot be empty', 'name');
    }
    if (v.name.length > 255) {
      throw new ValidationError('Item name cannot exceed 255 chars', 'name');
    }

    if (v.unitPrice < 0) {
      throw new ValidationError('Unit price cannot be negative', 'unitPrice');
    }
    if (v.totalPrice < 0) {
      throw new ValidationError('Total price cannot be negative', 'totalPrice');
    }

    if (!v.currency || v.currency.length < 3 || v.currency.length > 5) {
      throw new ValidationError('Currency must be 3-5 chars', 'currency');
    }

    if (v.weightKg !== undefined && v.weightKg < 0) {
      throw new ValidationError('Weight cannot be negative', 'weightKg');
    }

    // Price consistency: totalPrice ≈ unitPrice × quantity (allow 0.01 rounding)
    const expectedTotal = v.unitPrice * v.quantity.value;
    if (Math.abs(v.totalPrice - expectedTotal) > 0.01) {
      throw new ValidationError(
        `Total price ${v.totalPrice} does not match unitPrice × quantity (${expectedTotal})`,
        'totalPrice',
      );
    }
  }

  // ═══ Getters ═══════════════════════════
  get id(): ShipmentItemIdVO { return this.value.id; }
  get sku(): string { return this.value.sku; }
  get name(): string { return this.value.name; }
  get quantity(): ShipmentItemQuantityVO { return this.value.quantity; }
  get unitPrice(): number { return this.value.unitPrice; }
  get totalPrice(): number { return this.value.totalPrice; }
  get currency(): string { return this.value.currency; }
  get weightKg(): number | undefined { return this.value.weightKg; }
  get status(): ShipmentItemStatusVO { return this.value.status; }
  get productId(): string | undefined { return this.value.productId; }
  get variantId(): string | undefined { return this.value.variantId; }
  get imageUrl(): string | undefined { return this.value.imageUrl; }
  get notes(): string | undefined { return this.value.notes; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  // ═══ Business Methods ═════════════════
  isPending(): boolean { return this.status.isPending(); }
  isPacked(): boolean { return this.status.isPacked(); }
  isShipped(): boolean { return this.status.isShipped(); }
  isDelivered(): boolean { return this.status.isDelivered(); }
  isReturned(): boolean { return this.status.isReturned(); }
  isCancelled(): boolean { return this.status.isCancelled(); }
  isFinal(): boolean { return this.status.isFinal(); }

  hasWeight(): boolean {
    return this.weightKg !== undefined && this.weightKg > 0;
  }

  get displayName(): string {
    return `${this.sku} — ${this.name} × ${this.quantity.value}`;
  }
}
