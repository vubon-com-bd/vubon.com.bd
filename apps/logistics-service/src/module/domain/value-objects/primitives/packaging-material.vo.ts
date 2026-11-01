/**
 * PackagingMaterial Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { ValidationError } from '@vubon/shared-kernel/domain/errors/validation.error';
import { PACKAGING_MATERIAL } from '@vubon/shared-constants/logistics';

export type PackagingMaterialValue =
  (typeof PACKAGING_MATERIAL)[keyof typeof PACKAGING_MATERIAL];

const VALID_MATERIALS: readonly string[] = Object.values(PACKAGING_MATERIAL);

export class PackagingMaterialVO extends BaseVO<PackagingMaterialValue> {
  private constructor(value: PackagingMaterialValue) {
    super(value);
  }

  static create(raw: string): PackagingMaterialVO {
    if (typeof raw !== 'string') {
      throw new ValidationError('PackagingMaterial must be a string', 'material');
    }
    const normalized = raw.trim().toLowerCase();
    if (!VALID_MATERIALS.includes(normalized)) {
      throw new ValidationError(
        `Invalid PackagingMaterial: "${normalized}". Allowed: ${VALID_MATERIALS.join(', ')}`,
        'material',
      );
    }
    return new PackagingMaterialVO(normalized as PackagingMaterialValue);
  }

  static reconstitute(raw: string): PackagingMaterialVO {
    return new PackagingMaterialVO(raw as PackagingMaterialValue);
  }

  isCardboard(): boolean { return this.value === PACKAGING_MATERIAL.CARDBOARD; }
  isPlastic(): boolean { return this.value === PACKAGING_MATERIAL.PLASTIC; }
  isPaper(): boolean { return this.value === PACKAGING_MATERIAL.PAPER; }
  isWood(): boolean { return this.value === PACKAGING_MATERIAL.WOOD; }
  isMetal(): boolean { return this.value === PACKAGING_MATERIAL.METAL; }
  isGlass(): boolean { return this.value === PACKAGING_MATERIAL.GLASS; }
  isBiodegradable(): boolean { return this.value === PACKAGING_MATERIAL.BIODEGRADABLE; }
  isRecycled(): boolean { return this.value === PACKAGING_MATERIAL.RECYCLED; }

  isEcoFriendly(): boolean {
    return this.isBiodegradable() || this.isRecycled() || this.isPaper();
  }
}
