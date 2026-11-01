/**
 * Shipment Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 *
 * Multi-field VO combining all shipment primitives.
 * Immutable snapshot — represents a consistent view of shipment data.
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { SHIPMENT } from '@vubon/shared-constants/logistics';

import { ShipmentIdVO } from '../primitives/shipment-id.vo.js';
import { ShipmentNumberVO } from '../primitives/shipment-number.vo.js';
import { ShipmentStatusVO } from '../primitives/shipment-status.vo.js';
import { ShipmentTypeVO } from '../primitives/shipment-type.vo.js';
import { ShipmentPriorityVO } from '../primitives/shipment-priority.vo.js';

// ─── Props Interface ──────────────────────
export interface ShipmentVOProps {
  readonly id: ShipmentIdVO;
  readonly shipmentNumber: ShipmentNumberVO;
  readonly trackingNumber: string;
  readonly status: ShipmentStatusVO;
  readonly type: ShipmentTypeVO;
  readonly priority: ShipmentPriorityVO;

  // Addresses
  readonly shippingAddress: string; // one-line formatted
  readonly pickupAddress?: string;

  // Package info
  readonly itemCount: number;
  readonly totalWeightKg?: number;
  readonly totalVolumeM3?: number;

  // Money
  readonly declaredValue?: number;
  readonly currency?: string;
  readonly shippingCost?: number;
  readonly codAmount?: number;
  readonly isCOD: boolean;
  readonly isInsured: boolean;
  readonly idempotencyKey?: string;

  // Timestamps
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly estimatedDeliveryAt?: string;
  readonly deliveredAt?: string;
}

// ─── Composite VO ─────────────────────────
export class ShipmentVO extends BaseVO<ShipmentVOProps> {
  private constructor(props: ShipmentVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: ShipmentVOProps): ShipmentVO {
    const vo = new ShipmentVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: ShipmentVOProps): ShipmentVO {
    return new ShipmentVO(props);
  }

  // ⚠️ validate() only — never override `get value()`
  protected validate(): void {
    const v = this.value;

    // Item count
    if (!Number.isInteger(v.itemCount) || v.itemCount < 1) {
      throw new ValidationError('Shipment must have at least 1 item', 'itemCount');
    }
    if (v.itemCount > SHIPMENT.MAX_ITEMS_PER_SHIPMENT) {
      throw new ValidationError(
        `Shipment item count ${v.itemCount} exceeds max ${SHIPMENT.MAX_ITEMS_PER_SHIPMENT}`,
        'itemCount',
      );
    }

    // Weight
    if (v.totalWeightKg !== undefined) {
      if (v.totalWeightKg < 0) {
        throw new ValidationError('Total weight cannot be negative', 'totalWeightKg');
      }
      if (v.totalWeightKg > SHIPMENT.MAX_WEIGHT_KG) {
        throw new ValidationError(
          `Total weight ${v.totalWeightKg}kg exceeds max ${SHIPMENT.MAX_WEIGHT_KG}kg`,
          'totalWeightKg',
        );
      }
    }

    // Volume
    if (v.totalVolumeM3 !== undefined && v.totalVolumeM3 < 0) {
      throw new ValidationError('Total volume cannot be negative', 'totalVolumeM3');
    }

    // Declared value
    if (v.declaredValue !== undefined) {
      if (v.declaredValue < 0) {
        throw new ValidationError('Declared value cannot be negative', 'declaredValue');
      }
      if (v.declaredValue > SHIPMENT.MAX_DECLARED_VALUE) {
        throw new ValidationError(
          `Declared value ${v.declaredValue} exceeds max ${SHIPMENT.MAX_DECLARED_VALUE}`,
          'declaredValue',
        );
      }
    }

    // COD
    if (v.codAmount !== undefined && v.codAmount < 0) {
      throw new ValidationError('COD amount cannot be negative', 'codAmount');
    }

    // Shipping cost
    if (v.shippingCost !== undefined && v.shippingCost < 0) {
      throw new ValidationError('Shipping cost cannot be negative', 'shippingCost');
    }

    // Tracking number not empty
    if (!v.trackingNumber || v.trackingNumber.trim().length === 0) {
      throw new ValidationError('Tracking number cannot be empty', 'trackingNumber');
    }
  }

  // ═══ Getters ═══════════════════════════
  get id(): ShipmentIdVO {
    return this.value.id;
  }
  get shipmentNumber(): ShipmentNumberVO {
    return this.value.shipmentNumber;
  }
  get trackingNumber(): string {
    return this.value.trackingNumber;
  }
  get status(): ShipmentStatusVO {
    return this.value.status;
  }
  get type(): ShipmentTypeVO {
    return this.value.type;
  }
  get priority(): ShipmentPriorityVO {
    return this.value.priority;
  }
  get shippingAddress(): string {
    return this.value.shippingAddress;
  }
  get pickupAddress(): string | undefined {
    return this.value.pickupAddress;
  }
  get itemCount(): number {
    return this.value.itemCount;
  }
  get totalWeightKg(): number | undefined {
    return this.value.totalWeightKg;
  }
  get totalVolumeM3(): number | undefined {
    return this.value.totalVolumeM3;
  }
  get declaredValue(): number | undefined {
    return this.value.declaredValue;
  }
  get currency(): string | undefined {
    return this.value.currency;
  }
  get shippingCost(): number | undefined {
    return this.value.shippingCost;
  }
  get codAmount(): number | undefined {
    return this.value.codAmount;
  }
  get isCOD(): boolean {
    return this.value.isCOD;
  }
  get isInsured(): boolean {
    return this.value.isInsured;
  }
  get idempotencyKey(): string | undefined {
    return this.value.idempotencyKey;
  }
  get createdAt(): string {
    return this.value.createdAt;
  }
  get updatedAt(): string {
    return this.value.updatedAt;
  }
  get estimatedDeliveryAt(): string | undefined {
    return this.value.estimatedDeliveryAt;
  }
  get deliveredAt(): string | undefined {
    return this.value.deliveredAt;
  }

  // ═══ Business Methods ═════════════════
  isDelivered(): boolean {
    return this.status.isDelivered();
  }

  isCancelled(): boolean {
    return this.status.isCancelled();
  }

  isFinal(): boolean {
    return this.status.isFinal();
  }

  isInTransit(): boolean {
    return this.status.isInTransit();
  }

  isPending(): boolean {
    return this.status.isPending();
  }

  hasCOD(): boolean {
    return this.isCOD && (this.codAmount ?? 0) > 0;
  }

  hasInsurance(): boolean {
    return this.isInsured && (this.declaredValue ?? 0) > 0;
  }

  isOverweight(): boolean {
    return (this.totalWeightKg ?? 0) > SHIPMENT.MAX_WEIGHT_KG;
  }

  isDelayed(): boolean {
    if (!this.estimatedDeliveryAt || this.deliveredAt) {
      return false;
    }
    return new Date(this.estimatedDeliveryAt) < new Date();
  }

  canBeCancelled(): boolean {
    return this.status.isCancellable();
  }

  get displayName(): string {
    return `${this.shipmentNumber.value} (${this.trackingNumber})`;
  }
}
