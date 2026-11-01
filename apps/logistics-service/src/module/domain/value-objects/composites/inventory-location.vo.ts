/**
 * InventoryLocation Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { InventoryLocationIdVO } from '../primitives/inventory-location-id.vo.js';
import { InventoryLocationCodeVO } from '../primitives/inventory-location-code.vo.js';
import { InventoryLocationNameVO } from '../primitives/inventory-location-name.vo.js';
import { InventoryLocationStatusVO } from '../primitives/inventory-location-status.vo.js';

export interface InventoryLocationVOProps {
  readonly id: InventoryLocationIdVO;
  readonly warehouseId: string;
  readonly code: InventoryLocationCodeVO;
  readonly name: InventoryLocationNameVO;
  readonly zone: string;
  readonly aisle?: string;
  readonly rack?: string;
  readonly shelf?: string;
  readonly bin?: string;
  readonly barcode?: string;
  readonly maxCapacityKg?: number;
  readonly maxCapacityM3?: number;
  readonly currentKg: number;
  readonly currentM3: number;
  readonly status: InventoryLocationStatusVO;
  readonly isQuarantine: boolean;
  readonly isPickable: boolean;
  readonly priority: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class InventoryLocationVO extends BaseVO<InventoryLocationVOProps> {
  private constructor(props: InventoryLocationVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: InventoryLocationVOProps): InventoryLocationVO {
    const vo = new InventoryLocationVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: InventoryLocationVOProps): InventoryLocationVO {
    return new InventoryLocationVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.warehouseId || v.warehouseId.trim().length === 0) {
      throw new ValidationError('WarehouseId required', 'warehouseId');
    }
    if (!v.zone || v.zone.trim().length === 0) {
      throw new ValidationError('Zone required', 'zone');
    }
    if (v.currentKg < 0) {
      throw new ValidationError('Current kg cannot be negative', 'currentKg');
    }
    if (v.currentM3 < 0) {
      throw new ValidationError('Current m3 cannot be negative', 'currentM3');
    }
    if (v.maxCapacityKg !== undefined && v.currentKg > v.maxCapacityKg) {
      throw new ValidationError(
        `currentKg ${v.currentKg} exceeds maxCapacityKg ${v.maxCapacityKg}`,
        'currentKg',
      );
    }
    if (v.maxCapacityM3 !== undefined && v.currentM3 > v.maxCapacityM3) {
      throw new ValidationError(
        `currentM3 ${v.currentM3} exceeds maxCapacityM3 ${v.maxCapacityM3}`,
        'currentM3',
      );
    }
    if (!Number.isInteger(v.priority) || v.priority < 0) {
      throw new ValidationError('Priority must be non-negative integer', 'priority');
    }
  }

  get id(): InventoryLocationIdVO { return this.value.id; }
  get warehouseId(): string { return this.value.warehouseId; }
  get code(): InventoryLocationCodeVO { return this.value.code; }
  get name(): InventoryLocationNameVO { return this.value.name; }
  get zone(): string { return this.value.zone; }
  get aisle(): string | undefined { return this.value.aisle; }
  get rack(): string | undefined { return this.value.rack; }
  get shelf(): string | undefined { return this.value.shelf; }
  get bin(): string | undefined { return this.value.bin; }
  get barcode(): string | undefined { return this.value.barcode; }
  get maxCapacityKg(): number | undefined { return this.value.maxCapacityKg; }
  get maxCapacityM3(): number | undefined { return this.value.maxCapacityM3; }
  get currentKg(): number { return this.value.currentKg; }
  get currentM3(): number { return this.value.currentM3; }
  get status(): InventoryLocationStatusVO { return this.value.status; }
  get isQuarantine(): boolean { return this.value.isQuarantine; }
  get isPickable(): boolean { return this.value.isPickable; }
  get priority(): number { return this.value.priority; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isActive(): boolean { return this.status.isActive(); }
  isUsable(): boolean { return this.status.isUsable(); }
  isFinal(): boolean { return this.status.isFinal(); }

  availableKg(): number {
    return Math.max(0, (this.maxCapacityKg ?? 0) - this.currentKg);
  }
  availableM3(): number {
    return Math.max(0, (this.maxCapacityM3 ?? 0) - this.currentM3);
  }
  utilizationPercentKg(): number {
    if (!this.maxCapacityKg) return 0;
    return (this.currentKg / this.maxCapacityKg) * 100;
  }
  utilizationPercentM3(): number {
    if (!this.maxCapacityM3) return 0;
    return (this.currentM3 / this.maxCapacityM3) * 100;
  }

  canHold(weightKg: number, volumeM3?: number): boolean {
    if (!this.isUsable() || this.isQuarantine) return false;
    if (weightKg > this.availableKg()) return false;
    if (volumeM3 !== undefined && volumeM3 > this.availableM3()) return false;
    return true;
  }

  get displayLocation(): string {
    return [this.zone, this.aisle, this.rack, this.shelf, this.bin]
      .filter((p): p is string => !!p)
      .join('/');
  }
}
