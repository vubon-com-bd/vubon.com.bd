/**
 * Packaging Value Object (Composite)
 * @module logistics-service/domain/value-objects/composites
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';

import { PackagingIdVO } from '../primitives/packaging-id.vo.js';
import { PackagingTypeVO } from '../primitives/packaging-type.vo.js';
import { PackagingMaterialVO } from '../primitives/packaging-material.vo.js';
import { PackagingStatusVO } from '../primitives/packaging-status.vo.js';
import { PackagingSizeVO } from '../primitives/packaging-size.vo.js';

export interface PackagingVOProps {
  readonly id: PackagingIdVO;
  readonly name: string;
  readonly code: string;
  readonly type: PackagingTypeVO;
  readonly material: PackagingMaterialVO;
  readonly status: PackagingStatusVO;
  readonly size: PackagingSizeVO;
  readonly cost?: number;
  readonly currency?: string;
  readonly imageUrl?: string;
  readonly isFragile: boolean;
  readonly isTemperatureControlled: boolean;
  readonly isRecyclable: boolean;
  readonly stock: number;
  readonly isDefault: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export class PackagingVO extends BaseVO<PackagingVOProps> {
  private constructor(props: PackagingVOProps) {
    super(props);
    Object.freeze(this);
  }

  static create(props: PackagingVOProps): PackagingVO {
    const vo = new PackagingVO(props);
    vo.validate();
    return vo;
  }

  static reconstitute(props: PackagingVOProps): PackagingVO {
    return new PackagingVO(props);
  }

  protected validate(): void {
    const v = this.value;
    if (!v.code) throw new ValidationError('Code required', 'code');
    if (!v.name) throw new ValidationError('Name required', 'name');
    if (v.stock < 0) {
      throw new ValidationError('Stock cannot be negative', 'stock');
    }
    if (v.cost !== undefined && v.cost < 0) {
      throw new ValidationError('Cost cannot be negative', 'cost');
    }
    if (v.currency !== undefined && v.currency.length < 3) {
      throw new ValidationError('Currency must be at least 3 chars', 'currency');
    }
  }

  get id(): PackagingIdVO { return this.value.id; }
  get name(): string { return this.value.name; }
  get code(): string { return this.value.code; }
  get type(): PackagingTypeVO { return this.value.type; }
  get material(): PackagingMaterialVO { return this.value.material; }
  get status(): PackagingStatusVO { return this.value.status; }
  get size(): PackagingSizeVO { return this.value.size; }
  get cost(): number | undefined { return this.value.cost; }
  get currency(): string | undefined { return this.value.currency; }
  get imageUrl(): string | undefined { return this.value.imageUrl; }
  get isFragile(): boolean { return this.value.isFragile; }
  get isTemperatureControlled(): boolean { return this.value.isTemperatureControlled; }
  get isRecyclable(): boolean { return this.value.isRecyclable; }
  get stock(): number { return this.value.stock; }
  get isDefault(): boolean { return this.value.isDefault; }
  get createdAt(): string { return this.value.createdAt; }
  get updatedAt(): string { return this.value.updatedAt; }

  isActive(): boolean { return this.status.isActive(); }
  isOutOfStock(): boolean { return this.status.isOutOfStock(); }
  isUsable(): boolean { return this.status.isUsable() && this.stock > 0; }

  get dimensions(): string {
    return `${this.size.lengthCm}×${this.size.widthCm}×${this.size.heightCm}cm`;
  }

  get volumeM3(): number {
    return this.size.volumeM3;
  }

  canHold(weightKg: number): boolean {
    return weightKg <= this.size.maxWeightKg;
  }

  isEcoFriendly(): boolean {
    return this.isRecyclable || this.material.isEcoFriendly();
  }
}
