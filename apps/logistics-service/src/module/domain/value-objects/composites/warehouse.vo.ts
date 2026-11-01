/**
 * Warehouse Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { WarehouseIdVO } from '../primitives/warehouse-id.vo.js';
import { WarehouseCodeVO } from '../primitives/warehouse-code.vo.js';
import { WarehouseNameVO } from '../primitives/warehouse-name.vo.js';
import { WarehouseStatusVO } from '../primitives/warehouse-status.vo.js';

export interface WarehouseVOProps {
  readonly id: WarehouseIdVO;
  readonly code: WarehouseCodeVO;
  readonly name: WarehouseNameVO;
  readonly type: string;
  readonly status: WarehouseStatusVO;
  readonly address: string;
  readonly contactName?: string;
  readonly contactPhone?: string;
  readonly contactEmail?: string;
  readonly managerId?: string;
  readonly capacityM3?: number;
  readonly capacityKg?: number;
  readonly usedCapacityM3?: number;
  readonly usedCapacityKg?: number;
  readonly maxSkus?: number;
  readonly zone: string;
  readonly operatingHoursStart?: number;
  readonly operatingHoursEnd?: number;
  readonly timezone: string;
  readonly isDefault: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class WarehouseVO extends BaseVO<WarehouseVOProps> {
  private constructor(props: WarehouseVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: WarehouseVOProps): WarehouseVO {
    const vo = new WarehouseVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: WarehouseVOProps): WarehouseVO {
    return new WarehouseVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.type) throw new ValidationError('Type required', 'type');
    if (!v.zone) throw new ValidationError('Zone required', 'zone');
    if (!v.address) throw new ValidationError('Address required', 'address');
    if (!v.timezone) throw new ValidationError('Timezone required', 'timezone');

    if (v.capacityM3 !== undefined && v.capacityM3 < 0) {
      throw new ValidationError('Capacity (m3) cannot be negative', 'capacityM3');
    }
    if (v.capacityKg !== undefined && v.capacityKg < 0) {
      throw new ValidationError('Capacity (kg) cannot be negative', 'capacityKg');
    }
    if (v.usedCapacityM3 !== undefined && v.capacityM3 !== undefined) {
      if (v.usedCapacityM3 > v.capacityM3) {
        throw new ValidationError(
          `Used capacity ${v.usedCapacityM3}m³ exceeds capacity ${v.capacityM3}m³`,
          'usedCapacityM3',
        );
      }
    }
    if (v.usedCapacityKg !== undefined && v.capacityKg !== undefined) {
      if (v.usedCapacityKg > v.capacityKg) {
        throw new ValidationError(
          `Used capacity ${v.usedCapacityKg}kg exceeds capacity ${v.capacityKg}kg`,
          'usedCapacityKg',
        );
      }
    }
  }

  get id(): WarehouseIdVO { return this.value.id; }
  get code(): WarehouseCodeVO { return this.value.code; }
  get name(): WarehouseNameVO { return this.value.name; }
  get type(): string { return this.value.type; }
  get status(): WarehouseStatusVO { return this.value.status; }
  get address(): string { return this.value.address; }
  get contactName(): string | undefined { return this.value.contactName; }
  get contactPhone(): string | undefined { return this.value.contactPhone; }
  get contactEmail(): string | undefined { return this.value.contactEmail; }
  get managerId(): string | undefined { return this.value.managerId; }
  get capacityM3(): number | undefined { return this.value.capacityM3; }
  get capacityKg(): number | undefined { return this.value.capacityKg; }
  get usedCapacityM3(): number | undefined { return this.value.usedCapacityM3; }
  get usedCapacityKg(): number | undefined { return this.value.usedCapacityKg; }
  get maxSkus(): number | undefined { return this.value.maxSkus; }
  get zone(): string { return this.value.zone; }
  get operatingHoursStart(): number | undefined { return this.value.operatingHoursStart; }
  get operatingHoursEnd(): number | undefined { return this.value.operatingHoursEnd; }
  get timezone(): string { return this.value.timezone; }
  get isDefault(): boolean { return this.value.isDefault; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isActive(): boolean { return this.status.isActive(); }
  isOperational(): boolean { return this.status.isOperational(); }
  isFinal(): boolean { return this.status.isFinal(); }

  utilizationPercent(): number {
    if (!this.capacityM3 || !this.usedCapacityM3) return 0;
    return (this.usedCapacityM3 / this.capacityM3) * 100;
  }

  isFull(): boolean {
    return this.utilizationPercent() >= 95;
  }

  availableCapacityM3(): number {
    return (this.capacityM3 ?? 0) - (this.usedCapacityM3 ?? 0);
  }
}
