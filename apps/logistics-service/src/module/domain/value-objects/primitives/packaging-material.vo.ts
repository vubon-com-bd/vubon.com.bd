/**
 * PackagingMaterial Value Object
 * @module logistics-service/domain/value-objects/primitives
 */
import { BaseVO } from '@vubon/shared-kernel/domain/base/base.vo';
import { PACKAGING_MATERIAL } from '@vubon/shared-constants/logistics';
import { InvalidPackagingMaterialError } from '../../errors/packaging.errors.js';

const ALLOWED = Object.values(PACKAGING_MATERIAL) as readonly string[];

export class PackagingMaterialVO extends BaseVO<string> {
  private constructor(value: string) { super(value); }

  static create(raw: string): PackagingMaterialVO {
    if (typeof raw !== 'string' || !ALLOWED.includes(raw)) {
      throw new InvalidPackagingMaterialError(String(raw));
    }
    return new PackagingMaterialVO(raw);
  }

  static reconstitute(raw: string): PackagingMaterialVO { return new PackagingMaterialVO(raw); }

  static cardboard(): PackagingMaterialVO { return new PackagingMaterialVO(PACKAGING_MATERIAL.CARDBOARD); }
  static plastic(): PackagingMaterialVO { return new PackagingMaterialVO(PACKAGING_MATERIAL.PLASTIC); }
  static paper(): PackagingMaterialVO { return new PackagingMaterialVO(PACKAGING_MATERIAL.PAPER); }
  static wood(): PackagingMaterialVO { return new PackagingMaterialVO(PACKAGING_MATERIAL.WOOD); }
  static metal(): PackagingMaterialVO { return new PackagingMaterialVO(PACKAGING_MATERIAL.METAL); }
  static glass(): PackagingMaterialVO { return new PackagingMaterialVO(PACKAGING_MATERIAL.GLASS); }
  static biodegradable(): PackagingMaterialVO { return new PackagingMaterialVO(PACKAGING_MATERIAL.BIODEGRADABLE); }
  static recycled(): PackagingMaterialVO { return new PackagingMaterialVO(PACKAGING_MATERIAL.RECYCLED); }

  isCardboard(): boolean { return this.value === PACKAGING_MATERIAL.CARDBOARD; }
  isPlastic(): boolean { return this.value === PACKAGING_MATERIAL.PLASTIC; }
  isPaper(): boolean { return this.value === PACKAGING_MATERIAL.PAPER; }
  isWood(): boolean { return this.value === PACKAGING_MATERIAL.WOOD; }
  isMetal(): boolean { return this.value === PACKAGING_MATERIAL.METAL; }
  isGlass(): boolean { return this.value === PACKAGING_MATERIAL.GLASS; }
  isBiodegradable(): boolean { return this.value === PACKAGING_MATERIAL.BIODEGRADABLE; }
  isRecycled(): boolean { return this.value === PACKAGING_MATERIAL.RECYCLED; }

  /** Environmentally friendly. */
  isEcoFriendly(): boolean {
    return [
      PACKAGING_MATERIAL.BIODEGRADABLE,
      PACKAGING_MATERIAL.RECYCLED,
      PACKAGING_MATERIAL.PAPER,
      PACKAGING_MATERIAL.CARDBOARD,
    ].includes(this.value as never);
  }

  /** Can be recycled after use. */
  isRecyclable(): boolean {
    return [
      PACKAGING_MATERIAL.CARDBOARD,
      PACKAGING_MATERIAL.PAPER,
      PACKAGING_MATERIAL.GLASS,
      PACKAGING_MATERIAL.METAL,
      PACKAGING_MATERIAL.RECYCLED,
    ].includes(this.value as never);
  }

  /** Heavy-duty material. */
  isHeavyDuty(): boolean {
    return [PACKAGING_MATERIAL.WOOD, PACKAGING_MATERIAL.METAL].includes(this.value as never);
  }
}
